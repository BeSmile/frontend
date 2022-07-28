/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-14 13:54:10
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 17:39:18
 */
export default {
    path: '/tool',
    name: '工具类',
    routes: [
        {
            path: '/shortcuts',
            component: 'tool/Shortcuts'
        },
        {
            path: '/oxygen',
            component: 'tool/OxygenNotInclude/editor' // 缺氧编辑器
        }
    ]
};
