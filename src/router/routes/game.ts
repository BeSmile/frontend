/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-14 13:56:23
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-17 18:12:45
 */
export default {
    path: '/game',
    name: '游戏',
    layout: 'layouts/CustomLayout',
    routes: [
        {
            path: '/draw',
            component: 'Game/DrawSomething/index' // 你画我猜
        },
        {
            path: '/tetris',
            component: 'Game/Tetris/index' // 俄罗斯方块
        }
    ]
};
