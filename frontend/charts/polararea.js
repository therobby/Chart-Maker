var polarAreaChart;

function polarAreaChartSelected(button) {
    setDefaultNavButtonStyle()
    button.classList.remove("button-outline");
    hideAll();
    loadPolarAreaChart();
    $("#chart-container-polar-area").css("display", "flex");
    let chartDownloadData = { element: $('#chart-container-polar-area'), function: downloadPolarAreaChart };
    if (!chartsId.includes(chartDownloadData))
        chartsId.push(chartDownloadData);
}

function loadPolarAreaChart() {
    var ctx = $("#polarAreaChart")[0].getContext("2d")
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    polarAreaChart = new Chart(ctx, {
        type: "polarArea",
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

function downloadPolarAreaChart() {
    if (polarAreaChart) {
        downloadChart(polarAreaChart, "polarAreaChart");
    }
}