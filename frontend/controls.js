var chartsId = [];

function downloadChart(chart, id) {
    if (chart) {
        let canvas = document.getElementById(id);
        let img = canvas.toDataURL("image/png");

        let tempDownloadButton = document.createElement("a");
        tempDownloadButton.href = img;
        tempDownloadButton.target = "_blank";
        tempDownloadButton.download = "chart.png";
        tempDownloadButton.title = "chart.png";
        tempDownloadButton.click();
    }
}

function downloadCurrentChart() {
    chartsId.forEach(chart => {
        // console.log(chart);
        // console.log($(chart.element).css("display"));
        if (($(chart.element).css("display") ?? "") !== "none") {
            chart.function();
            return;
        }
    })
}

function reloadData(chart) {
    // removeData(chart);
    let labels = dataSet.getChartLabels();
    let datasets = dataSet.getChartDataset();
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
}

function addData(chart) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}