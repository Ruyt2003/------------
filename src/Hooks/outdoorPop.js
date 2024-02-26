import { ref } from 'vue';

export const useOutdoorPop = () => {
    const data = ref([
        { type: '供水', value: 100 },
        { type: '供气', value: 200 },
        { type: '排水', value: 580 },
        { type: '供暖', value: 150 },
        { type: '其他', value: 300 },
    ]);

    const green = '#00B96B';
    const yellow = '#fd7e14';
    const red = '#dc3545';
    const config = {
        xField: 'type',
        yField: 'value',
        seriesField: 'value',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'top', // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
            },
        },
        color: ({ value }) => {
            if (value >= 310) {
                return red;
            } else if (value > 150 && value < 310) {
                return yellow;
            } else {
                return green;
            }
        },
        legend: true,
        height: 260,
        // 设置坐标轴字体
        xAxis: {
            label: {
                style: {
                    fill: '#FFFFFF',
                },
            },
        },
        yAxis: {
            label: {
                style: {
                    fill: '#FFFFFF',
                },
            },
        },
    };
    return {
        config,
        data,
    };
};
