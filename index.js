
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)
//////////////////////////////////

const Discord = require('discord.js');
const client = new Discord.Client()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./datos.sqlite");

let prefix = process.env.prefix;
client.on("ready", ()=>{
    console.log('Todo Funcionando');
    client.user.setPresence({
        status: "online",
        activity:{
            name: 'La consola de Mantenimiento',
            type: "WATCHING"
        }
    })
    let SQLCreate = "CREATE TABLE IF NOT EXISTS broma (idusuario TEXT, nivel INTEGER)";

db.run(SQLCreate, function(err) {
    if (err) return console.error(err.message)
})

let tabla = "CREATE TABLE IF NOT EXISTS nick (idusuario INTEGER, name TEXT)";

db.run(tabla, function(err){
  if(err) return console.error(err.message)
})

//pagos
let pago = "CREATE TABLE IF NOT EXISTS pagos (idusuario TEXT, monto TEXT)";
db.run(pago, function(err){
  if(err) return console.error(err.message);
})
//Creacion de ebeds personalizados//
let title = "CREATE TABLE IF NOT EXISTS embedt (idusuario TEXT, titulo  TEXT)";
db.run(title, function(err){
  if(err) return console.error(err.message)
})
let subtitle = "CREATE TABLE IF NOT EXISTS embeds (idusuario TEXT, titulo  TEXT)";
db.run(subtitle, function(err){
  if(err) return console.error(err.message)
})
let contenido = "CREATE TABLE IF NOT EXISTS embedc (idusuario TEXT, contenido  TEXT)";
db.run(contenido, function(err){
  if(err) return console.error(err.message)
})
let color = "CREATE TABLE IF NOT EXISTS embedcolor (idusuario TEXT, color  TEXT)";
db.run(color, function(err){
  if(err) return console.error(err.message)
})

});

client.on("message", (message)  =>{

if(message.channel.type=='dm'){
  if(message.author.bot)return;
  message.reply(':x: | Los mensaje enviados por aqui no son recibidos por nadie | :x:')
    }
  if(message.channel.type=='dm')return
//Comands

if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

let allMembers = ['604322219916787713', '835735223773429801', '709535871170248764', '898715661721796618', '818633128745762816', '623969829623431186', '754860261403525171', '334809973844606977']


if(command === 'ping'){
  let ping = Math.floor(message.client.ws.ping);
   message.channel.send(':ping_pong: `'+ping+' ms.` desde Manteniminto :(.'); 
}
if(command === 'img'){
  message.delete();
  let permiso = message.member.hasPermission('MANAGE_MESSAGES');
  let img = args[0];
  if(!img)return
  let text = args.slice(1).join(' ') || ' ';
  if(!permiso) return message.reply('No, no, no...').then(msg=>msg.delete({timeout: 1000}))
  const imagen = new Discord.MessageAttachment(img)
  message.channel.send(text, imagen);
}
///////////////////////////////////Embeds personales////////////////////////////////////////////////////////////////////////////////
if(command==='embed'){

  let permiso = message.member.hasPermission('MANAGE_MESSAGES');
    if(!permiso) return message.channel.send('No tienes permisos serñor <@'+message.author.id+'>.').then(msg=>{msg.delete({timeout: 1000})})
  if(args[0] === 'titulo'){
    let titulo = args.slice(1).join(' ');
        if(!titulo) return message.channel.send('Coloque titulo').then(msg=>msg.delete({timeout: 1000}))

    let SQLSelect = `SELECT * FROM embedt WHERE idusuario = '${message.author.id}'`;
    db.get(SQLSelect, (err, filas) => {
      if (err) return console.error(err.message)
      if (!filas){

        let SQLInsert = `INSERT INTO embedt(idusuario, titulo) VALUES('${message.author.id}', '${titulo}')`;

          db.run(SQLInsert, function(err) {
          if (err) return console.error(err.message)
          message.channel.send('Titulo guardado').then(msg=>msg.delete({timeout: 1000}))
})
      }else{
        let update = `UPDATE embedt SET titulo = '${titulo}' WHERE idusuario = '${message.author.id}'`;

              db.run(update, function(err) {
              if (err) return console.error(err.message)
              message.channel.send('Titulo guardado y actualizado').then(msg=>msg.delete({timeout: 1000}))
              })
      }

  })
    

  }

  if(args[0]==='subtitulo'){
    let subtitulo = args.slice(1).join(' ');
        if(!subtitulo) return message.channel.send('No hay subtitulo').then(msg=>msg.delete({timeout: 1000}))

        let SQLSelect = `SELECT * FROM embeds WHERE idusuario = '${message.author.id}'`;

        db.get(SQLSelect, (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas){

              let SQLInsert = `INSERT INTO embeds(idusuario, titulo) VALUES('${message.author.id}', '${subtitulo}')`;

              db.run(SQLInsert, function(err) {
              if (err) return console.error(err.message)
              message.channel.send('Subtitulo guardado').then(msg=>msg.delete({timeout: 1000}))
    })

            }else{
              let update = `UPDATE embeds SET titulo = '${subtitulo}' WHERE idusuario = '${message.author.id}'`;

              db.run(update, function(err) {
              if (err) return console.error(err.message)
              message.channel.send('Subtitulo guardado y actualizado').then(msg=>msg.delete({timeout: 1000}))
              })
            }
        
            
        })

        
  }
  if(args[0]==='contenido'){
    let contenido = args.slice(1).join(' ');
        if(!contenido) return message.channel.send('No hay contenido').then(msg=>msg.delete({timeout: 1000}))

        let SQLSelect = `SELECT * FROM embedc WHERE idusuario = '${message.author.id}'`;

        db.get(SQLSelect, (err, filas) => {
            if (err) return console.error(err.message)
            if (!filas){

              let SQLInsert = `INSERT INTO embedc(idusuario, contenido) VALUES('${message.author.id}', '${contenido}')`;

              db.run(SQLInsert, function(err) {
              if (err) return console.error(err.message)
              message.channel.send('Contenido guardado').then(msg=>msg.delete({timeout: 1000}))
    })

            }else{
              let update = `UPDATE embedc SET contenido = '${contenido}' WHERE idusuario = '${message.author.id}'`;

              db.run(update, function(err) {
              if (err) return console.error(err.message)
              message.channel.send('Contenido guardado y actualizado').then(msg=>msg.delete({timeout: 1000}))
              })
            }
        
            
        })
  }

  if(args[0]==='color'){
    let color = args.slice(1).join(' ').toUpperCase();
    if(!color) return message.channel.send('No hay color').then(msg=>msg.delete({timeout: 1000}))

    let SQLSelect = `SELECT * FROM embedcolor WHERE idusuario = '${message.author.id}'`;

    db.get(SQLSelect, (err, filas) => {
        if (err) return console.error(err.message)
        if (!filas){

          let SQLInsert = `INSERT INTO embedcolor(idusuario, color) VALUES('${message.author.id}', '${color}')`;

          db.run(SQLInsert, function(err) {
          if (err) return console.error(err.message)

          const embed = new Discord.MessageEmbed()
          .setColor(color)
          message.channel.send(embed).then(msg=>msg.delete({timeout: 20000}))

  })
}else{
  let SQLUpdate = `UPDATE embedcolor SET color = '${color}' WHERE idusuario = '${message.author.id}'`;

db.run(SQLUpdate, function(err) {
    if (err) return console.error(err.message)
    const embed = new Discord.MessageEmbed()
    .setColor(color)
    message.channel.send(embed).then(msg=>msg.delete({timeout: 20000}))
    message.channel.send('Color actualizado').then(msg=>msg.delete({timeout: 1000}))
})
}
    })
  }
if(args[0]==='ejemplo'){

  let SQLSelectTitulo = `SELECT * FROM embedt WHERE idusuario = '${message.author.id}'`;
db.get(SQLSelectTitulo, (err, titu) => {
    if (err) return console.error(err.message)
    if(!titu) return message.channel.send('No hay Titulo')
    let titulo = titu.titulo;

  let SQLSelectSubtitulo = `SELECT * FROM embeds WHERE idusuario = '${message.author.id}'`;
db.get(SQLSelectSubtitulo, (err, sub) => {
    if (err) return console.error(err.message)
    if(!sub) return message.channel.send('No hay Subtitulo')
    let subtitulo = sub.titulo;

  let SQLSelectContenido = `SELECT * FROM embedc WHERE idusuario = '${message.author.id}'`;
db.get(SQLSelectContenido, (err, con) => {
    if (err) return console.error(err.message)
    if(!con) return message.channel.send('No hay COntenido')
    let contenido = con.contenido;

  let SQLSelectColor = `SELECT * FROM embedcolor WHERE idusuario = '${message.author.id}'`;
db.get(SQLSelectColor, (err, color) => {
    if (err) return console.error(err.message)
    if(!color) return message.channel.send('No hay Color')
    let Color = color.color;

  
  if(args[1]==='ver'){
    //consulta de base de datos
    const embed = new Discord.MessageEmbed()
    .setTitle(titulo)
    .setAuthor(message.guild.name , message.guild.iconURL())
    .addField(subtitulo, contenido)
    .setColor(Color)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    
    message.channel.send(embed)
  }
  
  if(args[1]==='imprimir'){
    let canal = args[2];
    if(!canal)return message.channel.send('Coloca canal')

    const embed = new Discord.MessageEmbed()
    .setTitle(titulo)
    .setAuthor(message.guild.name , message.guild.iconURL())
    .addField(subtitulo, contenido)
    .setColor(Color)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    client.channels.resolve(canal).send(embed)
    
    let SQLDelete1 = `DELETE FROM embedt WHERE idusuario = '${message.author.id}'`;
db.run(SQLDelete1, function(err) {
    if (err) return console.error(err.message)
    message.channel.send('Datos borrados titulo').then(msg=>msg.delete({timeout: 1000}))
})
    let SQLDelete2 = `DELETE FROM embeds WHERE idusuario = '${message.author.id}'`;
db.run(SQLDelete2, function(err) {
    if (err) return console.error(err.message)
    message.channel.send('Datos borrados subtitulo').then(msg=>msg.delete({timeout: 1000}))
})
    let SQLDelete3 = `DELETE FROM embedc WHERE idusuario = '${message.author.id}'`;
db.run(SQLDelete3, function(err) {
    if (err) return console.error(err.message)
    message.channel.send('Contenido borrado').then(msg=>msg.delete({timeout: 1000}))
})
message.channel.send(`Datos enviados a <#${canal}>`)
  }

})
})
})
})
  //
  }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Mensajes
if(command==='say'){
  let PER = message.member.hasPermission("MANAGE_MESSAGES");
  let texto = args.join(" ");
  if(!PER) return message.channel.send(`Como pienzas hacer que diga ese mensaje si no tienes permisos ${message.author}`).then(msg=>msg.delete({timeout: 4000}))
  message.delete();
if(!texto) return message.channel.send(`Escriba el contenido a enviar.`).then(msg=>msg.delete({timeout: 1000}));
message.channel.send(texto);
}
//Nicks
if(command === 'nick'){
    let nick = args.join(' ');
    if(!nick) return message.channel.send('Coloca ti nick `'+prefix+'nick <TuNombreEnMinecraft>`')

  let SQLSelect = `SELECT * FROM nick WHERE idusuario = ${message.author.id}`;

    db.get(SQLSelect, (err, filas) => {
      if (err) return console.error(err.message)
       if (!filas){
                 let SQLInsert = `INSERT INTO nick(idusuario, name) VALUES(${message.author.id}, '${nick}')`;
      
      db.run(SQLInsert, function(err) {
          if (err) return console.error(err.message)
          message.channel.send(`<@${message.author.id}> Se a añadido tu nick **${nick}** espera hasta que un administrador te indique que puedes entrar al Realm`)
          client.channels.resolve('751121369931972638').send(`El usuario <@${message.author.id}> se agrego su nick: **${nick}**`)
      })
       }else{
         message.channel.send(`<@${message.author.id}> YA NO PUEDES CAMBIAR TU NICK, TU SOLICITUD FUE ENVIADA A UN ADMINISTRADOR PARA QUE VEA TU CASO`)
         client.channels.resolve('751121369931972638').send(`El Miembro <@${message.author.id} quiso actualizar el nick a: **${nick}**`)
       }
    })

}
if(command === 'vernick'){
  message.delete()
  let permisos = message.member.hasPermission("ADMINISTRATOR");
    if(!permisos) return;
  let miembro = message.mentions.users.first();
    if(!miembro) return message.channel.send('Menciona a alguen').then(msg=>msg.delete({timeout: 500}))

    let SQLSelect = `SELECT * FROM nick WHERE idusuario = ${miembro.id}`;

db.get(SQLSelect, (err, filas) => {
    if (err) return console.error(err.message)
    if (!filas) return message.channel.send('Usuario no a registrado su NICK').then(msg=>msg.delete({timeout: 500}))
      client.channels.resolve('758413916426076200').send(`**<@${miembro.id}>** tiene el nick de **${filas.name}**`)
})
  
}
if(command==='cambiarnick'){
  message.delete()
  let permisos = message.member.hasPermission("ADMINISTRATOR");
    if(!permisos) return;
  let miembro = message.mentions.users.first();
    if(!miembro) return message.channel.send('Menciona a alguen').then(msg=>msg.delete({timeout: 500}))

    let nick = args.slice(1).join(' ')
    console.log(nick);
    
    let SQLSelect = `SELECT * FROM nick WHERE idusuario = ${miembro.id}`;

db.get(SQLSelect, (err, filas) => {
    if (err) return console.error(err.message)
    if (!filas){
      let SQLInsert = `INSERT INTO nick(idusuario, name) VALUES('${miembro.id}', '${nick}')`;
      
      db.run(SQLInsert, function(err) {
        if (err) return console.error(err.message)
        
        message.channel.send('Se agrego el nick: '+ nick).then(msg=>msg.delete({timeout: 1000}))
        client.channels.resolve('751121369931972638').send(`El usuario <@${miembro.id}> se agrego su nick: **${nick}**`)
})
    }else{
      let SQLUpdate = `UPDATE nick SET name = '${nick}' WHERE idusuario = '${miembro.id}'`;

db.run(SQLUpdate, function(err) {
    if (err) return console.error(err.message)
    message.channel.send('Se actualizo el nick a: '+nick).then(msg=>msg.delete({timeout: 1000}))
    client.channels.resolve('751121369931972638').send(`El usuario <@${miembro.id}> se actualizo su nick: **${nick}**`)
})
    }
}) 

}

/////////////////////////////////Bromas//////////////////////////////////////////////////////////////////////////////

if(command === 'broma'){ 

  if(!args[0]) return message.channel.send(`<@${message.author.id}> :x: | Comando desconocido, usa: `+'`'+prefix+'broma ayuda`')
  module.exports={
    'Discord':Discord,
    'client': client,
    'db':db,
    'message':message
  }
  let argumento0 = args[0].toLocaleLowerCase();
const funciones = require('./functions')

  if(argumento0==='ayuda'){
    const embed = new Discord.MessageEmbed()
      .setTitle('`'+prefix+'broma` AYUDA')
      .setDescription('Para utilizar el comando broma remplaza los [corchetes] ([]) por la información que deseas solicitar')
      .setAuthor(message.member.displayName, message.author.displayAvatarURL())
      .addField(prefix+'broma ingresar [valor] o .broma i [valor]', 'Ingresa tu valor de broma esto va de **0 a 4** coloca `.broma niveles` para ver los niveles de broma.')
      .addField(prefix+'broma consultar [@usuario]', 'Cosulta el valor de broma que tiene el usuario mencionado')
      .addField(prefix+'broma estado', 'Consulta tu estado de broma')
      .addField(prefix+'broma niveles', 'Consulta los niveles de Prank disponibles')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor('RANDOM')
message.member.send(`Has pedido ayuda del comando **.broma** por el canal <#${message.channel.id}>`, {embed})
message.channel.send(`<@${message.author.id}> Datos enviados por DM`)
  } else

  if(argumento0=== 'consultar'){
    let user = message.mentions.users.first();
    if(!user) return message.channel.send('<@'+message.author.id+'> :x: | Mennciona a alguin con `@nombre`')
    message.delete()

    funciones.consultas(user)

  }else

  if(argumento0 === 'estado'){  
    funciones.consultas(message.author)
  }else
  


if(argumento0 === 'ingresar'){
  funciones.ingresoDatos(message.member, args[1])
}else
if(argumento0 === 'i'){
  funciones.ingresoDatos(message.member, args[1])
}else

if(argumento0 ==='niveles'){
  let user = message.author
  let member = message.member;

  member.send(`Solicitud de Niveles, por el canal <#${message.channel.id}>`)
    const embed0 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK 0')
    .setDescription('PRANKS`DESACTIVADAS`.')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓN', '```md\n1. NO HACER NINGUNA PRANK A ESTE USUARIO, EL TAMPOCO PUEDE HACERTE NADA A TI.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    
    member.send(embed0);
  
    const embed1 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK `1`')
    .setColor(0x2ECC71)
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 1`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. LAS PRANKS DE NIVEL 1 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO DE **20 BLOQUES**.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed1);
  
  
    const embed2 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK `2`')
    .setColor(0xF1C40F)
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 2`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2.SI TIENES LAS BROMAS A UN NIVEL MENOR, SOLO PUEDES HACERLAS SEGúN TU NIVEL. \n3. LAS BROMAS DE NIVEL 2 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO **50 BLOQUES**.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n5. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed2);

    const embed3 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK `3`')
    .setColor(0xD35400 )
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 3`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. SI TIENES LAS BROMAS A UN NIVEL MENOR, SOLO PUEDES HACERLAS SEGÚN TU NIVEL.\n3. LAS PRANKS DE NIVEL 3 TE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO **100 BLOQUES**.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n5. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed3);

    const embed4 = new Discord.MessageEmbed()
    .setTitle('☠NIVEL DE PRANK `NIVEL 4`☠')
    .setColor(0xff0000)
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 4`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. TODOS TE PUEDEN HACER TODO TIPO DE PRANKS.\n2. SE PERMITE MOVER/QUITAR/COLOCAR UN NUMERO ILIMITADO DE BLOQUES.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed4);
message.channel.send(`<@${message.author.id}> Datos enviados por DM`)
}else

  if(argumento0 === 'cambiar'){
    let permisos = message.member.hasPermission('ADMINISTRATOR');
    if(!permisos) return;
    message.delete();
    
    let user = message.mentions.members.first();
if(!user)return message.channel.send(`:x: | Menciona a alguen`).then(msg=>msg.delete({timeout: 1000}))
    let nivel = args[2]; 
      if(isNaN(nivel))return message.channel.send(':x: | No has pusto en nievl').then(msg=>msg.delete({timeout: 1000}))
      nivel = parseInt(nivel);
//ejecuta la funcion
      funciones.ingresoDatos(user, nivel)

  }else
    message.channel.send( `<@${message.author.id}> :x: | Comando desconocido, usa: `+'`'+prefix+'broma ayuda`')
  
}
///////FIN DE BROMAS


if(command === 'mute'){
  let permisos = message.member.hasPermission("ADMINISTRATOR");
  if(!permisos) return message.channel.send(`Señor@ <@${message.author.id}> no puede Mutear`).then(msg=>msg.delete({timeout: 3000}))
    message.delete(); 
    let miembro = message.mentions.members.first();
    if(!miembro) return message.channel.send('Porfavor mencione a alguen').then(msg=> msg.delete({timeout: 1000}))
  let tiempo = parseInt(args[1])
    if(isNaN(tiempo)) return message.channel.send('Tiempo invalido').then(msg=>msg.delete({timeout: 1000}))

let razon = args.slice(2).join(' ') || 'No se especifica';

    miembro.roles.add('750542085257429002')
    miembro.roles.remove('749782923451826256')
    client.channels.resolve('750571555096100914').send(`${miembro} esta muteado por ${tiempo} segundos`)
  miembro.send(`Has sido muteado del servidor **${message.guild.name}** por un tiempo de **${tiempo}** segundos por la razon: ${razon}`)
  
    setTimeout(() =>{
      miembro.roles.remove('750542085257429002')
      miembro.roles.add('749782923451826256')
      client.channels.resolve('750571555096100914').send(`${miembro} ha sido revocado del mute`)
      miembro.send(`El MUTE ha sido revocado del servidor **${message.guild.name}**`)
   }, tiempo*1000)
}

if(command==='hablar'){
  let permisos = message.member.hasPermission('ADMINISTRATOR');
      if(!permisos)return
      message.delete()
  let persona = message.mentions.members.first();
      if(!persona)return

    let contenido = args.slice(1).join(' ');
        if(!contenido)return message.channel.send(':x: | NO HAY CONTEXTO.').then(msg=>{msg.delete({timeout: 1000})})

        persona.send(contenido)
        client.channels.resolve('750571555096100914').send(`**${message.author.username}** Envio mensaje a **${persona.user.username}**:\n${contenido}`)
}

if(command === 'clear'){
            let permisos = message.member.hasPermission('MANAGE_MESSAGES');
            if(!permisos) return message.channel.send('No puedes borrar eso').then(msg=>msg.delete({timeout: 3000}))
  
            if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
  
              return message.channel.send('No tengo el permiso de \`Gestionar los mensajes\` para ejecutar esta funciÃ³n')
          }
  
            if(!args[0]) {
  
              return message.channel.send('Introduce una cantidad de mensajes a eliminar, debe ser menor a **100**')
          }
  
            let number = args[0]
            if(isNaN(number)) {
  
              return message.channel.send('Necesitas ingresar numeros, no letras o sÃ­mbolos')
          }
  
            number = parseInt(number)
            if(number >= 100 || number <= 0) {
  
              return message.channel.send('El valor es **invÃ¡lido**')
          }
  
            message.channel.bulkDelete(number + 1 ).then( () => {
  
              return message.channel.send(`Se eliminÃ³ ${number} **mensajes**`).then(msg => msg.delete({timeout: 5000}));
  
          }).catch(error => {
  
            message.channel.send(`Ocurrio un **error:** ${error.message}`)
          })
            
        }
let mes_pago = 'Enero' 
if(command === 'addpagos'){
  let permiso = message.member.hasPermission('ADMINISTRATOR');
  if(!permiso) return;
  message.delete();
  
    let monto = args[1] || 20;

     if(isNaN(monto)) return message.channel.send(':x:| Coloque un numero.').then(msg=>msg.delete({timeout: 1000}))
monto = parseInt(monto);
     //let allMembers = ['334809973844606977', '549307481843826700']

     for (let i = 0; i < allMembers.length; i++) {
       const id = allMembers[i];

      const embed = new Discord.MessageEmbed()
          .setTitle(':warning: ALERTA DE COBRO :warning:')
          .addField('Pago del mes de DICIEMBRE.', `El pago de este Mes es de **$${monto}.00MXN**. \nEl vencimiento de la membrecía es el día **25 de ${mes_pago}**. \nFavor de pagar cuanto antes. \nSi el pago no se hace dentro de los 10 días siguientes, quedara inhabilitado del servidor.`)
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setAuthor(message.guild.name , message.guild.iconURL())
          .setTimestamp()
          .setColor('YELLOW')

          
       message.guild.members.fetch(id).then(user => {
        user.send(embed2);
      }).catch(()=>{});

        client.channels.resolve('921448852161191987').send(`<@${id}> Se añadio dinero: **$${monto}.00MXN**`)

       let select = `SELECT * FROM pagos WHERE idusuario = ${id}`
        db.get(select, (err, filas)=>{
          if(err) return console.error(err.message)

        
          if(!filas){
           
            let consultar = `INSERT INTO pagos(idusuario, monto) VALUES(${id}, ${monto})`;
             db.run(consultar, function(err) {
               if (err) return console.error(err.message)
               
           })

          } else {
            let poner = `UPDATE pagos SET monto = ${parseInt(filas.monto) +monto} WHERE idusuario = ${id}`
              db.run(poner, function(err){
                if(err)return console.error(err.message)
              })
          }

        })

     
    }

}


if(command==='pagado'){
 let p = message.member.hasPermission('ADMINISTRATOR');
 if(!p)return
message.delete();
 let user = message.mentions.members.first();
let id = user.id;
let cantidad = args[1]
  if(isNaN(cantidad))return message.channel.send(':x: | No valido.').then(msg=>msg.delete({timeout: 1000}));
  let monto = parseInt(cantidad);

 let select = `SELECT * FROM pagos WHERE idusuario = ${id}`
 db.get(select, (err, filas)=>{
   if(err) return console.error(err.message)
 if(filas.monto <= 0) message.channel.send(`YA ESTA PAGADO: **${parseInt(filas.monto)-cantidad}**'`).then(msg=>msg.delete({timeout: 1000}));
   if(!filas){
    
     message.channel.send('NO HAY NADA ??, Agregalo tu de forma individual').then(msg=>(msg.delete({timeout: 5000})))

   } else {
     let poner = `UPDATE pagos SET monto = ${parseInt(filas.monto) - monto} WHERE idusuario = ${id}`
       db.run(poner, function(err){
         if(err)return console.error(err.message)

         let select = `SELECT * FROM pagos WHERE idusuario = ${id}`
            db.get(select, (err, filas)=>{
              if(err) return console.error(err.message);

              const embed = new Discord.MessageEmbed()
              .setTitle('<:Minecraftemerald:921541527254233109> PAGADO <:Minecraftemerald:921541527254233109>')
              .setDescription('El pago ha sido recibido correctamente.')
              .setAuthor(user.displayName, user.user.displayAvatarURL())
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .addField('ABONO:', `$${cantidad}.00MXN`)
              .addField('SU ADEUDO ES DE:', `$${filas.monto}.00MXN`, true)
              .addField('PROXIMO PAGO:', `25 de ${mes_pago} de 2021`, true)
              .setTimestamp()
              .setColor('GREEN')

              user.send(`<@${user.id}>`, { embed });
              client.channels.resolve('921448852161191987').send(`<@${user.id}> Pago:**$${cantidad}.00MXN**, y Debe: **$${filas.monto}.00MXN**`);
            });
       })
   }

 })
  

}

if(command==='deuda'){
let permiso = message.member.hasPermission('ADMINISTRATOR');
  if(!permiso){

    let select = `SELECT * FROM pagos WHERE idusuario = ${message.author.id}`
            db.get(select, (err, filas)=>{
              if(err) return console.error(err.message);
              if(!filas)return message.channel.send(`<@${message.author.id}> :x: | Al parecer no esta registrado, busca un Admin.`)
              const embed =new Discord.MessageEmbed()
              embed.setAuthor(message.author.username, message.member.user.displayAvatarURL())
              embed.setFooter(message.guild.name, message.guild.iconURL())
              embed.setTimestamp()
              if(filas.monto <= 0) {
                embed.setTitle('Todo esta en Orden')
                embed.setColor('GREEN')
                embed.setDescription('Felicidades has pagado todo lo que corresponde al mes.')
                  if(filas.monto < 0) embed.addField('Tu saldo a favor es de:', `$${parseInt(filas.monto)*-1}.00MXN` ,true) //Se multiplica por -1 para pasarla a Positvo
                }else{
                  embed.setTitle('NESECITAS PAGAR')
                  embed.setColor('RED')
                  embed.setDescription('Te recomendamos pagar en cuanto antes, para no perder el Acceso.')
                  embed.addField('Tu deuda:', `$${filas.monto}.00MXN`)
                  
                }
                embed.addField('El siguente pago:', `25 de ${mes_pago} de 2021`,true)
                message.member.send(`Has pedido esto por <#${message.channel.id}>`, embed)
                message.channel.send(`<@${message.author.id}> :white_check_mark: | Datos enviados por DM`)
              })
  }

  let lista = `SELECT idusuario, monto FROM pagos ORDER BY monto DESC`

  db.all(lista,  (err, todo)=>{
    if(err)return console.error(err.message);

    let datos = [];

    todo.map(x => {
      
      message.guild.members.fetch(x.idusuario).then(user =>{ 

        datos.push(`__${user.displayName}__, Deuda: **$${x.monto}.00MXN**`)
       
        if(datos.length != allMembers.length) return;
        
    const embed = new Discord.MessageEmbed()
        embed.setTitle('Lista completa de Deudas.')
        embed.setDescription(datos.join('\n'))
        embed.setTimestamp()
        embed.setColor('RANDOM')
        embed.setAuthor(client.user.username, client.user.displayAvatarURL())
        embed.setFooter(message.guild.name , message.guild.iconURL())
    
        message.channel.send(embed);
      })
      
      
    });
    
  })

}

if(command === 'agregarpago'){

  let permiso = message.member.hasPermission('ADMINISTRATOR');
  if(!permiso)return;
     message.delete();
  let user = message.mentions.members.first();
 let id = user.id;
 let cantidad = args[1];
   if(isNaN(cantidad))return message.channel.send(':x: | No valido.').then(msg=>msg.delete({timeout: 1000}));
   let monto = parseInt(cantidad);

   let select = `SELECT * FROM pagos WHERE idusuario = ${id}`
   db.get(select, (err, filas)=>{
     if(err) return console.error(err.message)
     if(!filas){

      let insertar = `INSERT INTO pagos(idusuario, monto) VALUES(${id}, ${monto})`;
      db.run(insertar, function(err) {
        if (err) return console.error(err.message)

        if(monto <= 0) return  client.channels.resolve('921448852161191987').send(`<@${id}> Se quito: **$${monto}.00MXN**`)
        client.channels.resolve('921448852161191987').send(`<@${id}> Se agrego: **$${monto}.00MXN**`)
    })
     }else{ 
      let poner = `UPDATE pagos SET monto = ${parseInt(filas.monto) + monto} WHERE idusuario = ${id}`
      db.run(poner, function(err){
        if(err)return console.error(err.message);

        if(monto <= 0) return  client.channels.resolve('921448852161191987').send(`<@${id}> Se quito: **$${monto}.00MXN**`)
        client.channels.resolve('921448852161191987').send(`<@${id}> Se agrego: **$${monto}.00MXN**`)
      });
     }  
     
     })
    
}

if(command==='saycanal'){
  let p = message.member.hasPermission('ADMINISTRATOR')
  if(!p)return;
  message.delete()
  let texto = args.slice(1).join(" ");
  if(!texto)return;
  client.channels.resolve(`${args[0]}`).send(texto);

}
});


client.on("guildMemberAdd", (member) =>{

  client.channels.resolve('750443539363790936').send(`EL DIA DE HOY **${member.user}** HA LLEGADO`)
});

client.on("messageDelete", (message)=>{

  if(message.author.id == message.guild.ownerID) return;
  if(message.author.bot) return;
  if(message.content.startsWith(prefix))return;

   const embed = new Discord.MessageEmbed()
   .setTitle('🗑️ Mensaje Borrado 🗑️')
   .setColor('RED')
    .addField('Usuario  |  Canal', '<@'+message.author.id+'> | <#'+message.channel.id+'>')
    .addField('Mensaje Borrado', message.content)
    .setTimestamp()
    .setFooter('Mensaje Borrado 🗑️')
    client.channels.resolve('750578394370015243').send(embed);
});
///////////////MENSJES/EDITADOS//////////////////////////////

client.on("messageUpdate", messageUptate =>{
    if(messageUptate.author.bot) return;
    if(messageUptate.guild.ownerID == messageUptate.author.id) return console.log(`Owner edito *DE*: ${messageUptate.content} *A*: ${messageUptate.reactions.message.content}`)
    //if (messageUptate)
    const embed = new Discord.MessageEmbed()
    .setTitle('📝 Mensaje editado 📝')
    .setColor('BLUE')
    .setAuthor(client.user.username)
    .addField('Usuario  |  Canal', '<@'+messageUptate.author.id+'> | <#'+messageUptate.channel.id+'>')
    .addField('De', messageUptate.content)
    .addField('A', messageUptate.reactions.message.content)
    .setTimestamp(Date.now())
    .setFooter('Mensaje editatado 📝')
    client.channels.resolve('750578394370015243').send(embed);

});

client.login(process.env.token)
