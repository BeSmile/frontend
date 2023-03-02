# https 概要

## https 接入层

### CDN 动态回源

## CDN 私钥处理

https://github.com/cloudflare/keyless

### 命中静态缓存

## HSTS

1. HSTS 在 max-age 过期时间内在客户端是强制 HTTPS 的，服务端无法 控制。因此，需要降级时，HTTPS 无法及时切换到 HTTP。
2. HSTS 是严格的 HTTPS，一旦网络证书错误时，网页将直接无法访问 (用户无法选择忽视)。

## 会话复用

通过简单的握手进行上一次会话的恢复

1. 会话 ID(Session ID):服务端缓存会话信息
2. 会话票证(Session Ticket):客户端缓存会话信息

## Ocsp stapling

1. OCSP(Online Certificate Status Protocol, 在线证书状 态协议)用于查询证书的吊销 信息。
2. OCSP stapling 服务端可以代 SACC 替客户端完成证书吊销状态的 检测。

## TLS 协议

## SNI 功能

SNI(Server Name Indicate)允许客户端在发起 SSL 握手请求 时(ClientHello 阶段)，就提 交请求的 Host 信息，使得服务 ssl_certificate 器能够切换到正确的域并返回相应的证书。通过这种方式解决了 一个 IP(虚拟机)部署多个域名 服务的问题。

## HTTP2.0

## HttpDns
