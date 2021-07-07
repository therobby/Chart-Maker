var pieChart;

function pieChartSelected(button) {
    setDefaultNavButtonStyle()
    button.classList.remove("button-outline");
    hideAll();
    loadPieChart();
    $("#chart-container-pie").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-pie'), function: downloadPieChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadPieChart() {
    var ctx = $("#pieChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    pieChart = new Chart(ctx, {
        type: "pie",
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

function downloadPieChart() {
    if (pieChart) {
        downloadChart(pieChart, "pieChart");
    }
}