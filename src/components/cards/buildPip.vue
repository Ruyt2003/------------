<template>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @row-dblclick="clickRow"
    >
        <el-table-column prop="name" label="名称" width="220" />
        <el-table-column prop="applicant" label="申报方" width="180" />
        <el-table-column prop="constructor" label="施工方" width="280" />
        <el-table-column prop="goal" label="建设目标" width="500" />
        <el-table-column prop="position" label="位置" width="520" />
        <!-- <el-table-column prop="Lat" label="纬度" width="120" />
        <el-table-column prop="Lng" label="经度" width="120" /> -->
        <el-table-column prop="management" label="管理方归属" width="180" />
    </el-table>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, inject } from 'vue';
const { scene, map } = inject('$scene_map');
import { Marker, Popup } from '@antv/l7';
const prop = defineProps({
    dialogVisible: {
        type: Boolean,
    },
});
const emit = defineEmits('changeDia');

const tableData = [
    {
        name: '郑州市二砂南路 (西三环—华山路)道路工程',
        applicant: '郑州市城乡建设局',
        constructor: '河南省路桥建设集团有限公司',
        position: '二砂南路 (西三环—华山路)段',
        goal: '改善道路通行条件，提高道路服务水平',
        Lat: '34.5',
        Lng: '113.1667',
        management: '郑州市城乡建设局',
    },
    {
        name: '新郑路改造工程',
        applicant: '郑州市城市管理局',
        constructor: '郑州市城市管理局下属的市政工程公司',
        position: '新郑路，从新郑路与西四环交叉口至新郑路与西三环交叉口',
        goal: '改造原有的老旧燃气管网，提高供气能力和安全性能，实现地下空间的合理开发利用，促进城市功能的完善，推动城市智慧化建设与管理',
        Lat: '34.7333',
        Lng: '113.9333',
        management: '郑州市燃气集团有限公司',
    },
    {
        name: '郑州市西干渠（京广南路-南水北调总干渠）综合治理工程',
        applicant: '郑州市城乡建设局',
        constructor: '河南省水利水电勘测设计院有限公司',
        position: '西干渠（京广南路-南水北调总干渠）段',
        goal: '加强水系连通，提升水环境质量',
        Lat: '34.65',
        Lng: '112.9',
        management: '郑州市城乡建设局',
    },
    {
        name: '郑州市地铁建设工程',
        applicant: '郑州市轨道交通建设管理有限公司',
        constructor: '中铁十四局集团有限公司等',
        position:
            '郑州市城乡规划区内，涉及金水区、中原区、二七区、管城区、惠济区、高新区、经开区、郑东新区等8个区',
        goal: '建设地铁线路，提供快速、安全、舒适的城市轨道交通服务，缓解城市交通拥堵，优化城市交通结构，提升城市形象，推动城市经济社会发展',
        Lat: '34.45',
        Lng: '113.25',
        management: '郑州市轨道交通集团有限公司',
    },
    {
        name: '郑州市秋云路、浔江西路（樱桃路-箕山路）道路工程',
        applicant: '郑州市城乡建设局',
        constructor: '河南省路桥建设集团有限公司',
        position: '秋云路、浔江西路（樱桃路-箕山路）段',
        goal: '完善道路网，缓解交通压力',
        Lat: '34.85',
        Lng: '113.7',
        management: '郑州市城乡建设局',
    },
    {
        name: '郑州市塔湾路 (规划路-东里路)道路工程',
        applicant: '郑州市城乡建设局',
        constructor: '河南省路桥建设集团有限公司',
        position: '塔湾路 (规划路-东里路)段',
        goal: '改善道路通行条件，提高道路服务水平',
        Lat: '34.3667',
        Lng: '113.0333',
        management: '郑州市城乡建设局',
    },
    {
        name: '郑州市地下水综合治理工程',
        applicant: '郑州市水利局',
        constructor: '郑州市水利工程建设有限公司等',
        position:
            '郑州市城乡规划区内，涉及金水区、中原区、二七区、管城区、惠济区、高新区、经开区、郑东新区等8个区',
        goal: '治理城市地下水超采、地面沉降、地下水污染等问题，提高地下水资源利用效率，保障城市供水安全，改善城市生态环境，促进城市可持续发展',
        Lat: '34.8',
        Lng: '113.5667',
        management: '郑州市水利局',
    },
    {
        name: '郑州市彩虹桥及接线拆解与新建工程',
        applicant: '郑州市城乡建设局',
        constructor: '河南省路桥建设集团有限公司',
        position: '郑州市南阳路北环立交西',
        goal: '拆除老旧桥梁，新建现代化桥梁，并更新地下管线',
        Lat: '34.3',
        Lng: '113.1333',
        management: '郑州市城乡建设局',
    },
];

// 点击行跳转至行中的经纬度
const clickRow = (row) => {
    console.log(row);
    const { Lat, Lng, name } = row;
    //提交emit请求父组件修改
    emit('changeDia');

    // 添加popup
    const popup = new Popup({
        offsets: [0, 40],
        closeButton: false,
    })
        .setLnglat([Lng, Lat])
        .setHTML(
            `<div style="color: #000; font-size: 14px; font-weight: bold;">${name}</div>`
        );

    // 添加标记
    const marker = new Marker({
        color: '#f47784',
    })
        .setLnglat([Lng, Lat])
        .setPopup(popup);
    scene.addMarker(marker);

    // 右键marker移除marker
    marker.on('contextmenu', () => {
        marker.remove(marker);
    });
};
</script>
<style scoped>
* {
    /* 文字不可被选中 */
    user-select: none;
}
</style>
