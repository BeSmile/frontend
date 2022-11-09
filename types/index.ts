/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2022-01-17 16:41:30
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-18 00:51:48
 */
export interface NumberWithLength {
  length: number;
}

const getMenuData = <T>(name: T[]): T[] => {
  // console.log(name.length);
  // let value: string;
  // if(name === 'parent') {
  //   value = '100';
  // } else {
  //   value = '50';
  // }
  return name;
};
var p: number[] = [1, 2, 3];
getMenuData<number>(p);

interface MenuItem {
  label: string;
  value: string;
}

export interface MenuData {
  key: string;
}

export interface MenuCombination extends MenuItem {
  key?: string;
}

const setMenuData = <T extends MenuItem>(data: T): T => {
  data.label = "111";
  return data;
};

const menu: MenuItem = {
  label: "机构",
  value: "001",
};

setMenuData<MenuItem>(menu);

interface User {
  name: string;
  age: number;
  username: string;
  password: string;
  avatar: string;
}

// keyof in的使用
type UserEnum = {
  [key in keyof User]: number | string;
};

let u: UserEnum = {
  name: "Bob",
  age: 123,
  username: "Bob",
  avatar: "Bob",
  password: "Bob",
};

u.password = "2345";

class Foo<T, U> {
  test: T;

  constructor(value: T) {
    this.test = value;
  }

  getTypeNameOfTest(): string {
    return "";
  }

  getUName(value: U): U {
    return value;
  }
}

const foo = new Foo<Date, string>(new Date());
foo.getTypeNameOfTest(); // => "Date"

const baa = new Foo<string, string>("Howdy");
baa.getTypeNameOfTest();
baa.getUName("st");
