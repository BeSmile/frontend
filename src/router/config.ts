/*
 * @Description:
 * @Version:
 * @Author: linjinzhi
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-19 10:11:52
 */
import routes from "./routes";

export default [
    ...Object.values(routes),
    {
        path: "/domain",
        routes: [
            {
                path: "/",
                component: "Home/index"
                // authority: [],
            }
        ]
    },
    {
        path: "/compts",
        name: "组件类",
        routes: [
            {
                path: "/loading",
                component: "Components/Loading/index"
                // authority: [],
            },
            {
                path: "/stroke",
                component: "Components/CStroke/index"
                // authority: [],
            }
        ]
    },
    {
        path: "/login",
        routes: [
            {
                path: "/",
                component: "Login/index"
            }
        ]
    },
    {
        path: "/practice",
        name: "练习",
        routes: [
            {
                path: "/generate",
                component: "Practice/Generate/index"
            },
            {
                path: "/hooks",
                component: "Practice/Hooks/index"
            }
        ]
    },
    {
        path: "/",
        layout: "layouts/CustomLayout",
        routes: [
            {
                path: "/",
                component: "Home/index"
            }
        ]
    }
];
