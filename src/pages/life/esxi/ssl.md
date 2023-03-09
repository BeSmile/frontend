# 修改ssl证书

## 替换证书

```bash
cd /etc/vmware/ssl
cp rui.crt rui.crt_bak
cp rui.key rui.key_bak
```

## 重启服务

```bash
/etc/init.d/hostd restart  #重启hostd服务
/etc/init.d/vpxa restart #重启vpxa服务
/etc/init.d/vpxa start #启动vpxa服务
/etc/init.d/hostd start #启动hostd服务
```