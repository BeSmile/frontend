import React, { useState } from 'react';
import Collapse from 'rc-collapse';
// import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import 'rc-collapse/assets/index.css';
import MenuJunior from './components/MenuJunior';
import DesignContext, { Point } from './components/DesignContext';
import DragElement from '@components/DragElement';
import DesignPanel from './components/DesignPanel';
import DesignProperties from './components/DesignProperties';
import { RootState } from '@models/global';
import styles from './index.module.less';

// var Validator = require('jsonschema').Validator;
// const cx = classnames.bind(styles);
const Panel = Collapse.Panel;

const data = {
    Alert: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'element',
        name: 'Alert',
        properties: {
            conditional: {},
            transitions: {},
            appearance: {
                type: 'object',
                properties: {
                    // 元素的id
                    key: {
                        type: 'string'
                    },
                    // 当前元素的名称
                    name: {
                        type: 'string'
                    },
                    // 默认填写
                    placeholder: {
                        type: 'string'
                    },
                    // 当前的样式
                    style: { type: 'object' },
                    // 当前样式的枚举类型
                    // style_enum_list: { type: 'array', },
                    // 宽高
                    size: {
                        type: 'object',
                        properties: {
                            w: { type: 'number' },
                            h: { type: 'number' }
                        }
                    },
                    element_type: {
                        type: 'string'
                    },
                    // position尺寸
                    position: {
                        type: 'object',
                        properties: {
                            left: { type: 'number' },
                            top: { type: 'number' }
                        }
                    },
                    rect: {
                        type: 'object',
                        properties: {
                            width: { type: 'number' },
                            height: { type: 'number' }
                        }
                    }
                }
            }
        }
    },
    Button: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'element',
        name: 'Button',
        import: '@mui/material/Button',
        properties: {
            conditional: {},
            transitions: {},
            appearance: {
                // 元素的id
                key: {
                    type: 'string'
                },
                // 当前元素的名称
                name: {
                    type: 'string'
                },
                // 默认填写
                // placeholder: {
                //   type: 'string',
                // },
                // 当前的样式
                style: { type: { type: 'string' } },
                // // 当前样式的枚举类型
                // style_enum_list: { type: 'array', },
                // position尺寸
                position: {
                    type: 'object',
                    properties: {
                        left: { type: 'number' },
                        right: { type: 'number' }
                    }
                },
                rect: {
                    type: 'object',
                    properties: {
                        width: { type: 'number' },
                        height: { type: 'number' }
                    }
                }
            }
        }
    }
};

// var v = new Validator();
// var instance = {
//   key: '1',
//   name: '弹窗',
//   placeholder: "输入",
//   style: {
//     a: '1',
//   },
//   style_enum_list: [],
//   size: {
//     w: 10,
//     h: 10,
//   },
//   position: {
//     x: 10,
//     y: 11,
//   }

// };
// console.log(v.validate(instance, data.Alert), 'dd');

// const json = {
//   $schema: 'http://json-schema.org/draft-07/schema#',

//   definitions: {
//     // 动效实例
//     transitions: {
//       $id: '#transitions',
//       properties: {
//         name: { type: 'string' },
//         duration: { type: 'number' },
//         transition_fn: { type: 'string', enum: [
//           "Ease-in", "Ease-out", "Ease-in-out", "Linear","Step-start", "Step-end"
//         ] },
//       },
//     },
//     element: {
//       $id: 'element',
//       properties: {
//         // 元素的id
//         key: {
//           type: 'string',
//         },
//         // 当前元素的名称
//         name: {
//           type: 'string',
//         },
//         // 默认填写
//         placeholder: {
//           type: 'string',
//         },
//         // 当前的样式
//         style: { type: { type: 'string' }, },
//         // 当前样式的枚举类型
//         style_enum_list: { type: 'array', },
//         // 宽高
//         size: {
//           type: "object",
//           properties: {
//             w: { type: 'number', },
//             h: { type: 'number', },
//           }
//         },
//         // position尺寸
//         position: {
//           type: "object",
//           properties: {
//             x: { type: 'number', },
//             y: { type: 'number', },
//           }
//         }
//       },
//     },
//     visual_elements: {

//     },
//     address: {
//       $id: '#address',
//       type: 'object',
//       properties: {
//         street_address: { type: 'string' },
//         city: { type: 'string' },
//         state: { type: 'string' },
//       },
//       required: ['street_address', 'city', 'state'],
//     },
//   },
//   type: 'object',
//   properties: {
//     billing_address: { $ref: '#address' },
//     shipping_address: { $ref: '#address' },
//   },
// };

const DesignWidget: React.FC = () => {
    const [menuKey, setMenuKey] = useState<string>('');
    const [elements, setElements] = useState<Array<React.ReactElement>>([]);
    const [activeSchema, setActiveSchema] = useState<any>(null);

    const {
        buildTheme: { menuSpace }
    } = useSelector((state: RootState) => state.theme);

    /**
     * 返回后的点
     * @param p 视图内的点
     */
    const handleDragElement = (p: Point) => {
        // var instance = {
        //   key: Math.random(),
        //   name: p.elementId,
        //   placeholder: "输入",
        //   style: {},
        //   style_enum_list: [],
        //   size: {
        //     w: 10,
        //     h: 10,
        //   },
        //   position: {
        //     x: 0,
        //     y: 0,
        //   }
        // };
        // const schema = data[p.elementId];
        const Entity = require(`../../../beans/build/${p.elementId}`).default;
        const button = new Entity({
            left: p.x,
            top: p.y,
            width: 100,
            height: 50
        });
        button.initComponent();

        setActiveSchema(data[p.elementId]);
        setElements((eles) => {
            eles.push(button.toJSX());
            return eles;
        });
    };

    return (
        <DesignContext.Provider
            value={{
                handleDragElement
            }}
        >
            <section className={styles.designPanel}>
                <div className={styles.designPanelCollapse}>
                    <Collapse
                        activeKey="base"
                        accordion={true}
                        className={styles.designPanelCollapseContainer}
                    >
                        <Panel
                            header="基本元素"
                            key="base"
                            headerClass="design-panel-collapse-header-class"
                        >
                            {Object.keys(data).map((item) => (
                                <div
                                    className={styles.designPanelCollapseItem}
                                    key={item}
                                    id={item}
                                >
                                    <DragElement elementId={item} offset={menuSpace}>
                                        <MenuJunior
                                            activeKey={menuKey}
                                            onContextMenu={(key: string) => setMenuKey(key)}
                                        >
                                            {item}
                                        </MenuJunior>
                                    </DragElement>
                                </div>
                            ))}
                        </Panel>
                    </Collapse>
                </div>
                <DesignPanel>{elements}</DesignPanel>
                <DesignProperties schema={activeSchema} />
            </section>
        </DesignContext.Provider>
    );
};

export default DesignWidget;
