const barChartOptions = {
    responsive: true,
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

export {
    barChartOptions,
    barChartProps,
    defaultBarDirection,
    defaultBarChartType
};