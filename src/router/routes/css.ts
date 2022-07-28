/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 18:02:05
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-17 18:12:39
 */
export default {
    path: '/css',
    name: 'CSS效果',
    layout: 'layouts/CustomLayout',
    routes: [
        {
            path: '/mapPreview',
            component: 'CSS/MapPreview/index'
        },
        {
            path: '/mask',
            component: 'CSS/Mask/index'
        }
    ]
};
