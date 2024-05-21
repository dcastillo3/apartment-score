const BarChartProps = {
    type: 'bar',
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end'
            }
        }
    }
};

export {
    BarChartProps
};