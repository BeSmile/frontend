/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-20 16:42:11
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-01-27 14:56:48
 */
import { createContext } from "react";

export interface Point {
  x: number;
  y: number;
  elementId: string;
}
export interface DesignContextProps {
  handleCreateElement?: (params: any) => void;
  handleDragElement?: (point: Point) => void;
}

const DesignContext = createContext<DesignContextProps>({});

export default DesignContext;
