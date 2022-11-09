/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-04-02 11:28:30
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-04-02 17:37:01
 */

interface Vector2 {
  x: number;
  y: number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface FMMapGestureEnableController {
  enableMapHover: boolean; //设置能否悬停(PC)
  enableMapIncline: boolean; //设置能否倾斜模型
  enableMapPan: boolean; //设置能否移动模型
  enableMapPinch: boolean; //设置能否缩放
  enableMapRotate: boolean; //设置能否旋转模型
  enableMapSingleTap: boolean; //设置能否拾取
}

interface FMMapProps {
  container: HTMLElement;
  appName: string; // 必填,可通过蜂鸟云平台-》我的应用-》创建应用
  key: string; // 必填,key可通过蜂鸟云平台-》我的应用-》创建应用-》添加key添加
  mapServerURL?: string; // 设置地图数据的路径，如不设置，则从蜂鸟视图服务器上获取在线地图
  mapThemeURL?: string; // 设置主题数据的路径，如不设置，则从蜂鸟视图服务器上获取在线主题
  defaultThemeName?: string; // 设置默认主题名称，默认为‘2001’，设置后主题对应文件夹路径为：options.mapThemeURL+options.defaultThemeName。
  useStoreApply?: boolean; // 开启支持主题中模型的自定义样式，默认为true。
  defaultVisibleGroups?: Array<number>; // 初始显示楼层ID数组，默认值为[1]
  defaultFocusGroup?: number; // 初始聚焦楼层ID，默认值为1，设置非1时请同步设置defaultVisibleGroups。
  defaultViewCenter?: Vector2; // 初始化地图中心点坐标。如：{x:12961580.734922647,y:4861883.567717729}
  modelSelectedEffect?: boolean; // 支持单击模型高亮，false为单击时模型不高亮
  modelHoverEffect?: boolean; // 支持悬停模型高亮或拾取，false为悬停时模型不高亮。默认值：false
  modelHoverTime?: number; // 悬停时间触发时间，默认1000,参数数值表示毫秒时长。
  focusAlphaMode?: boolean; // 是否对不聚焦图层启用透明设置 默认为true
  focusAlpha?: number; //对不聚焦图层启用透明设置 默认为0.1。值范围为 0-1。此属性只有当options.focusAlphaMode = ture是有效
  focusAnimateMode?: boolean; // 是否开启聚焦图层切换的动画显示。默认true
  defaultViewMode?: fengmap.FMViewMode; // 初始二维还是三维状态，fengmap.FMViewMode.MODE_2D|fengmap.FMViewMode.MODE_3D ,默认3维显示。
  viewModeAnimateMode?: boolean; // 是否启用2D，3D模式切换时的动画效果。默认true
  moveToAnimateMode?: boolean; // 是否启用拾取地图物体时相机的移动动画效果。 默认true。
  scaleToAnimateMode?: boolean; // 是否启用地图物缩放的动画效果。 默认true。
  defaultMapScaleLevel?: number; //设置地图初始显示比例尺级别。范围为1-29之间的整数值。如29级的比例尺为1:1厘米
  mapScaleLevelRange?: Array<number>; //设置比例尺级别可缩放范围， 通常室内地图使用到的范围为16级到23级。即：[16,23]
  defaultMapScale?: number; //设置地图初始显示自定义比例尺级别。如设置1000，为1:1000（厘米）的显示状态。defaultMapScale的优先级比defaultMapScaleLevel的优先级高
  mapScaleRange?: Array<number>; //设置自定义比例尺范围，单位（厘米），如[200,4000]
  compassOffset?: Array<number>; //设置初始指南针的偏移量，默认为[28, 20],左：28px,上：20px
  compassSize?: number; //设置指南针大小,默认50px
  defaultGroupSpace?: number; // 设置初始地图的楼层间距,默认50
  enabledPanRange?: boolean; //是否开启平移地图范围限制,默认为false
  tile?: boolean; //是否访问分层数据,默认为false
  defaultBackgroundColor?: number | string; //默认背景颜色: 0xff00ff, '#00ff00'
  defaultBackgroundAlpha?: number; //默认背景透明度: 0 ~ 1
  defaultControlsPose?: number; // 地图默认旋转角度，默认为-15度
}

declare class MapState {
  backgroundColor: number;
  center: Vector2;
  focusGroupID: number;
  fullScreen: boolean;
  gestureEnableController: FMMapGestureEnableController;
  groupIDs: Array<number>;
  groupSpace: number;
  hoverFilterFunction: (event: any) => boolean;
  layerRenderOrder: any;
  mapScale: number;
  mapScaleLevel: number;
  maxScale: number;
  maxScaleLevel: number;
  maxTitleAngle: number;
  maxX: number;
  maxY: number;

  minScale: number;
  minScaleLevel: number;
  minTitleAngle: number;
  minX: number;
  minY: number;
  pickFilterFunction: (event: any) => boolean;
  rotateAngle: number;
  scaleLevel: number;
  showCompass: boolean;
  themeName: string;
  tiltAngle: number;
  viewMode: fengmap.FMViewMode;
  visibleGroupIDs: Array<number>;

  // addLocationMarker:
  // 方法
}

// FMPolygonMarker 自定义多边形标注对象，为自定义图层。

interface PolygonJson {
  type?: 'circle' | 'rectangle'; //多边形图层类型。'circle'表示圆形；'rectangle' 表示矩
  center?: Vector2; //圆形或矩形的中心点设置
  radius?: number; //圆形的半径
  segments?: number; //组成圆形的段数，默认40。值越大越接近圆。通常设置为近似圆的最小值，这样可以节省资源
  startPoint?: Vector2; //矩形的起始点设置，代表矩形的左上角。如存在center设置时，则优先使用stratPoint的值绘制矩形
  width?: number; //矩形的宽度
  height?: number; //矩形的高度。
}

interface FMPolygonMarkerProps {
  alpha?: number; //多边形的透明度。0.0 - 1.0 之间取值, 默认为 1.0
  color?: number; //多边形的颜色
  height?: number; //多边形与楼层之间的高度, 默认为 1
  lineWidth?: number; //多边形边框线宽,默认为2
  lineColor?: number; //多边形边框线颜色
  points?: Array<Vector2> | PolygonJson; //.array格式的为多边形的坐标点集数组。类似[{x: 12961583, y: 4861865, z: 56},{x: 12961644, y: 4861874, z: 56}]数组。2.json格式的为圆形或矩形的设置，具体参数如下
}

interface PolygonMarkerState {
  groupID: number; //
  center: Vector2; //
  height: number; //
  readonly mapCoord: Vector2; //
  readonly nodeType: fengmap.FMNodeType; //
  show: boolean;

  alwaysShow: () => void; //是否一直显示。
  avoid: (value: boolean) => void; //图层内或单个元素与同一图层内的其他元素在同一位置有相互遮盖时,是否自动避让。FMImageMarker FMTextMarker有效。 【true】: 需避让，【false】: 不避让。注意：avoid方法与show属性不能同时使用，使用avoid方法会自动更新show属性的值
  contain: (point: Vector2) => void; //检查多边形是否包含某一点
  getPoints: () => Array<Vector2>; //获取顶点坐标数据
  setAlpha: (val: number) => void; //修改多边形面的透明度 val:透明度
  setColor: (color: string) => void; //修改颜色
  setLineColor: (color: string) => void; //修改边线颜色
  setLineWidth: (val: number) => void; //修改边线宽度 val: 线宽
}

// FMPolygonMarker

// FMSearchRequestProps 查询实体对象
interface FMSearchRequestProps {}

interface FMSearchRequestState {
  bufferRadius?: number; //缓冲区半径
  circle?: number; //查询范围
  eName?: string; //根据地图元素对象的ename属性返回模糊匹配结果集
  FID?: string; //元素地图内唯一标识ID，根据设置条件返回精确匹配结果
  groupID?: number; //楼层id
  ID?: Array<number> | number; //地图元素对象ID，当前楼层内唯一。可组合groupID查询，获取到某一个的地图元素。根据设置条件返回精确匹配结果集，支持多个ID同时查询，如：[1,2]
  keyword?: string; //关键字，根据地图元素对象的name和ename属性返回模糊匹配结果集
  name?: string; //中文名。根据地图元素对象的name属性返回模糊匹配结果集
  nodeType?: fengmap.FMNodeType; //地图元素对象类型
  pathPoints?: Array<Vector2 | Vector3>; //导航查询路径线的点集，用来计算缓冲区
  polygon?: Array<Vector2 | Vector3>; //查询范围
  startPoint?: Vector2; // 导航查询起点，用来计算与起点与目标距离
  typeID?: Array<number> | number; // 对应地图元素数据类型type。根据设置条件返回精确匹配结果集，支持多个typeID同时查询，如：[170000,200000]
}
// FMSearchRequestProps 结束

//FMSearchAnalyser FMSearchAnalyser 是可根据类型、ID、楼层ID、名称、关键字模糊查找模型、公共设施、文本标签、自定义图层或所有图层的分析类
interface FMSearchAnalyserProps {
  map: MapState;
}

type QueryTypes = Array<'SINGLE' | 'CIRCLE' | 'POLYGON'>;

interface FMSearchAnalyserState {
  getQueryResult: (selector: FMSearchRequestState, queryTypes: QueryTypes) => void;
}
// FMSearchAnalyser结束

// FMMarker 普通Marker
interface FMMarkerProps {
  x: number; //x
  y: number; // y
  height: number; //标注高度
}

interface FMMarkerState {
  groupID: number;

  height: number;
  readonly mapCoord: Vector3;
  readonly nodeType: fengmap.FMNodeType;
  show: boolean;

  // 方法
  alwaysShow: () => void;
  avoid: (value: boolean) => void; //图层内或单个元素与同一图层内的其他元素在同一位置有相互遮盖时,是否自动避让。FMImageMarker FMTextMarker有效。 【true】: 需避让，【false】: 不避让。注意：avoid方法与show属性不能同时使用，使用avoid方法会自动更新show属性的值
  moveTo: (params: { x: number; y: number; time: number; callback: () => void; update: () => void }) => void;
  setPosition: (x: number, y: number, gid: number, height: number) => void;
}

// FMMarker结束

// FMImageMarker 图片Marker
interface FMImageMarkerProps extends FMMarkerProps {
  size: number; // 图片大小
  url: string; //图片地址
  anchor: string; //锚点位置
  depth: boolean;
}

interface FMImageMarkerState extends FMMarkerState {
  jump: (params: { height: number; times: number; duration: number; delay: number }) => void;
  moveToGroup: (gid: number) => void;
  stopJump: () => void;
  stopMoveTo: () => void;
}

// FMImageMarker 结束

declare namespace fengmap {
  enum FMNodeType {
    ALL = 0xffff,
    EXTENT = 4,
    EXTERNAL_MODEL = 35, //外部模型
    EXTRUDE_MARKER = 38, //多边形拉伸几何体
    FACILITY = 11, //公共设施
    GRADIENT_POLYGON_MARKER = 39, //渐变多边形
    IMAGE_MARKER = 31, //图片标注
    LABEL = 12, //LABEL
    LINE = 21, //线标注
    LOCATION_MARKER = 33, //定位标注
    MODEL = 5, //模型
    NONE = 0, //未知类型
    POLYGON_MARKER = 36, //多边形
    TEXT_MARKER = 32, //自定义文本标注
    WATER_MARKER = 37, //水波纹
  }
  enum FMViewMode {
    MODE_2D = 'top',
    MODE_3D = '3d',
  }
  function FMMap(options: FMMapProps): void;
  function FMPolygonMarker(options: FMPolygonMarkerProps): void;
  function FMSearchRequest(options?: FMSearchRequestProps): void;
  function FMSearchAnalyser(options: FMSearchAnalyserProps): void;
  function FMImageMarker(options: FMImageMarkerProps): void;
}
