//var REC = require('require.js')


$(document).ready(function(){
    M.AutoInit();
    console.log("FLAG")
    runChart()
    runChartCl()

});

let runChart = (data = []) => {
    Highcharts.chart('chart', {

        title: {
            text: 'Motor DC'
        },
    
        subtitle: {
            text: ''
        },
    
        yAxis: {
            title: {
                text: 'Voltage (V)'
            }
        },
    
        xAxis: {
            /*categories: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 0.4, 0.6, 0.8, 1.0, 0.4 0.4 0.4 0.4 0.4 0.4 0.4 0.4 0.4.4 0.4 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          */ /* accessibility: {
                rangeDescription: 'Range: 0 to 11'
            }*/
            tickInterval: 1,
            title: {
                text: 'Time (s)'
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0,
                pointInterval: 0.2
            }
        },
    
        series: [{
            name: 'Real Voltage',
            data: data
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

let runChartCl = (data = []) => {
    Highcharts.chart('chartcl', {

        title: {
            text: 'Motor DC'
        },
    
        subtitle: {
            text: ''
        },
    
        yAxis: {
            title: {
                text: 'Voltage (V)'
            }
        },
    
        xAxis: {
            tickInterval: 1,
            title: {
                text: 'Time (s)'
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0,
                pointInterval: 0.2
            }
        },
    
        series: [{
            name: 'Real Voltage',
            data: data
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

function writeValuesOpenLoop(){
    
    var opSetpoint =  $('#consignaop').val() ? $('#consignaop').val() : null;
    if(opSetpoint === null || opSetpoint<0){
        alert("Setpoint not assigned")
    }
    requestWriteOpenloopPy(opSetpoint);

}

function requestWriteOpenloopPy(opSetpointPy){
  
    url = 'http://localhost:3000/receive?time=' + opSetpointPy + ''
      $.ajax({
        type:"GET", // la variable type guarda el tipo de la peticion GET,POST,..
        url:url, //url guarda la ruta hacia donde se hace la peticion
        success:function(datos, status){ //success es una funcion que se utiliza si el servidor retorna informacion
             console.log({datos, status})
             datos = JSON.parse(datos)
             var datosCleaned = []
             for (let i = 0; i < datos.length; i++) {
                 const dato = datos[i];
                 for (let j = 0; j < dato.length; j++) {
                     const val = dato[j];
                     datosCleaned.push(val)
                 }
             }
             runChart(datosCleaned)   
         },
    })
}

function writeValuesClosedLoop(){

    var clSetpoint =  $('#consignacl').val() ? $('#consignacl').val() : null;
    var clKp =  $('#kp').val() ? $('#kp').val() : null;
    var clKi =  $('#ki').val() ? $('#ki').val() : null;

    if(clSetpoint === null || clSetpoint<0){
        alert("Setpoint not assigned")
    }
    if(clKp === null || clKp<0){
        alert("Kp not assigned")
    }
    if(clKi === null || clKi<0){
        alert("Ki not assigned")
    }
    clSetpoint = parseFloat(clSetpoint);
    clKp = parseFloat(clKp);
    clKi = parseFloat(clKi);
    requestWriteClosedloopPy(clSetpoint, clKp, clKi);
}                                                                                                              

function requestWriteClosedloopPy(clSetpointPy, clKpPy, clKiPy){            

    console.log(typeof(clSetpointPy));
    var arraycl = [clSetpointPy, clKpPy, clKiPy]
    console.log(arraycl);
    console.log(typeof(arraycl));
    url = 'http://localhost:3000/receivecl?time=' + arraycl + ''
    $.ajax({
        type:"GET", 
        url:url, 
        success:function(datos, status){ 
             console.log({datos})
             datos = JSON.parse(datos)
             var datosCleaned = []
             for (let i = 0; i < datos.length; i++) {
                 const dato = datos[i];
                 for (let j = 0; j < dato.length; j++) {
                     const val = dato[j];
                     datosCleaned.push(val)
                 }
             }
             runChartCl(datosCleaned)
         },
    })
}