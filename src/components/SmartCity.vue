<template>
    <!-- 构造城市场景组件 -->
    <div></div>
</template>

<script setup>
import { h, inject, onMounted } from 'vue';
import axios from 'axios';
import {
    Scene,
    LineLayer,
    LayerSwitch,
    Popup,
    PointLayer,
    PolygonLayer,
    HeatmapLayer,
} from '@antv/l7';
import { Area } from '@antv/g2plot';

const { scene, map } = inject('$scene_map');

// 漂浮地图板块 start
// 城市名称注释
const floatText = async () => {
    const zz_data = await axios(
        'https://geo.datav.aliyun.com/areas_v3/bound/410100_full.json'
    );
    // 城市名称注释
    const textLayer = new PointLayer({
        zIndex: 2,
        name: '城市名称注释',
    })
        .source(zz_data.data)
        .shape('name', 'text')
        .size(14)
        .color('#0ff')
        .style({
            textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
            spacing: 2, // 字符间距
            padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
            stroke: '#0ff', // 描边颜色
            strokeWidth: 0.2, // 描边宽度
            raisingHeight: 40000,
            textAllowOverlap: true,
        });
    return textLayer;
};
// 浮空城市线边界图层
const floatLineDown = async () => {
    const zz_data = await axios(
        'https://geo.datav.aliyun.com/areas_v3/bound/410100_full.json'
    );
    const lineDown = new LineLayer({
        name: '浮空城市下边界',
    })
        .source(zz_data.data)
        .shape('line')
        .color('#0DCCFF')
        .size(1);
    return lineDown;
};
const floatLineUp = async () => {
    const zz_data = await axios(
        'https://geo.datav.aliyun.com/areas_v3/bound/410100_full.json'
    );
    const lineUp = new LineLayer({
        zIndex: 1,
        name: '浮空城市上边界',
    })
        .source(zz_data.data)
        .shape('line')
        .color('#0DCCFF')
        .size(1)
        .style({
            heightfixed: true,
            raisingHeight: 40000,
        });
    return lineUp;
};
// 地理围墙
const cityWall = async () => {
    const zz_data = await axios('http://localhost:8080/zzBorder');
    const lineLayer = new LineLayer({
        zIndex: 1,
        name: '地理围墙',
    })
        .source(zz_data.data)
        .shape('wall')
        .size(40)
        .style({
            heightfixed: true,
            opacity: 0.6,
            sourceColor: '#0DCCFF',
            targetColor: 'rbga(255,255,255, 0)',
        });
    return lineLayer;
};
// 面状地图
const mapBlock = async () => {
    const zz_data = await axios(
        'https://geo.datav.aliyun.com/areas_v3/bound/410100_full.json'
    );
    const provincelayer = new PolygonLayer({
        name: '面状地图',
    })
        .source(zz_data.data)
        .shape('extrude')
        .color('#0DCCFF')
        .style({
            heightfixed: true,
            pickLight: true,
            raisingHeight: 20000,
            opacity: 0.8,
        });
    return provincelayer;
};
// 漂浮地图板块 end

// 郑州市地下管网巡检分布
const inspectionPip = async () => {
    const insPipData = await axios('http://localhost:8080/zzPipe');
    const insPip_layer = new LineLayer({
        name: '地下管网巡检分布图',
        zIndex: 2,
    })
        .source(insPipData.data)
        .size(1)
        .shape('line')
        .color('From_', ['#3fae5d', '#e9b42d', '#f567ba'])
        .style({
            borderWidth: 0.2,
            borderColor: '#fff',
        })
        .active(true)
        .animate({
            interval: 1, // 间隔
            duration: 2, // 持续时间，延时
            trailLength: 2, // 流线长度
        })
        .filter('coordinates', (evt) => {
            // console.log(evt)
            return evt.length > 20;
        });
    return insPip_layer;
};

// 郑州市地下管道背景
const backgroundPip = async () => {
    const insPipData = await axios('http://localhost:8080/zzPipe');
    const insPip_layer = new LineLayer({
        name: '地下管网背景',
        zIndex: 2,
    })
        .source(insPipData.data)
        .size(1)
        .shape('line')
        .color('#c6e2ff')
        .active(false)
        .animate({
            interval: 1, // 间隔
            duration: 2, // 持续时间，延时
            trailLength: 2, // 流线长度
        })
        .filter('coordinates', (evt) => {
            // console.log(evt)
            return evt.length > 20;
        });
    return insPip_layer;
};

// 封装加载热力图的函数
const renderHeatmap = async () => {
    const heatmapData = await axios('http://localhost:8080/zzHeatMap');
    console.log(heatmapData);
    const heatmap_layer = new HeatmapLayer({
        name: '管网节点热力图',
    })
        .source(heatmapData.data)
        .shape('heatmap')
        .size('ID', [0, 2]) // weight映射通道
        .style({
            intensity: 0.5,
            radius: 40,
            rampColors: {
                colors: [
                    '#FF4818',
                    '#F7B74A',
                    '#FFF598',
                    '#91EABC',
                    '#2EA9A1',
                    '#206C7C',
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
            },
        });
    console.log('热力图');
    return heatmap_layer;
};

// 封装加载排水站点的函数
const drainageStation = async () => {
    const stationData = await axios('http://localhost:8080/zzStation');
    const station_layer = new PointLayer({
        name: '排水站点气泡图',
    })
        .source(stationData.data)
        .shape('circle')
        .size(8)
        .color('level', (level) => {
            if (level < 7.1) {
                return '#5CCEA1';
            } else if (level >= 7.1 && level < 9.45) {
                return '#FACC2E';
            } else if (level >= 9.45) {
                return '#F78181';
            }
        })
        .active(true)
        .style({
            opacity: 0.35,
            strokeWidth: 1,
        });
    console.log('排水站点');
    return station_layer;
};

onMounted(async () => {
    // 漂浮城市模块
    const zzText = await floatText();
    const zzLineDown = await floatLineDown();
    const zzLineUp = await floatLineUp();
    const zzWall = await cityWall();
    const zzBlock = await mapBlock();
    // 地下管网巡检分布图
    const zzInsPip = await inspectionPip();
    // 地下管网背景
    const zzBgPip = await backgroundPip();
    // 核密度统计（热力图）
    const pipHeatmap = await renderHeatmap();
    // 排水站点气泡
    const zzStation = await drainageStation();

    // 添加Popup
    const popup = new Popup({});
    scene.addPopup(popup);
    zzStation.on('click', (e) => {
        // 获取图表数据
        const data = [
            {
                time: '3 hour ago',
                value: e.feature.properties.la1,
            },
            {
                time: '2 hour ago',
                value: e.feature.properties.la2,
            },
            {
                time: '1 hour ago',
                value: e.feature.properties.la4,
            },
            {
                time: '30 min ago',
                value: e.feature.properties.la5,
            },
            {
                time: 'now',
                value: e.feature.properties.level,
            },
        ];

        console.log(e);
        console.log(data);
        const { lng, lat } = e.lngLat;
        popup.setOptions({
            title: `${e.feature.properties.StationNam}排水泵站`,
            // html: `当前水位<strong> ${e.feature.properties.level.toFixed(
            //     2
            // )} </strong>m`,
            html: `<div id="container" style="width: 350px; height: 200px;"></div>`,
            maxWidth: '400px',
            lngLat: {
                lng,
                lat,
            },
        });

        const area = new Area('container', {
            data,
            smooth: true,
            xField: 'time',
            yField: 'value',
            xAxis: {
                range: [0, 1],
                tickCount: 5,
            },
            areaStyle: () => {
                return {
                    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
                };
            },
        });
        area.render();
    });

    // 漂浮城市模块
    scene.addLayer(zzText);
    scene.addLayer(zzLineDown);
    scene.addLayer(zzLineUp);
    scene.addLayer(zzWall);
    scene.addLayer(zzBlock);

    // 地下管网巡检分布图
    scene.addLayer(zzInsPip);
    // 地下管网背景
    scene.addLayer(zzBgPip);

    // 加载热力图
    scene.addLayer(pipHeatmap);

    // 排水站点图层
    scene.addLayer(zzStation);

    // 不显示多余图层
    zzLineDown.hide();
    zzInsPip.hide();
    zzBgPip.hide();
    pipHeatmap.hide();
    zzStation.hide();

    // 添加图层控制器
    const layerControl = new LayerSwitch({
        layers: [
            zzText,
            zzLineDown,
            zzLineUp,
            zzWall,
            zzBlock,
            zzInsPip,
            zzBgPip,
            pipHeatmap,
            zzStation,
        ],
        title: '图层控制',
        position: 'topright',
    });
    scene.addControl(layerControl);
});
</script>
<style scoped>
.layer-control {
    width: 150px;
    height: 250px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 100;
    float: right;
    position: fixed;
    top: 144px;
    right: 10px;
    color: black;
}

.l7-popup-content {
    width: 400px !important;
    height: 250px !important;
}
</style>
