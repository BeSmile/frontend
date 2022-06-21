/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-14 13:52:29
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-17 18:12:54
 */
export default {
  path: "/qqsg",
  layout: "layouts/BaseLayout",
  name: "qq三国",
  routes: [
    {
      path: "/resistance",
      component: "qqsg/Resistance/index",
    },
    {
      path: "/fore",
      component: "qqsg/Fore/index",
    },
    {
      path: "/experience",
      component: "qqsg/Experience/index",
    },
    {
      path: "/",
      component: "qqsg/Home/index",
    },
  ],
};
