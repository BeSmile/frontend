/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-14 13:50:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-17 18:12:43
 */
export default {
  path: "/build",
  layout: "layouts/ClassicLayout",
  name: "building",
  routes: [
    {
      path: "/data",
      component: "build/Data/index",
    },
    {
      path: "/design",
      component: "build/Design/index",
    },
    {
      path: "/workflow",
      component: "build/WorkFlow/index",
    },
  ],
};
