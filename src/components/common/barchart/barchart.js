import React from 'react';
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
import { barChartOptions, defaultBarChartType, defaultBarDirection } from './barChartConsts';
import { useTheme } from 'styled-components';
import { buildScales } from './barChartUtils';

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
    type = defaultBarChartType 
}) {
    const theme = useTheme();
    // Set average row height for each label. theme.spacing outputs a value in pixels, remove px to get number
    const rowHeight = parseInt(theme.spacing(6).replace('px', ''));
    // Calculate height based on number of labels
    const height = data?.labels?.length * rowHeight;
    const scales = buildScales(barDirection, range);
        
        return (
            <BarChartContainer>
                <Chart
                    type={type}
                    data={data}
                    height={height}
                    options={{
                        ...barChartOptions,
                        indexAxis: barDirection,
                        scales
                    }}
                />
            </BarChartContainer>
        );
};

export default BarChart;