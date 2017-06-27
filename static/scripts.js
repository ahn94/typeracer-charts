var chartWPM;
var chartAcc;

$(function () { 
    console.log("working");
    
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        console.log("File API is supported!");
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
    
    $('#submit').on("click",function(e){
        e.preventDefault();
        var file = $('#files').get(0).files[0];
        parseCSV(file);
    });

});


function parseCSV(file) {
    
    if (!file) {
        alert('Please select a file!');
        return;
    }
    
    Papa.parse(file, {
        config: {
            delimiter: "auto",
            complete: toChart
        },
        error: function(err, file)
        {
            console.log("ERROR:", err, file);
            throw(err);
        },
        complete: function(results, file) {
            console.log("Parsing complete:", results, file);
            toChart(results, file);
            
        }
    });
}

function toChart(json, file) {
    
    var wpm = [];
    var acc = [];
    
    for (var i = 1; i < json.data.length; i++) {
        wpm.push([parseInt(json.data[i][1], 10)]);
        acc.push([parseFloat(json.data[i][2]), parseInt(json.data[i][1], 10)]);
    }

    $('#container').removeClass('gone');
    chartWPM = Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'x'
        },
        title: {
            text: 'TypeRacer WPM'
        },
        yAxis: {
            title: {
                text: 'WPM'
            }
        },
        xAxis: {
            title: {
                text: 'Race #'
            },
            minTickInterval: 1
        },
        tooltip: { 
            enabled: true,
            pointFormat: "{series.name}: <b>{point.y}</b><br/>",
            animation: false,
            headerFormat: ""
        },
        plotOptions: {
            series: {
                turboThreshold: 150000,
                animation: false
            }
        },
        series: [{
            name: 'WPM',
            color: 'rgba(119, 152, 191, .3)',
            data: wpm,
            marker: {
                radius: 6
            }
        }]
    });
    
    $('#container2').removeClass('gone');
    chartWPM = Highcharts.chart('container2', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: 'TypeRacer WPM'
        },
        yAxis: {
            title: {
                text: 'WPM'
            }
        },
        xAxis: {
            title: {
                text: 'Accuracy Percentage'
            },
            minTickInterval: .005
        },
        tooltip: { 
            enabled: true,
            pointFormat: "{series.name}: <b>{point.y}</b><br/>",
            animation: false,
            headerFormat: ""
        },
        plotOptions: {
            series: {
                turboThreshold: 150000,
                animation: false
            }
        },
        series: [{
            name: 'WPM',
            color: 'rgba(119, 152, 191, .3)',
            data: acc,
            marker: {
                radius: 6
            }
        }]
    });
    
    
}
