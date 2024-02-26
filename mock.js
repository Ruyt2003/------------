const mockjs = require("mockjs");
// 郑州市矢量边界
const zzBorder = require('./GIS_DATA/zz_border.json')

// 郑州市地下管道
const zzPipe = require('./GIS_DATA/zz_piping.json')

// 故障点数据
const faultPoint = require('./GIS_DATA/zzEvent.json')

// 核密度分析数据
const zzHeatMap = require('./GIS_DATA/zzHeatMap.json')

// 排水站点数据
const zzStation = require('./GIS_DATA/wa_sta.json')

// 将数据传出
module.exports = () => {
      return mockjs.mock({
            zzBorder,
            zzPipe,
            faultPoint,
            zzHeatMap,
            zzStation
      })
}