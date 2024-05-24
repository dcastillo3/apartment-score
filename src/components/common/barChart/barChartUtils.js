const { barChartProps, px, pointerTypes } = require("./barChartConsts");

const buildScales = (barDirection, range) => {
    let scales;

    switch(barDirection) {
        case barChartProps.barDirection.horizontal: {
            scales = {
                x: range
            };

            break;
        };

        case barChartProps.barDirection.vertical: {
            scales = {
                y: range
            };

            break;
        };
    };

    return scales;
};

const buildHeight = (barDirection, theme, data) => {
    // Set average row height for each label. theme.spacing outputs a value in pixels, remove px to get number
    const rowHeight = parseInt(theme.spacing(6).replace(px, ''));
    let height;

    switch(barDirection) {
        case barChartProps.barDirection.horizontal: {
            // Calculate height based on number of labels
            height = data?.labels?.length * rowHeight;

            break;
        };

        case barChartProps.barDirection.vertical: {
            // Use default height for vertical bar charts
            height = null;

            break;
        };
    };

    return height;
};

const formatBarChartData = data => {
    const formattedBarChartDataset = data.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(dataPoint => dataPoint.value)
    }));
    const formattedBarChartData = {
        labels: data.labels,
        datasets: formattedBarChartDataset
    };

    return formattedBarChartData;
};

const pointerOnHover = (event, chartElement) => {
    event.native.target.style.cursor = chartElement.length ? pointerTypes.pointer : pointerTypes.default;
};

export {
    buildScales,
    buildHeight,
    formatBarChartData,
    pointerOnHover
}