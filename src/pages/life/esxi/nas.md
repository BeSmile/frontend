# 黑群晖

## 安装过程

[多地址](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa0plY2lBLXlsaWV0enAyYkQ5aVc3THhJUnhRUXxBQ3Jtc0ttR0NYaGhfV0FKb2hWTFBnV0NSV0JiMW4wNmlXYXFUSmVBOWJBWE9tWi1FSjVhMm5td0R0Q3pfRGIwbGRhU05oYVpTQUxFRF9FdXkxOGUyT3A4YVRTNXBCdEpoV3B1cTBPajNhM2RFMWJCSFFUQWJuNA&q=https%3A%2F%2Fmega.nz%2Ffolder%2FIXwVSa4K%23Odm9i_IEE-VrlRO8__j0Kg&v=fzJLoP_zjQw)

1. 下载 synoboot.img 引导 [下载地址](https://xpenology.club/downloads/)
2. 下载系统 DSM918+ 7.1

## 无法添加 synoboot 启动引导盘

手动添加`vmdk`引导盘,无法进行保存,无法读取到信息

如果是 esxi 服务器是 8 的版本,则需要通过`StarWind V2V Converter`工具进行 img 进行转 vmdk 文件进行远程上传

## 通过 nfs 挂载至下载服务器目录

1. 在文件服务里开启`NFS`以及协议为`NFSv4.1`
2. 共享文件夹添加 NFS 权限,并且映射为所有`admin`
3. 通过`mount`进行挂载目录

```
mount -t nfs 192.168.50.4:/volume1/movie /home/nfs/transmission -o nolock

```
