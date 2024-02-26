export const usePopulation = () => {
    const data = [
        { type: '排水', value: 55 },
        { type: '供水', value: 35 },
        { type: '供气', value: 30 },
        { type: '其他', value: 15 },
    ];
    const config = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
            style: {
                /* 设置标注的颜色 */
                fill: '#fff',
                stroke: 'black',
                shadowColor: '#652e80',
                shadowBlur: 20,
                cursor: 'pointer',
            },
        },
        interactions: [{ type: 'element-active' }],
        data,
        height: 240,
        legend: {
            position: 'top',
            itemName: {
                style: {
                    fill: '#fff',
                },
            },
        },
    };
    return {
        config,
        data,
    };
};
