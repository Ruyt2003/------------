<template>
    <div class="displayCard">
        <el-table :data="tableData" style="width: 100%" @row-click="clickRow">
            <el-table-column prop="ID" label="编号" width="90">
            </el-table-column>
            <el-table-column prop="event" label="类型" width="90">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.stop="handleClick(scope.row)"
                        >详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="详细信息"
        width="50%"
        :append-to-body="true"
    >
        <el-table
            :data="detailData"
            style="width: 100%"
            size="small"
            :max-height="400"
            @row-click="clickRow"
        >
            <el-table-column
                :show-overflow-tooltip="true"
                prop="ID"
                label="故障编号"
            />
            <el-table-column
                :show-overflow-tooltip="true"
                prop="状态"
                label="当前状态"
            />
            <el-table-column
                :show-overflow-tooltip="true"
                prop="lng"
                label="坐标经度"
                :formatter="formatNumber"
            />
            <el-table-column
                :show-overflow-tooltip="true"
                prop="lat"
                label="坐标纬度"
                :formatter="formatNumber"
            />
            <el-table-column prop="event" label="故障类型" />
            <el-table-column prop="StationNam" label="详细地址" />
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDetail">故障影像</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog
        title="故障影像"
        v-model="picVisible"
        width="30%"
        top="15em">
        <h4 id="textBox"> {{ messText }} </h4>
        <img id="imgBox" :src="imgUrl" alt="">
        <span style="float: right;font-size: small;">*基于弱监督学习的地下管道故障检测</span>
        <template #footer>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="picVisible = false">我已知晓</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, inject } from 'vue';
import { PointLayer } from '@antv/l7';


const tableData = ref([]);
const props = defineProps({
    dataSource: Array,
});
const { scene, map } = inject('$scene_map');

let pointLayer;

// 格式化函数-只显示5位小数
const formatNumber = (row, column, cellValue) => {
    return cellValue.toFixed(5);
};

const renderCard = () => {
    // 每次重新渲染的时候，去掉之前的pointLayer
    if (pointLayer) {
        scene.removeLayer(pointLayer);
    }

    // 事故点数据处理
    const data = [];
    console.log(props.dataSource);
    props.dataSource.forEach((item) => {
        const {
            geometry,
            properties: { ID, event, ...rest },
        } = item;
        data.push({
            lng: geometry.coordinates[0],
            lat: geometry.coordinates[1],
            event,
            ID,
            ...rest,
        });
    });
    tableData.value = data;

    // 地图中的事故点渲染
    pointLayer = new PointLayer({ name: '事故点' })
        .source(data, {
            parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
            },
        })
        .shape('crash')
        .size(14);
    scene.addLayer(pointLayer);
};

// 点击行，进行跳转
let markLayer;
const clickRow = (row) => {
    markLayer && scene.removeLayer(markLayer);
    const { lng, lat } = row;

    // 视角飞到事故点
    map.flyTo({
        //飞行的中心点
        center: [lng, lat],
        //飞行之后地图的放大级别
        zoom: 15,
        //控制飞行的速度
        speed: 0.4,
        /* 俯仰角0-90 */
        pitch: 30,
    });

    // 添加动态点
    const data = [
        {
            lng,
            lat,
        },
    ];

    markLayer = new PointLayer({ name: '事故点' })
        .source(data, {
            parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
            },
        })
        .shape('radar')
        .size(60)
        .animate(true)
        .color('red');
    //在地图中添加动态点
    scene.addLayer(markLayer);
};

// 详情点击事件
const dialogVisible = ref(false);
const detailData = ref([]);
let evDetail = ref()
let plDetail = ref()
const handleClick = (row) => {
    dialogVisible.value = true;
    detailData.value = [row];
    console.log(row.event)
    evDetail = row.event
    plDetail = row.StationNam
};

const removeAll = () => {
    pointLayer && scene.removeLayer(pointLayer);
    markLayer && scene.removeLayer(markLayer);
};

// 查看详情
const picVisible = ref(false);
const messText = ref();
const imgUrl = ref();
const showDetail = () => {
    console.log(evDetail);
    dialogVisible.value = false;
    picVisible.value = true;
    messText.value = plDetail + evDetail + "情况监测："
    if (evDetail == "管道破裂")
    {
        imgUrl.value = "/src/assets/event/破裂.png"
    }
    else if (evDetail == "管道堵塞")
    {
        imgUrl.value =  "/src/assets/event/堵塞.png"
    }
    else if (evDetail == "管道漏水")
    {
        imgUrl.value = "/src/assets/event/漏水.png"
    }
    else if (evDetail == "管道结垢")
    {
        imgUrl.value = "/src/assets/event/结垢.png"
    }
    else if (evDetail == "外力破坏")
    {
        imgUrl.value = "/src/assets/event/外力.png"
    }
}

// 组件销毁时，移除pointLayer
onUnmounted(() => {
    removeAll();
}),
    onMounted(() => {
        renderCard();
        // 事故点图片加载
        !scene.hasImage('crash') &&
            scene.addImage('crash', '/src/assets/故障.png');
    });

watch(() => {
    renderCard();
});

defineExpose({
    removeAll,
});
</script>

<style scoped>
.displayCard {
    width: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 451px;
    bottom: 105px;
    outline: none;
    max-height: 500px;
    overflow: auto;
    overflow-x: hidden;
    color: #fff;
    background: #46464667;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    text-align: center;
}

.eleCeil {
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:deep(.el-table) {
    background-color: transparent;
}

:deep(.el-table tr) {
    background-color: transparent;
    color: #fff;
    cursor: pointer;
}

:deep(.el-table tr:hover) {
    background-color: #333;
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    background-color: transparent;
}

:deep(.el-table--enable-row-transition .el-table__body :hover) {
    background-color: rgba(141, 141, 141, 0.4) dcd;
    color: rgb(59, 59, 59);
}

:deep(.el-table th.el-table__cell) {
    background-color: transparent;
}

:deep(.el-table td.el-table__cell) {
    border-bottom: none;
}

:deep(.el-table__inner-wrapper::before) {
    height: 0;
}

:deep(.cell) {
    white-space: nowrap;
}

#imgBox {
    width: 90%;
    margin: 25px calc(5%);
}
</style>
