/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-27 15:18:16
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-27 16:04:52
 */
import React, { memo } from 'react';
import styles from './index.less';

// const cx = classnames.bind(styles)
interface DesignPropertiesProps {
    schema: any; // 暂时用any 代理
}

const DesignPropertiesFC = memo((props: DesignPropertiesProps) => {
    const { schema } = props;

    // const handleChange = () => {

    // }

    const renderSchemaJSX = (schema): React.ReactElement => {
        if (!schema) return <></>;
        let tabElements: Array<React.ReactElement> = [];
        let elements: Array<React.ReactElement> = [];
        Object.keys(schema.properties).forEach((proto: string) => {
            tabElements.push(
                <div key={`tab-${proto}`} className={styles.designPropertiesContainerTabsItem}>
                    {proto}
                </div>
            );
            elements.push(
                <div key={`ele-${proto}`} hidden={true}>
                    Item One
                </div>
            );
        });
        return (
            <>
                <div className={styles.designPropertiesHeader}>{schema.name}</div>
                <div className={styles.designPropertiesContainer}>
                    <div className={styles.designPropertiesContainerTabs}>{tabElements}</div>
                    {elements}
                </div>
            </>
        );
    };
    return <div className={styles.designProperties}>{renderSchemaJSX(schema)}</div>;
});
export default DesignPropertiesFC;
