export const usePeople = () => {
    const config = {
        height: 240,
        autoFit: true,
        xField: 'month',
        yField: 'value',
        smooth: false,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'top', // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
            },
        },
        meta: {
            value: {
                max: 0.9,
            },
        },
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
        lineStyle: {
            lineWidth: 4,
            strokeOpacity: 0.7,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: 'pointer'
        },
        interactions: [{ type: 'element-active' }],
        state: {
            // 设置 active 激活状态的样式
            active: {
                animate: { duration: 100, easing: 'easeLinear' },
                style: {
                    lineWidth: 4,
                    stroke: '#5ccfa3',
                },
            },
        },
        
    }
    const data = [
        { month: '1月', value: 0.3 },
        { month: '2月', value: 0.4 },
        { month: '3月', value: 0.7 },
        { month: '4月', value: 0.3 },
        { month: '5月', value: 0.3 },
        { month: '6月', value: 0.2 },
        { month: '7月', value: 0.1 },
        { month: '8月', value: 0.1 },

    ]
    return {
        config,
        data
    }
}
