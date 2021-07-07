var horizontalBarChart;

function horizontalBarChartSelected(button) {
    setDefaultNavButtonStyle();
    button.classList.remove("button-outline");
    hideAll();
    loadHorizontalBarChart();
    $("#chart-container-horizontal-bar").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-horizontal-bar'), function: downloadHorizontalBarChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadHorizontalBarChart() {
    var ctx = $("#horizontalBarChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    if (horizontalBarChart) {
        reloadData(horizontalBarChart);
    } else {
        horizontalBarChart = new Chart(ctx, {
            type: "horizontalBar",
            data: {
                labels,
                datasets,
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }
}

function downloadHorizontalBarChart() {
    if (horizontalBarChart) {
        downloadChart(horizontalBarChart, "horizontalBarChart");
    }
}