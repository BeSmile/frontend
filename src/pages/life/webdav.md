# infunse 挂载 aliyun 盘

## 获取 refresh token

```
JSON.parse(window.localStorage.getItem("token"))["refresh_token"];
```

## docker 安装服务

通过`bash`创建 docker 服务

```bash
docker run -d --name=aliyundrive-webdav --restart=unless-stopped -p 9080:8080 \
  -v /etc/aliyundrive-webdav/:/etc/aliyundrive-webdav/ \
  -e REFRESH_TOKEN='REFRESH_TOKEN' \
  -e WEBDAV_AUTH_USER=admin \
  -e WEBDAV_AUTH_PASSWORD=admin \
  messense/aliyundrive-webdav
```

```yaml
aliyundrive-webdav:
  container_name: aliyundrive-webdav
  restart: unless-stopped
  ports:
    - 9080:8080
  environment:
    - REFRESH_TOKEN='REFRESH_TOKEN'
    - WEBDAV_AUTH_USER=admin
    - WEBDAV_AUTH_PASSWORD=admin
  image: messense/aliyundrive-webdav
```

## infunse 配置

添加对应的账号密码以及端口 ip,路径填云盘内的目录,默认从根目录开始
