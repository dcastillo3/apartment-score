const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end'
        }
    }
};

const barChartProps = {
    type: {
        bar: 'bar'
    },
    barDirection: {
        horizontal: 'y',
        vertical: 'x'
    }
};

const defaultBarDirection = barChartProps.barDirection.horizontal;

const defaultBarChartType = barChartProps.type.bar;

const elementsAtEventForMode = 'nearest';

const px = 'px';

const pointerTypes = {
    pointer: 'pointer',
    default: 'default'
};

export {
    barChartOptions,
    barChartProps,
    defaultBarDirection,
    defaultBarChartType,
    elementsAtEventForMode,
    px,
    pointerTypes
};