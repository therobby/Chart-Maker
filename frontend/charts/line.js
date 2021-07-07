var lineChart;

function lineChartSelected(button) {
    setDefaultNavButtonStyle()
    button.classList.remove("button-outline");
    hideAll();
    loadLineChart();
    $("#chart-container-line").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-line'), function: downloadLineChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadLineChart() {
    var ctx = $("#lineChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    for (let i = 0; i < datasets.length; i++) {
        datasets[i].fill = false;
    }
    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets,
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [
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

function downloadLineChart() {
    if (lineChart) {
        downloadChart(lineChart, "lineChart");
    }
}