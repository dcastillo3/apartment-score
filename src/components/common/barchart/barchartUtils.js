const { barChartProps } = require("./barChartConsts");

const buildScales = (barDirection, range) => {
    const scales = {};

    if(barDirection === barChartProps.barDirection.horizontal) {
        scales.x = range;
    }

    if(barDirection === barChartProps.barDirection.vertical) {
        scales.y = range;
    }

    return scales;
};

export {
    buildScales
}