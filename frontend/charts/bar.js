var barChart;

function barChartSelected(button) {
    setDefaultNavButtonStyle();
    button.classList.remove("button-outline");
    hideAll();
    loadBarChart();
    $("#chart-container-bar").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-bar'), function: downloadBarChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadBarChart() {
    var ctx = $("#barChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    if (barChart) {
        reloadData(barChart);
    } else {
        barChart = new Chart(ctx, {
            type: "bar",
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
}

function downloadBarChart() {
    if (barChart) {
        downloadChart(barChart, "barChart");
    }
}