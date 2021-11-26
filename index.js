
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
            name: 'Survival Mexico',
            type: "PLAYING"
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

client.on("message", (message)=>{
if(message.channel.type=='dm') return;
//Comands
if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if(command === 'ping'){
  let ping = Math.floor(message.client.ws.ping);
   message.channel.send(':ping_pong: `'+ping+' ms.` desde Consola.'); 
}
if(command === 'evento'){
  message.delete();
  let permiso = message.member.hasPermission('MANAGE_MESSAGES');
  if(!permiso) return message.reply('No, no, no...').then(msg=>msg.delete({timeout: 1000}))
  const imagen = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/750520873039036487/904855620996435988/Evento_Minecraft_SPM.png')
 message.channel.send(imagen);
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
    let nick = args.join(' ')
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
  if(!args[0]) return message.channel.send('**'+message.author.username+'** usa `'+prefix+'broma ayuda`')
  
  let argumento0 = args[0].toLocaleLowerCase();

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
message.member.send(`Has pedido ayuda del comando **.broma** por el canal <#${message.channel.id}>`)
message.member.send(embed)
message.channel.send(`<@${message.author.id}> Datos enviados por DM`)
  }



  function consultas(user){

    let SQLSelect = `SELECT * FROM broma WHERE idusuario = ${user.id}`;

    db.get(SQLSelect, (err, filas) => {
      if (err) return console.error(err.message)
       if (!filas) return message.channel.send('El usuario consultado no tine registro')

        let nivel = filas.nivel;

      if(nivel == 0){
        const embed = new Discord.MessageEmbed()
        .setTitle('NIVEL DE PRANK 0')
        .setDescription('LAS PRANKS SE ENCUENTRAN `DESACTIVADAS` PARA ESTE USUARIO.')
        .setAuthor(user.username, user.displayAvatarURL())
        .addField('RECOMENDACIÓN', '```md\n1. NO HACER NINGUNA PRANK A ESTE USUARIO, EL TAMPOCO PUEDE HACERTE NADA A TI.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        
        
        message.channel.send(embed);

      }
      if(nivel == 1){
        const embed = new Discord.MessageEmbed()
        .setTitle('NIVEL DE PRANK `1`')
        .setColor(0x2ECC71)
        .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 1`')
        .setAuthor(user.username, user.displayAvatarURL())
        .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. LAS PRANKS DE NIVEL 1 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO DE *20 BLOQUES*.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed);
      }
      if(nivel == 2){
        const embed = new Discord.MessageEmbed()
        .setTitle('NIVEL DE PRANK `2`')
        .setColor(0xF1C40F)
        .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 2`')
        .setAuthor(user.username, user.displayAvatarURL())
        .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2.SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGúN TU NIVEL. \n3. LAS PRANKS DE NIVEL 2 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *40 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n5. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed);
      }
      if(nivel == 3){
        const embed = new Discord.MessageEmbed()
        .setTitle('NIVEL DE PRANK `3`')
        .setColor(0xD35400 )
        .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 3`')
        .setAuthor(user.username, user.displayAvatarURL())
        .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGÚN TU NIVEL.\n3. LAS PRANKS DE NIVEL 3 TE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *70 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed);
      }
      if(nivel == 4){
        message.channel.send('YA CASI ESTA LISTO')
        if(0===1) return;

        const embed = new Discord.MessageEmbed()
        .setTitle('NIVEL DE PRANK `4`')
        .setColor(0xFF0000)
        .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 4`')
        .setAuthor(user.username, user.displayAvatarURL())
        .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGÚN TU NIVEL.\n3. LAS PRANKS DE NIVEL 4 TE PERMITEN MOVER, COLOCAR, QUITAR BLOQUES SIN NINGUN LIMITE*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed);
      }
})
  }
  if(argumento0=== 'consultar') {
    message.delete()
    let user = message.mentions.users.first();
    if(!user) return message.channel.send('Mennciona a alguin con `@nombre`')

    consultas(user)

  }
  if(argumento0=== 'estado') consultas(message.author)


function ingresoDatos () {
  let consulta = `SELECT * FROM nick WHERE idusuario = ${message.author.id}`;
  db.get(consulta, (err, datos)=>{
    if(err)return console.error(err.message)
    if(!datos) return message.channel.send('<@'+message.author.id+'> NO TIENES NICK REGISTRADO VE A <#751103129055002625> Y REGISTRATE')
  
  let nivel = parseInt(args[1])
let a =  'Solo se pueden ingresar numero del **0** a **4**';
if(isNaN(nivel)) return message.channel.send(a)
if(nivel >= 5) return message.channel.send(a)
if(nivel < 0)return message.channel.send(a)
///4 desactivadp
if(nivel == 4) return message.channel.send(`**${message.member.displayName}** EL NIVEL 4 ESTA EN MANTENIMIENTO DISCULPA LAS MOLESTIAS`)

function numeros(){
  let level
  if(nivel == 0)level = ' '
  if(nivel == 1)level = '①'
  if(nivel == 2)level = '②'
  if(nivel == 3)level = '③'
  if(nivel == 4)level = '⓸'
  return level
}


function niveles() {
  let nombre = datos.name;
  let level
  if(nivel == 0)level = ' '
  if(nivel == 1)level = '①'
  if(nivel == 2)level = '②'
  if(nivel == 3)level = '③'
  if(nivel == 4)level = '⓸'
  
  if(message.author.id == message.guild.ownerID) return 
  
  message.member.setNickname(`${nombre} ${level}`).catch(console.error)
}
let roles = require('./roles.json');

function addRol(){
    let r1 = message.member.roles.cache.find(r => r.id === roles.prank1)
      if(r1)message.member.roles.remove(r1.id)
    let r2 = message.member.roles.cache.find(r => r.id === roles.prank2)
      if(r2)message.member.roles.remove(r2.id)
    let r3 = message.member.roles.cache.find(r => r.id === roles.prank3)
      if(r3)message.member.roles.remove(r3.id)
    let r4 = message.member.roles.cache.find(r => r.id === roles.prank4)
      if(r4)message.member.roles.remove(r4.id)

      let add
  if(nivel == 0) return;
  if(nivel == 1) add = roles.prank1;
  if(nivel == 2) add = roles.prank2;
  if(nivel == 3) add = roles.prank3;
  if(nivel == 4) add = roles.prank4;


    message.member.roles.add(add);
}

  let SQLSelect = `SELECT * FROM broma WHERE idusuario = ${message.author.id}`;

    db.get(SQLSelect, (err, filas) => {
      if (err) return console.error(err.message)
       if (!filas){
        let SQLInsert = `INSERT INTO broma(idusuario, nivel) VALUES(${message.author.id}, ${nivel})`;
      
      db.run(SQLInsert, function(err) {
          if (err) return console.error(err.message)
          message.channel.send(`Se a añadido tu nivel de Prank a nivel ${numeros()}`)
          niveles()
          addRol()
      })

       }
       else{
    
        let SQLUpdate = `UPDATE broma SET nivel = ${nivel} WHERE idusuario = ${message.author.id}`;

        db.run(SQLUpdate, function(err) {
            if (err) return console.error(err.message)
            message.channel.send(`Se actualizo tu nivel de Pranks a ${numeros()}`)
            niveles()
            addRol()
        })

       }

})

})
}


if(argumento0 === 'ingresar'){
  ingresoDatos()
}
if(argumento0 === 'i'){
  ingresoDatos()
}

if(argumento0 ==='niveles'){
  let user = message.author
  let member = message.member;

  member.send(`Solicitud de Niveles, por el canal <#${message.channel.id}>`)
    const embed0 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK 0')
    .setDescription('LAS PRANKS SE ENCUENTRAN `DESACTIVADAS` PARA ESTE USUARIO.')
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
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. LAS PRANKS DE NIVEL 1 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO DE *20 BLOQUES*.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed1);
  
  
    const embed2 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK `2`')
    .setColor(0xF1C40F)
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 2`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2.SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGúN TU NIVEL. \n3. LAS PRANKS DE NIVEL 2 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *40 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n5. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
        .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed2);

    const embed3 = new Discord.MessageEmbed()
    .setTitle('NIVEL DE PRANK `3`')
    .setColor(0xD35400 )
    .setDescription('LAS PRANKS ESTAN ACTIVADAS AL `NIVEL 3`')
    .setAuthor(user.username, user.displayAvatarURL())
    .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGÚN TU NIVEL.\n3. LAS PRANKS DE NIVEL 3 TE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *70 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    
    member.send(embed3);
  member.send('Nivel 4 DESACTIVADO TEMPORALMENTE')
message.channel.send(`<@${message.author.id}> Datos enviados por DM`)
}
}


if(command === 'mute'){
  let permisos = message.member.hasPermission("ADMINISTRATOR");
    if(!permisos) return message.channel.send(`Señor@ <@${message.author.id}> no puede Mutear`).then(msg=>msg.delete({timeout: 3000}))
    let miembro = message.mentions.members.first();
    if(!miembro) return message.channel.send('Porfavor mencione a alguen').then(msg=> msg.delete({timeout: 3000}))
  let tiempo = parseInt(args[1])
    if(isNaN(tiempo)) return message.channel.send('Tiempo invalido').then(msg=>msg.delete({timeout: 3000}))

let razon = args.slice(2).join(' ') || 'No se especifica';
message.delete()
    miembro.roles.add('750542085257429002')
    miembro.roles.remove('749782923451826256')
    client.channels.resolve('750571555096100914').send(`${miembro} esta muteado por ${tiempo/1000} segundos`)
  miembro.send(`Has sido muteado del servidor **${message.guild.name}** por un tiempo de **${tiempo/1000}** segundos por la razon: ${razon}`)
  setTimeout(() =>{
    miembro.roles.remove('750542085257429002')
    miembro.roles.add('749782923451826256')
    client.channels.resolve('750571555096100914').send(`${miembro} ha sido revocado del mute`)
    miembro.send(`El MUTE ha sido revocado del servidor **${message.guild.name}**`)
   }, tiempo)
}

if(command==='hablar'){
  let permisos = message.member.hasPermission('ADMINISTRATOR');
      if(!permisos)return
      message.delete()
  let persona = message.mentions.members.first();
      if(!persona)return

    let contenido = args.slice(1).join(' ');
        if(!contenido)return message.channel.send('NO HAY CONTEXTO.').then(msg=>{msg.delete({timeout: 1000})})

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
});

client.on("guildMemberAdd", member =>{

  client.channels.resolve('750443539363790936').send(`EL DIA DE HOY **${member}** HA LLEGADO`)
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
