# 群晖 Nas 接入海康萤石摄像头

套件中心安装`Surveillance`

1. 关闭视频加密
2. 下载 PC 萤石软件
3. 设置->图像->编码类型->H264
4. 查看`rtsp`是否是 554 端口
5. 填写视频流地址

```
admin:######@192.168.50.4:554/video_path
```

`######`为摄像头的验证码,端口号默认一般为`554`
