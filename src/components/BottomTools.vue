<template>
    <div class="footer">
        <div class="item" v-for="item in funcItems">
            <DrawTools v-if="item.isPopover">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </DrawTools>
            <!-- 加载MeasureTool -->
            <MeasureTool v-else-if="item.isPopover2">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </MeasureTool>
            <MoreTools v-else-if="item.isPopover3">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </MoreTools>
            <button class="item-btn" @click="item.trigger" v-else>
                <i :class="['iconfont', item.icon]"></i>
            </button>
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { Control } from '@antv/l7';
const { scene, map } = inject('$scene_map');
import DrawTools from './DrawTools.vue';
import MeasureTool from './MeasureTool.vue';
import MoreTools from './MoreTools.vue';

// 定义数据面板状态
let G2Visible = ref(true);
// 定义漂浮城市状态
const isFloat = ref(true);
// 定义绘制状态
const isFocus = ref(true);

// 添加地图图例
// 管网图例
const legend = new Control({
    position: 'bottomright',
});
const color = ['#3fae5d', '#e9b42d', '#f567ba'];
legend.onAdd = function () {
    var el = document.createElement('div');
    el.className = 'infolegend legend';
    var grades = ['已清淤管道', '未完全堵塞管道', '已完全堵塞管道'];
    el.innerHTML = '<h3>地下管网状态</h3>';
    for (var i = 0; i < grades.length; i++) {
        el.innerHTML +=
            '<i style="background:' + color[i] + '"></i> ' + grades[i] + '<br>';
    }
    return el;
};
// 排水站图例
const legend2 = new Control({
    position: 'bottomright',
});
legend2.onAdd = function () {
    var el = document.createElement('div');
    el.className = 'infolegend legend';
    var grades = ['0m ~ 7.1m', '7.1m ~ 9.5m', '> 9.5m'];
    el.innerHTML = '<h3>排水泵站水位</h3>';
    for (var i = 0; i < grades.length; i++) {
        el.innerHTML +=
            '<i style="background:' + color[i] + '"></i> ' + grades[i] + '<br>';
    }
    return el;
};

// 控制中心
const emit = defineEmits(['controlCenter']);
const controlCenter = () => {
    G2Visible.value = !G2Visible.value;
    emit('controlCenter', G2Visible.value);
};

// 管网信息（漂浮城市）
const floatingCity = () => {
    const layers = scene.getLayers();
    controlCenter();
    if (!isFloat.value) {
        map.flyTo({
            center: [113.47, 34.6],
            zoom: 9,
            speed: 0.4,
            curve: 1,
            pitch: 40,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.show();
            } else if (
                item.name == '浮空城市下边界' ||
                item.name == '地下管网巡检分布图'
            ) {
                item.hide();
            }
        });
        legend.remove();
    } else {
        map.flyTo({
            center: [113.47, 34.62],
            zoom: 9.3,
            speed: 0.4,
            curve: 1,
            pitch: 0,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (
                item.name == '浮空城市下边界' ||
                item.name == '地下管网巡检分布图'
            ) {
                item.show();
            } else if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.hide();
            }
        });
        scene.addControl(legend);
    }
    isFloat.value = !isFloat.value;
};

// 水位监测
const waterCenter = inject('waterCenter');
const waterLevel = () => {
    const layers = scene.getLayers();
    controlCenter();
    waterCenter();
    if (!isFocus.value) {
        map.flyTo({
            center: [113.47, 34.6],
            zoom: 9,
            speed: 0.4,
            curve: 1,
            pitch: 40,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.show();
            } else if (
                item.name == '浮空城市下边界' ||
                item.name == '排水站点气泡图'
            ) {
                item.hide();
            }
        });
        legend2.remove();
    } else {
        map.flyTo({
            center: [113.32, 34.6276],
            zoom: 9.2,
            speed: 0.4,
            curve: 1,
            pitch: 0,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (
                item.name == '浮空城市下边界' ||
                item.name == '排水站点气泡图'
            ) {
                item.show();
            } else if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.hide();
            }
        });
        scene.addControl(legend2);
    }
    isFocus.value = !isFocus.value;
};

// 绘制时聚焦
const focusDraw = () => {
    const layers = scene.getLayers();
    controlCenter();
    if (!isFocus.value) {
        map.flyTo({
            center: [113.47, 34.6],
            zoom: 9,
            speed: 0.4,
            curve: 1,
            pitch: 40,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.show();
            } else if (
                item.name == '浮空城市下边界' ||
                item.name == '地下管网背景'
            ) {
                item.hide();
            }
        });
    } else {
        map.flyTo({
            center: [113.47, 34.62],
            zoom: 9.3,
            speed: 0.4,
            curve: 1,
            pitch: 0,
            easing: (t) => {
                return t;
            },
        });
        layers.forEach((item) => {
            if (item.name == '浮空城市下边界' || item.name == '地下管网背景') {
                item.show();
            } else if (
                item.name == '城市名称注释' ||
                item.name == '浮空城市上边界' ||
                item.name == '地理围墙' ||
                item.name == '面状地图'
            ) {
                item.hide();
            }
        });
    }
    isFocus.value = !isFocus.value;
};

// FIXME: 控制中心button
const funcItems = [
    {
        title: '运行监测',
        icon: 'icon-yunhangjiance',
        trigger: controlCenter,
    },
    {
        title: '管网状态',
        icon: 'icon-yunhangzhuangtai',
        trigger: controlCenter,
    },
    {
        title: '水位监测',
        icon: 'icon-guanwangshuiweijiance',
        trigger: waterLevel,
    },
    {
        title: '管网信息',
        icon: 'icon-guanwang',
        trigger: floatingCity,
    },
    {
        title: '故障监测',
        icon: 'icon-guzhangjiance',
        isPopover: true,
        trigger: focusDraw,
    },
    {
        title: '地图测量',
        icon: 'icon-celianggongju',
        isPopover2: true,
        trigger: focusDraw,
    },
    {
        title: '更多功能',
        icon: 'icon-more',
        isPopover3: true,
    },
];
</script>

<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: 8vh;
    z-index: 5;
    display: flex;
    background: url('../assets/xzd-footer.png') no-repeat;
    background-size: cover;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: blur(10px); */
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0 15px 5px 15px;
    font-size: 14px;
}

.item-btn {
    border-radius: 50%;
    background-color: #53697670;
    background: linear-gradient(
        to bottom,
        rgba(0, 128, 255, 0.377),
        rgba(0, 128, 255, 0.281)
    );
    padding: 15px;
    outline: none;
    border: none;
    box-shadow: 0 0 5px 3px #1e283ed4;
    cursor: pointer;
    color: #fff;
    margin-bottom: 4px;
    backdrop-filter: blur(5px);
}

.item-btn:hover {
    background-color: #536976c4;
    background: linear-gradient(
        to bottom,
        rgba(0, 128, 255, 0.577),
        rgba(0, 128, 255, 0.581)
    );
}
</style>

<!-- 图例样式 -->
<style>
.infolegend {
    padding: 10px 15px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255, 255, 255);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 0 30px 40px 0 !important ;
}
.infolegend h4 {
    margin: 0 0 5px;
    color: #777;
}
.legend {
    line-height: 30px;
    color: #555;
}
.legend i {
    width: 18px;
    height: 6px;
    line-height: 30px;
    margin: 12px 0 12px 0;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
</style>
