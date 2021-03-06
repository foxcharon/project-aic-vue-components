export default class CanvasMarkDataObject {
    constructor(id, type, x, y, markTypeId) {
        this.id = id,
        this.type = type,   // polygon多边形 rectangle矩形 ellipse椭圆
        this.markTypeId = markTypeId,    // 病灶类型的ID
        this.visible = true,
        this.active = false,
        this.color = 'red',
        this.completed = false,    // 是否已完成绘制
        this.centerPointActive = false,    // 是否激活中心点（可以移动多边形）
        this.translateable = false,    // 是否在移动
        this.transformable = false,    // 是否在拉伸
        this.isDataModel = false,    // 是否是 数据模型
        this.isSubmitModel = false,    // 是否是 提交模型
        this.centerPointObject = null,    // 中心点坐标
        this.pointActiveIndex = null,    // 此时激活了多边形的哪个连接点（一个时刻只会有一个）
        // 连接点坐标
        this.pointDataArray = [
            {
                x: x,
                y: y
            }
        ]
        // 如果是椭圆，则中心点是一开始就确定的
        if (type === "ellipse") {
            this.centerPointObject = {
                center_x:x,
                center_y:y
            }
        }
        if (type === "rectangle" || type === "ellipse") {
            this.pointDataArray.push({
                x:x,
                y:y
            })
        }
    }    
}

