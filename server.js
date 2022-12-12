const net = require('net');

const server = net.createServer()

let messages = [];
server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
       
        const obj = JSON.parse(data);

        messages.push(obj);
       

        console.log('\nEl cliente ' + ": " + socket.remotePort + " dice: " + obj.hora);
        
        messages.forEach(function(elemento) {
            var today= new Date();
            console.log(elemento);
           console.log("Diferencia de tiempo envio-recepcion: " + (Math.abs(obj.milisegundos-today.getMilliseconds()))+" milisegundos"  )
           //console.log("Diferencia de tiempo en milisegundos: " + (Math.abs(obj.fecha-today))  )
        });


        socket.write('Recibido!')
    })

    socket.on('close', ()=>{
        console.log('Comunicación finalizada')
    })

    socket.on('error', (err)=>{
        console.log(err.message)
    })
})

server.listen(4000, ()=>{
    console.log('servidor esta escuchando en la puerta', server.address().port)
});