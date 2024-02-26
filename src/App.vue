<template>
    <Header></Header>
    <div id="map"></div>
    <div id="components">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { app } from './main';
import Header from './components/Header.vue';
// 引入mapboxgl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// 引入L7
import { Scene } from '@antv/l7';
// 引入L7-mapboxgl
import { Mapbox } from '@antv/l7-maps';

let loader, layer;

// 在组件加载的时候初始化地图
onMounted(() => {
    // 注册token
    const token = import.meta.env.VITE_TOKEN;
    mapboxgl.accessToken = token;

    // 创建mapbox地图
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [113.47, 34.6],
        zoom: 9,
        pitch: 40,
        projection: 'mercator',
    });


    // 创建L7实例
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            mapInstance: map,
        }),
        logoVisible: false,
    });

    // 设置雾效
    map.on('style.load', () => {
        map.setFog({});
    });

    // 使用provide 将地图实例化对象全局共享
    app.provide('$scene_map', { scene, map });
});

</script>

<style scoped>
#map {
    width: 100vw;
    height: 100vh;
}

Header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

#components {
    background-color: rgba(0, 0, 0, 0.331);
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.addBtn {
    width: 100px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    position: absolute; 
    right: 100px; 
    bottom: 0;
    z-index: 1999;
    background-color: #586dcb;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
}

.deleteBtn {
    width: 100px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    position: absolute; 
    right: 0; 
    bottom: 0; 
    z-index: 1999;
    background-color: #c75454;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
}

.infolegend {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}
.infolegend h4 {
    margin: 0 0 5px;
    color: #777;
}
.legend {
    line-height: 18px;
    color: #555;
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
</style>
