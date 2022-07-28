/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-14 14:11:34
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 23:08:42
 */
import React from 'react';

export interface Route {
    path: string;
    component?: React.FunctionComponent | React.Component | string;
    routes?: Array<Route>;
    layout?: React.FunctionComponent | React.Component | string;
}

export {};
