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

### tag 地址

[tag 生成地址](https://wolfchen.top/tag/)

### 模型地址

```
huggingface.co
https://civitai.com/
```

### 搭配 ps 使用

插件 github 地址

```
https://github.com/AbdullahAlfaraj/Auto-Photoshop-StableDiffusion-Plugin
```

### 相关报错

1. 安装插件报错`extension access disabled because of command line flags`

启动参数添加如下命令

```
--enable-insecure-extension-access
```

### XXMix_9realistic 模型

https://civitai.com/models/47274/xxmix9realistic

```
Recommended Parameters:

Sampler: DPM++ 2M Karras alt Karras or DPM++ SDE Karras

Steps: 20~40

Hires upscaler:4x-UltraSharp

Hires upscale: 2

Hires steps: 15

Denoising strength: 0.2~0.5

CFG scale: 6-8

clip skip 2
```
