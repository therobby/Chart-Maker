const remote = require("electron").remote;

class DataPack {
    dataSets = [];
    constructor(borderWidth = 0) {
        this.borderWidth = borderWidth;
    }

    labelsCheck(data) {
        if (this.dataSets[0].length === data.length) {
            for (let i = 0; i > data.length; i++) {
                if (data[i].label != this.dataSet[0][i])
                    return false;
            }
        }
        return true;
    }

    addDataSet(label, data) {
        if (this.dataSets.length > 0) {
            if (this.labelsCheck(data)) {
                this.dataSets.push({ label, data });
            } else {
                throw Error("Different data labels");
            }
        } else {
            this.dataSets.push({ label, data });
        }
    }

    getChartDataset() {
        let dataset = [];
        this.dataSets.forEach(element => {
            dataset.push({ label: element.label, data: [], backgroundColor: [], borderColor: [], borderWidth: this.borderWidth });
            element.data.forEach(set => {
                dataset[dataset.length - 1].data.push(set.data);
                dataset[dataset.length - 1].backgroundColor.push(set.backgroundColor);
                dataset[dataset.length - 1].borderColor.push(set.borderColor);
            });
        });
        console.log(dataset);
        return dataset;
    }

    getChartLabels() {
        let labels = [];
        this.dataSets[0].data.forEach(element => {
            labels.push(element.label);
        });
        console.log(labels);
        return labels;
    }
}

class DataElement {
    constructor(data, label, backgroundColor, borderColor = undefined) {
        this.data = data;
        this.label = label;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor ?? backgroundColor;
    }
}

var dataSet = new DataPack(1);
dataSet.addDataSet("Colors", [
    new DataElement(12, "Red", "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 1)"),
    new DataElement(19, "Blue", "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 1)"),
    new DataElement(3, "Yellow", "rgba(255, 206, 86, 0.2)", "rgba(255, 206, 86, 1)"),
    new DataElement(5, "Green", "rgba(75, 192, 192, 0.2)", "rgba(75, 192, 192, 1)"),
    new DataElement(2, "Purple", "rgba(153, 102, 255, 0.2)", "rgba(153, 102, 255, 1)"),
    new DataElement(3, "Orange", "rgba(255, 159, 64, 0.2)", "rgba(255, 159, 64, 1)"),
]);
dataSet.addDataSet("Tests", [
    new DataElement(1, "t1", "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 1)"),
    new DataElement(2, "t2", "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 1)"),
    new DataElement(3, "t3", "rgba(255, 206, 86, 0.2)", "rgba(255, 206, 86, 1)"),
    new DataElement(4, "t4", "rgba(75, 192, 192, 0.2)", "rgba(75, 192, 192, 1)"),
    new DataElement(5, "t5", "rgba(153, 102, 255, 0.2)", "rgba(153, 102, 255, 1)"),
    new DataElement(6, "t6", "rgba(255, 159, 64, 0.2)", "rgba(255, 159, 64, 1)"),
]);

self.onresize = () => {
    Array.from(document.getElementsByClassName("app-container")).forEach(container => {
        let chartContainer = container.getElementsByClassName("chart-container"),
            controlls = container.getElementsByClassName("controlls")[0];

        let targetChartContainerWidth = Number.parseInt(
            container.getBoundingClientRect().width -
            controlls.getBoundingClientRect().width
        ),
            targetChartContainerHeight = Number.parseInt(
                container.getBoundingClientRect().height -
                controlls.getBoundingClientRect().height
            );

        $(chartContainer).each(function () {
            $(this).css("width", targetChartContainerWidth + "px");
            $(this).css("height", (targetChartContainerHeight || container.style.height) + "px");
        })
    })
};

function setDefaultNavButtonStyle() {
    let buttons = document.getElementById("nav-buttons").getElementsByTagName('button');
    Array.from(buttons).forEach(button => {
        if (!button.classList.contains("button-outline")) button.classList.add("button-outline")
    })
}

function hideAll() {
    let containers = document.getElementsByClassName("chart-container");
    Array.from(containers).forEach(container => {
        container.style.display = "none";
    })
}

function initSelect() {
    hideAll();
    barChartSelected($('#bar-button')[0]);
}

$(function () {
    initSelect();
});

function getUserFile() {
    var dialog = remote.dialog;
    return dialog.showOpenDialog({
        filters: [
            { name: "Comma Separated Values", extensions: ["csv", "txt"] }
        ],
        properties: ['openFile'],

    });
}

function loadCSVData() {
    getUserFile().then(file => {
        if (file) {
            let fs = remote.require('fs');
            fs.readFile(file.filePaths[0], 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    try {
                        console.log(data);
                        let csvdata = $.csv.toArrays(data);
                        console.log(data);

                        if (csvdata.length > 0) {
                            dataSet = new DataPack(1);

                            let labels = [];
                            csvdata[0].forEach(label => {
                                labels.push(label);
                            })

                            for (let i = 1; i < csvdata.length; i++) {
                                let data = [];
                                let label = "";
                                for (let j = 0; j < csvdata[i].length; j++) {
                                    if (j === 0) {
                                        label = csvdata[i][j];
                                    } else {
                                        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                                        data.push(new DataElement(csvdata[i][j], labels[j], '#' + randomColor + 'ff'));
                                    }
                                }
                                dataSet.addDataSet(label, data);
                            }
                        }
                        console.log(dataSet);
                        initSelect();
                    } catch (err) {
                        console.error(err);
                        alert("Data load failed");
                    }
                }
            });
        }
    }).catch(err => {
        console.error(err);
    })
}