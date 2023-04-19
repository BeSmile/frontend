# proxy_pass

## 不带 location path

转发域名后加`/`

```nginx
location  /proxy/ {
    proxy_pass http://127.0.0.1:81/;
}
```

`127.0.0.1:80/proxy/test` -> `127.0.0.1:81/test`

## 带 location path

```nginx
location  /proxy/ {
    proxy_pass http://127.0.0.1:81;
}
```

`127.0.0.1:80/proxy/test` -> `127.0.0.1:81/proxy/test`
