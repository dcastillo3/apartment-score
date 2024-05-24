import React, { useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarChartContainer } from './barChartStyledComponents';
import { barChartOptions, defaultBarChartType, defaultBarDirection, elementsAtEventForMode } from './barChartConsts';
import { useTheme } from 'styled-components';
import { buildHeight, buildScales, formatBarChartData, pointerOnHover } from './barChartUtils';

ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels
);

// Data: { labels: array of strings, datasets: array of objects with label and data properties }
// Range: object with min and max values for x-axis
function BarChart({ 
    data, 
    range, 
    barDirection = defaultBarDirection,
    type = defaultBarChartType,
    handleBarClick = null 
}) {
    const theme = useTheme();
    const barChartRef = useRef(null);
    const formattedData = handleBarClick ? formatBarChartData(data) : data;
    const height = buildHeight(barDirection, theme, data);
    const scales = buildScales(barDirection, range);

    const handleClick = e => {
        const barChart = barChartRef.current;

        if (barChart) {
            const elements = barChart.getElementsAtEventForMode(e, elementsAtEventForMode, { intersect: true }, false);
            
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                // Access original data from the dataset
                const clickedElement = data.datasets[datasetIndex].data[index];

                handleBarClick(clickedElement);
            };
        };
    };
    
    return (
        <BarChartContainer>
            <Chart
                ref={barChartRef}
                type={type}
                data={formattedData}
                height={height}
                options={{
                    ...barChartOptions,
                    indexAxis: barDirection,
                    scales,
                    onClick: handleBarClick ? handleClick : null,
                    onHover: handleBarClick ? pointerOnHover : null
                }}
            />
        </BarChartContainer>
        );
};

export default BarChart;