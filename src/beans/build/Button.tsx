/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-27 17:18:32
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-27 16:07:27
 */
import React, { lazy } from 'react';
import uniqueId from 'lodash/uniqueId';

interface AppearanceInterface {
    position: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    rect: {
        width: number;
        height: number;
    };
    text: string;
    props: {
        color?: any;
        variant?: any;
    };
}

// interface ButtonInterface {
//   appearance: AppearanceInterface;
// }

/*

{
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'element',
  name: "Button",
  properties: {
    conditional: {},
    transitions: {},
    appearance: {
      // 元素的id
      key: {
        type: 'string',
      },
      // 当前元素的名称
      name: {
        type: 'string',
      },
      // 默认填写
      // placeholder: {
      //   type: 'string',
      // },
      // 当前的样式
      style: { type: { type: 'string' }, },
      // // 当前样式的枚举类型
      // style_enum_list: { type: 'array', },
      // position尺寸
      position: {
        type: "object",
        properties: {
          left: { type: 'number', },
          right: { type: 'number', },
        }
      },
      props: {
        type: "object",
        properties: {
          color: {
            type: "string",
          }
        },
      },
      text: {
        type: string;
      },
      rect: {
        type: "object",
        properties: {
          width: { type: 'number', },
          height: { type: 'number', },
        }
      }
    }
  },
}
 */

export default class IButton {
    // private importAsset: string = "";
    private _key = '';
    private _text = 'Button';
    public appearance: AppearanceInterface = {
        position: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        },
        rect: {
            width: 0,
            height: 0
        },
        text: '',
        props: {
            color: 'secondary',
            variant: 'contained'
        }
    };
    constructor(params) {
        // this.importAsset = importAsset;
        this._key = uniqueId(`Button-${Date.now()}-`);
        this.appearance.position.left = params.left;
        this.appearance.position.top = params.top;
        this.appearance.rect.width = params.width;
        this.appearance.rect.height = params.height;
    }

    public initComponent = () => {
        const Component = require('@material-ui/core/Button').default;
        console.log(Component);
    };

    public toJSX = () => {
        const Component = lazy(() => import('@material-ui/core/Button'));

        return React.createElement(
            Component,
            {
                key: this._key,
                style: {
                    left: this.appearance.position.left,
                    top: this.appearance.position.top,
                    position: 'absolute'
                },
                ...this.appearance.props
            },
            this._text
        );
    };
}
