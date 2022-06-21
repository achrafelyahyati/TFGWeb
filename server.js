
const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.get('/receive', (req, res) => {
    

    var Setpoint = req.query.time;
    const spawner = require('child_process').spawn;

    console.log('Data sent to python script: ', Setpoint);
    const python_process = spawner('python',['./connectMatlab.py', Setpoint]);
    
    python_process.stdout.on('data', (data) =>{
       var arrayRead = data 
       console.log('Data received from python script open loop:', data.toString());
       res.send(arrayRead)
      // console.log('Data received from python script cleaned:', data);
    });

    
})

app.get('/receivecl', (req, res) => {

  var arrayClPy = req.query.time.split(',');
  const spawner = require('child_process').spawn;

  console.log('Data sent to python script: ', arrayClPy);

  const python_processCl = spawner('python',['./clconnectMatlab.py', arrayClPy]);
  //console.log(python_processCl);
  python_processCl.stdout.on('data', (dataCl) =>{
     var arrayReadCl = dataCl;
     console.log('Data received from python script closed loop:', arrayReadCl.toString());
     res.send(arrayReadCl);
    // console.log('Data received from python script cleaned:', data);
  });

  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})