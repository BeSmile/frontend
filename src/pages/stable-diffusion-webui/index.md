# Stable-Diffusion-WebUi

## 启动参数

| 参数             | 含义            |
| ---------------- | --------------- |
| --lowvram        | 4G 显存显卡启动 |
| --medvram        | 6G 显存显卡启动 |
| --share --listen | 本地局域网访问  |

### 常用启动命令

```/bin/bash
./webui.sh --opt-split-attention-v1 --disable-nan-check --no-half --use-cpu all --share --listen
```
