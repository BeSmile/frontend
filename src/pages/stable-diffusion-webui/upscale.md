# 放大图片

1. First, open the AUTOMATIC1111 Stable Diffusion web UI.
2. Click on the “img2img” tab at the top of the screen.
3. In the prompt box, type in a description of the image you want to upscale.
4. Go down to the “Scripts” section at the bottom and select the “SD Upscale” script.
5. Next, load an initial image into the box by clicking on the “Choose File” button or dragging and dropping.
6. You’ll need to choose an upscaler to use. There are several options available by default, but you can also download additional models from here. ESRGAN_4x is a popular choice.
7. Now it’s time to set the parameters for your upscaling process. For the best results with SD upscaling, I’d recommend using a high number of steps (100-150), a high CFG scale (between 8 and 15), and a low denoising strength (around 0.1 to 0.2). You can also use the width and height settings to specify the tile size – a common choice is 512×512.
8. When you’re ready, click on the “Generate” button to begin the upscaling process. This will double the size of your image (for example, a 512×512 image will become 1024×1024).
9. To further upscale your image, click on the “Send to img2img” button and then click “Generate” again once the image loads in the box on the left. This will double the size of the image again (for example, to 2048×2048).
10. Repeat this process as many times as you like to achieve the desired image size. Remember to save your upscaled image once you’re finished by clicking on the “Save” button.

[地址](https://easywithai.com/guide/how-to-use-upscalers-in-stable-diffusion/)
