# IPTV 自搭建地址

使用[IPTV github](https://github.com/youshandefeiyang/IPTV/tree/main/Golang)

## 安装

```bin/bash
docker run -d --restart unless-stopped --privileged=true -p 35455:35455 --name allinone youshandefeiyang/allinone
```

使用 docker-compose

```yaml
iptv-allinone:
  container_name: iptv-allinone
  restart: unless-stopped
  ports:
    - 35455:35455
  privileged: true
  image: youshandefeiyang/allinone
iptv-watchtower:
  container_name: iptv-watchtower
  restart: unless-stopped
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  image: containrrr/watchtower
  command: --schedule '0 0 2 * * *'
```

## 详细使用方法

### 抖音：

- 抖音手机客户端进入直播间后，点击右下角三个点，点击分享，点击复制链接，然后运行并访问：

  ```
  http://192.168.50.5:35455/douyin?url=https://v.douyin.com/xxxxxx(&quality=xxxx)
  ```

  其中`&quality`参数默认 origin 原画，可以省略，也可以手动指定：`uhd`、`origin`、`hd`、`sd`、`ld`

- 抖音电脑端需要打开抖音网页版复制(live.douyin.com/)xxxxxx，只需要复制后面的 xxxxx 即可：
  ```
  http://192.168.50.5:35455/douyin/xxxxx
  ```

### 斗鱼

1. 可选 m3u8 和 flv 两种流媒体传输方式【(www.douyu.com/)xxxxxx 或 (www.douyu.com/xx/xx?rid=)xxxxxx，默认m3u8兼容性好】：
   ```
   http://192.168.50.5:35455/douyu/xxxxx
   ```
2. 选择 flv 时可选择不同 cdn（需要加 stream 和 cdn 参数，不加参数默认 hls 和 akm-tct.douyucdn.cn）
   ```
     http://192.168.50.5:35455/douyu/xxxxx(?stream=flv&cdn=ws-tct)
   ```

### BiliBili(live.bilibili.com/)xxxxxx：

1. 平台 platform 参数选择（默认 web，如果有问题，可以切换 h5 平台）：
   ```
   "web"   => "桌面端"
   "h5"    => "h5端"
   ```
2. 线路 line 参数选择（默认线路二，如果卡顿/看不了，请切换线路一或者三，一般直播间只会提供两条线路，所以建议线路一/二之间切换）：
   ```
   "first"  => "线路一"
   "second" => "线路二"
   "third"  => "线路三"
   ```
3. 画质 quality 参数选择（默认原画，可以看什么画质去直播间看看，能选什么画质就能加什么参数，参数错误一定不能播放）：
   ```
   "30000" => "杜比"
   "20000" => "4K"
   "10000" => "原画"
   "400"   => "蓝光"
   "250"   => "超清"
   "150"   => "高清"
   "80"    => "流畅"
   ```
4. 最后的代理链接示例：

   ```
   http://192.168.50.5:35455/bilibili/xxxxxx(?platform=web&line=first&quality=10000)

   ```

### 虎牙(huya.com/)xxxxxx：

```
http://192.168.50.5:35455/huya/xxxxx
YouTube:
https://www.youtube.com/watch?v=cK4LemjoFd0
Rid: cK4LemjoFd0
http://192.168.50.5:35455/youtube/cK4LemjoFd0(?quality=1080/720...)
```

## nginx 部署文件服务

提供 m3u 服务, 映射`/home/IPTV/main`目录至`nginx`根目录,修改文件内的 ip 地址为`iptv`对应的 IP 地址

`docker-compose`配置如下:

```yaml
iptv-nginx:
  container_name: iptv-nginx
  restart: unless-stopped
  ports:
    - 3838:80
  volumes:
    - /home/IPTV/main:/html
    - /home/docker/iptv/conf/nginx.conf:/etc/nginx/nginx.conf
  image: nginx
```
