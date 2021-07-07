var radarChart;

function radarChartSelected(button) {
    setDefaultNavButtonStyle()
    button.classList.remove("button-outline");
    hideAll();
    loadRadarChart();
    $("#chart-container-radar").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-radar'), function: downloadRadarChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadRadarChart() {
    var ctx = $("#radarChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    for (let i = 0; i < datasets.length; i++) {
        datasets[i].fill = false;
    }
    radarChart = new Chart(ctx, {
        type: "radar",
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

function downloadRadarChart() {
    if (radarChart) {
        downloadChart(radarChart, "radarChart");
    }
}