# 进行无损扩容

## `fdisk -l`查看分区区号

```bash
root@debian:~# fdisk -l

Disk /dev/sda: 40 GiB, 42949672960 bytes, 83886080 sectors
Disk model: Virtual disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3f64a42c

Device     Boot    Start      End  Sectors  Size Id Type
/dev/sda1  *        2048 31553535 31551488   15G 83 Linux
/dev/sda2       31555582 33552383  1996802  975M  5 Extended
/dev/sda3       33552384 83886079 50333696   24G 83 Linux
/dev/sda5       31555584 33552383  1996800  975M 8e Linux LVM

Partition table entries are not in disk order.
```

## 删除旧分区进行创建新分区

```bash
root@debian:~# fdisk /dev/sda

Welcome to fdisk (util-linux 2.36.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): d
Partition number (1-3,5, default 5): 5

Partition 5 has been deleted.

Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.

Command (m for help): d
Partition number (1,2, default 2): 2

Partition 2 has been deleted.

Command (m for help): d
Partition number (1,2, default 2): 1

Partition 1 has been deleted.

```

## 重建分区

起始分区位置计算

`36G` = `36 * 1024 * 2048 = 75497472`

```bash
Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-83886079, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-83886079, default 83886079): 75497472

Created a new partition 1 of type 'Linux' and of size 36 GiB.
Partition #1 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: Y

The signature will be removed by a write command.

Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (2-4, default 2):
First sector (75497473-83886079, default 75499520): 75497473
Last sector, +/-sectors or +/-size{K,M,G,T,P} (75497473-83886079, default 83886079): 83886079

Created a new partition 2 of type 'Linux' and of size 4 GiB.

Command (m for help): t
Partition number (1,2, default 2):
Hex code or alias (type L to list all): 82

Changed type of partition 'Linux' to 'Linux swap / Solaris'.

Command (m for help): a
Partition number (1,2, default 2): 1

The bootable flag on partition 1 is enabled now.

Command (m for help): p
Disk /dev/sda: 40 GiB, 42949672960 bytes, 83886080 sectors
Disk model: Virtual disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3f64a42c

Device     Boot    Start      End  Sectors Size Id Type
/dev/sda1  *        2048 75497472 75495425  36G 83 Linux
/dev/sda2       75497473 83886079  8388607   4G 82 Linux swap / Solaris

Filesystem/RAID signature on partition 1 will be wiped.

Command (m for help): w
The partition table has been altered.
Failed to remove partition 5 from system: Device or resource busy
Failed to update system information about partition 1: Device or resource busy

The kernel still uses the old partitions. The new table will be used at the next reboot.
Syncing disks.
```

保存退出,按照提示进行重启`reboot`

## `resize2fs` 扩大分区

```bash
root@debian:/home# resize2fs /dev/sda1
resize2fs 1.46.2 (28-Feb-2021)
Filesystem at /dev/sda1 is mounted on /; on-line resizing required
old_desc_blocks = 2, new_desc_blocks = 5
The filesystem on /dev/sda1 is now 9436928 (4k) blocks long.
```

## 重建分区信息

```bash
root@debian:/home# blkid
/dev/sda1: UUID="6e89a04b-9e2f-4c57-8c34-2faf9235d6bb" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="3f64a42c-01"
/dev/sr0: BLOCK_SIZE="2048" UUID="2022-12-17-10-46-11-00" LABEL="Debian 11.6.0 amd64 n" TYPE="iso9660" PTUUID="256ed913" PTTYPE="dos"
/dev/sda2: PARTUUID="3f64a42c-02"
```

### `mkswap /dev/sda2` 重新创建 swap 信息，产生`UUID`

```bash
root@debian:/home# mkswap /dev/sda2
Setting up swapspace version 1, size = 4 GiB (4294959104 bytes)
no label, UUID=9dd8c39d-7217-4a43-be46-34c32dc0e54d
```

### 修改 `/etc/fstab` 文件，将里面的 `swap` 分区信息的 `uuid` 换成新生成的`uuid`

```bash
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# systemd generates mount units based on this file, see systemd.mount(5).
# Please run 'systemctl daemon-reload' after making changes here.
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda1 during installation
UUID=6e89a04b-9e2f-4c57-8c34-2faf9235d6bb /               ext4    errors=remount-ro 0       1
# swap was on /dev/sda5 during installation
UUID=9dd8c39d-7217-4a43-be46-34c32dc0e54d none            swap    sw              0       0
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0
```

### 查看分区信息

```bash
root@debian:/home# swapon /dev/sda2
root@debian:/home# sudo swapon -s
Filename				Type		Size	Used	Priority
/dev/sda2                              	partition	4194296	0	-2
root@debian:/home# free -m
               total        used        free      shared  buff/cache   available
Mem:            3931         397        2522           0        1010        3329
Swap:           4095           0        4095
```
