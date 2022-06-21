/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2022-01-13 21:30:02
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-14 01:08:29
 */
import React from "react";
import { Button, Form, Input, Select } from "antd";
import styles from "./index.module.less";

class ICondition {
  op: string;
  value: number;
  label: string;
  
  setValue(value: number) {
    this.value = value;
  }
}

/**
 * lteq <=
 * gteq >=
 * in
 * eq =
 * lt <
 * neq !=
 */
class EqCondition extends ICondition {
  constructor() {
    super();
    this.label = "=";
    this.op = "eq";
    this.value = 0;
  }
}

class NeqCondition extends ICondition {
  constructor() {
    super();
    this.label = "!=";
    this.op = "neq";
    this.value = 0;
  }
}

class LteqCondition extends ICondition {
  constructor() {
    super();
    this.label = "<=";
    this.op = "lteq";
    this.value = 0;
  }
}

class GteqCondition extends ICondition {
  constructor() {
    super();
    this.label = ">=";
    this.op = "gteq";
    this.value = 0;
  }
}

class LtCondition extends ICondition {
  constructor() {
    super();
    this.label = "<";
    this.op = "lt";
    this.value = 0;
  }
}

class Rule {
  label: string;
  key: string;
  value: number;
  ops: ICondition[];
  render: any;
  proxy: any;
  changeValue(value: number, needChange = false) {
    this.value = value;
    this.render();
    !needChange &&
    this.proxy &&
    this.proxy({
      key: this.key,
      value: this.value,
    });
  }
  // 修改后会进行外部调用
  injectChange(callback) {
    this.proxy = callback;
  }
  injectRender(fn) {
    this.render = fn;
  }
}

// 渠道rule
class QDRule extends Rule {
  constructor(
    label: string,
    key: string,
    value: number,
    ops: ICondition[]
  ) {
    super();
    this.label = label;
    this.value = value;
    this.key = key;
    this.ops = ops;
  }
}

class FilterFactory {
  rules: Rule[];
  values: Record<string, string>;
  constructor() {
    this.rules = [];
    this.values = {};
  }
  // 代理rule类、给rule注入监听变化函数
  proxy(rule: Rule) {
    this.rules.push(rule);
    rule.injectChange(this.ruleValuesHandle.bind(this));
  }
  ruleValuesHandle(v) {
    this.values[v.key] = v.value;
  }
  reset() {
    this.rules.forEach((rule: Rule) => {
      rule.changeValue(
        0,
        true
      );
    });
    this.values = {};
  }
}
const proxyRules: FilterFactory = new FilterFactory();
proxyRules.proxy(
  new QDRule(
    "渠道",
    "qudao",
    0,
    [
      new EqCondition(),
      new NeqCondition(),
      new LteqCondition(),
      // new GteqCondition(),
      // new LtCondition(),
    ]
  )
);
proxyRules.proxy(
  new QDRule(
    "广告营销",
    "guanggao",
    0,
    [
      new EqCondition(),
      // new NeqCondition(),
      new LteqCondition(),
      new GteqCondition(),
      new LtCondition(),
    ]
  )
);

type Props = {
  rule: Rule;
};

class RuleComponent extends React.Component<Props, {}> {
  componentDidMount() {
    const { rule } = this.props;
    // 注入update模式
    rule.injectRender(this.forceUpdate.bind(this));
  }
  render() {
    const { rule } = this.props;
    return (
      <div className={styles.item} key={rule.key}>
        <div className={styles.itemLabel}>{rule.label}</div>
        <div className={styles.itemSelect}>
          <Select
            onChange={() => {
              rule.changeValue(0);
            }}
            options={rule.ops.map((op) => ({
              label: op.label,
              value: op.op,
            }))}
          ></Select>
        </div>
        <div className={styles.itemInput}>
          <Form.Item>
            <Input
              value={rule.value}
              onChange={(e: any) => {
                rule.changeValue(e.target.value);
              }}
              style={{ width: 200 }}
            />
          </Form.Item>
        </div>
      </div>
    );
  }
}

const StrategyForm: React.FC = () => {
  return (
    <div>
      {proxyRules.rules.map((rule: Rule) => (
        <RuleComponent key={rule.key} rule={rule}/>
      ))}
    
      <Button
        onClick={() => {
          proxyRules.reset();
        }}
      >
        重置
      </Button>
    </div>
  );
};

export default StrategyForm;
