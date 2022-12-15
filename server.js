const net = require('net');

const server = net.createServer()

let messages = [];
let info = [];
server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
       
        const obj = JSON.parse(data);

        messages.push(obj);
       
        var today= new Date();
        //console.log('\nEl cliente ' + ": " + socket.remotePort + " dice: " + obj.hora);
        var diff = Math.abs(obj.milisegundos-today.getMilliseconds());
        info.push("Mensaje: "+ obj.message+ "\nDiferencia de tiempo: "+ diff+"\n");
        messages.forEach(function(elemento) {
            today= new Date();
            console.log(elemento);
            
           //console.log("Diferencia de tiempo envio-recepcion: " +diff+" milisegundos"  )
           //console.log("Diferencia de tiempo en milisegundos: " + (Math.abs(obj.fecha-today))  )
           //socket.write("Mensaje enviado: "+ obj.message + "\n"+ "Diferencia de tiempo: "+ diff);
          
        });
       // const obj2 = JSON.parse(messages);
        //socket.write(JSON.stringify(messages)+"\n Mensaje enviado: "+ obj.message + "\n"+ "Diferencia de tiempo: "+ diff);
        socket.write(info.toString());
        //socket.write("Mensaje enviado: "+ obj.message + "\n"+ "Diferencia de tiempo: "+ diff);

        
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