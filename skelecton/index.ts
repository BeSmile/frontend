const puppeteer = require("puppeteer");

const init = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        ignoreDefaultArgs: ["--enable-automation"]
    });
    const page = await browser.newPage();
    //跳转JD首页
    await page.goto("http://td-dev.chiefclouds.cn/!/trading-desk/");
    //获取输入框元素并在输入框内输入‘手机’
    const input = await page.evaluate(() => document.body.innerHTML);

    console.log("firstText", input);
    //获取一组元素的innerText属性
    //await page.waitForSelector("ul.gl-warp>li");
    //const list = await page.$$eval("ul.gl-warp>li", eles => eles.map(ele => ele.innerText));
    //console.log("list", list);
    await browser.close();
};
init();
