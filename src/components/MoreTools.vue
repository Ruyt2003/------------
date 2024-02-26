<template>
    <el-popover placement="top" width="150" trigger="hover"
        popper-style="background-color: #53697670;color: #fff;backdrop-filter: blur(10px);">
        <!-- popover的内容 -->
        <div class="popover-content">
            <div class="item" @click="dialogVisible = true" style="margin-bottom: 3px">
                管网建设
            </div>
            <div class="item" @click="drawerVisible = true" style="margin-bottom: 3px">
                智能检测
            </div>
            <div class="item" @click="heatMap" style="margin-bottom: 3px">
                核密度统计
            </div>
        </div>
        <!-- 让外部组件通过reference具名插槽，安装触发器 -->
        <template #reference>
            <slot></slot>
        </template>
    </el-popover>
    <!-- 郑州市地下管网建设管理中心 -->
    <el-dialog title="郑州市地下管网建设管理中心" v-model="dialogVisible" width="65%" top="8vh" :append-to-body="true">
        <h4>双击行可显示相应工程的开挖点</h4>
        <pre></pre>
        <test :dialogVisible="dialogVisible" @changeDia="changeDia" />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">我已知晓</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="drawerVisible" title="根据管道内影像智能检测故障" width="50%" top="10vh" :before-close="handleClose"  >
        <draweritem v-if="drawerVisible"></draweritem>
    </el-dialog>

</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import draweritem from './cards/draweritem.vue';
import test from './cards/buildPip.vue';
import { ElMessage } from 'element-plus';
const { scene, map } = inject('$scene_map');

const dialogVisible = ref(false);
const drawerVisible = ref(false);

const changeDia = () => {
    dialogVisible.value = false;
};

// 定义核密度统计状态
const isHeatmap = ref(true);
// let G2Visible = inject('G2Visible');
// const controlCenter = () => {
//     G2Visible.value = !G2Visible.value;
// };
const controlCenter = inject('controlCenter');
const heatMap = () => {
    const layers = scene.getLayers();
    controlCenter();
    if (!isHeatmap.value) {
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
                item.name == '管网节点热力图'
            ) {
                item.hide();
            }
        });
    } else {
        ElMessage({
            message: '郑州市地下管网核心节点核密度统计',
            type: 'success',
            offset: '10'
        })

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
                item.name == '管网节点热力图'
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
    }
    isHeatmap.value = !isHeatmap.value;
};

const drawer = ref(false);
</script>

<style scoped>

.popover-content {
    width: 125px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item {
    cursor: pointer;
    border-radius: 5px;
    width: 120px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    transition: all 0.3s;
    user-select: none;
}

.item:hover {
    background-color: #536976e0;
}
</style>
