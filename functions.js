
let index = require('./index')
const Discord = index.Discord;
const client = index.client;

const db = index.db
const message = index.message;

    function consultas(user){

        let SQLSelect = `SELECT * FROM broma WHERE idusuario = ${user.id}`;
    
        db.get(SQLSelect, (err, filas) => {
          if (err) return console.error(err.message)
           if (!filas) return message.channel.send('El usuario consultado no tine registro')
    
            let nivel = filas.nivel;
    
          if(nivel == 0){
            const embed = new Discord.MessageEmbed()
            .setTitle('NIVEL DE PRANK ⓪')
            .setDescription('LAS PRANKS SE ENCUENTRAN `DESACTIVADAS` PARA ESTE USUARIO.')
            .setAuthor(user.username, user.displayAvatarURL())
            .addField('RECOMENDACIÓN', '```md\n1. NO HACER NINGUNA PRANK A ESTE USUARIO, EL TAMPOCO PUEDE HACERTE NADA A TI.\n```')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            
            
            message.channel.send(embed);
    
          }
          if(nivel == 1){
            const embed = new Discord.MessageEmbed()
            .setTitle('NIVEL DE PRANK ①')
            .setColor(0x2ECC71)
            .setDescription('LAS PRANKS ESTAN ACTIVADAS AL NIVEL ①')
            .setAuthor(user.username, user.displayAvatarURL())
            .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. LAS PRANKS DE NIVEL 1 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO DE *20 BLOQUES*.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            
            message.channel.send(embed);
          }
          if(nivel == 2){
            const embed = new Discord.MessageEmbed()
            .setTitle('NIVEL DE PRANK ②')
            .setColor(0xF1C40F)
            .setDescription('LAS PRANKS ESTAN ACTIVADAS AL NIVEL ②')
            .setAuthor(user.username, user.displayAvatarURL())
            .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2.SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGúN TU NIVEL. \n3. LAS PRANKS DE NIVEL 2 SOLO SE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *40 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n5. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            
            message.channel.send(embed);
          }
          if(nivel == 3){
            const embed = new Discord.MessageEmbed()
            .setTitle('NIVEL DE PRANK ③')
            .setColor(0xD35400 )
            .setDescription('LAS PRANKS ESTAN ACTIVADAS AL NIVEL ③')
            .setAuthor(user.username, user.displayAvatarURL())
            .addField('RECOMENDACIÓNES', '```md\n1. SOLO SE PUEDE HACER UNA BROMA SI TIENES ACTIVADO LAS BROMAS.\n2. SI TIENES LAS BROMAS A UN NIVEL MENOR SOLO PUEDES HACERLAS SEGÚN TU NIVEL.\n3. LAS PRANKS DE NIVEL 3 TE PERMITEN MOVER, COLOCAR, QUITAR UN MAXIMO *70 BLOQUES*.\n4. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. RECUERDA QUE NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            
            message.channel.send(embed);
          }
          if(nivel == 4){
           
            const embed = new Discord.MessageEmbed()
            .setTitle('☠NIVEL DE PRANK NIVEL ④ ☠')
            .setColor(0xFF0000)
            .setDescription('LAS PRANKS ESTAN ACTIVADAS AL NIVEL ④')
            .setAuthor(user.username, user.displayAvatarURL())
            .addField('RECOMENDACIÓNES', '```md\n1. TODOS TE PUEDEN HACER TODO TIPO DE PRANKS.\n2. SE PERMITE MOVER/QUITAR/COLOCAR UN NUMERO ILIMITADO DE BLOQUES.\n3. TIENES QUE LIMPIAR OBLIGATORIAMENTE EL 50% DE LA PRANK.\n4. NO SE PERMITE ROBAR ITEMS NI BLOQUES.\n```')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            
            message.channel.send(embed);
          }
    })
        }

        function ingresoDatos (user, nivel) {

            let id = user.id;
              let consulta = `SELECT * FROM nick WHERE idusuario = ${id}`;
              db.get(consulta, (err, datos)=>{
                if(err)return console.error(err.message)
                if(!datos) return message.channel.send(':x: | <@'+id+'> NO TIENES NICK REGISTRADO VE A <#751103129055002625> Y REGISTRATE')
              
              nivel = parseInt(nivel);
            
            let a =  `<@${id}> :x: | Solo se pueden ingresar numero del **0** a **4**`;
            if(isNaN(nivel)) return message.channel.send(a)
            if(nivel >= 5) return message.channel.send(a)
            if(nivel < 0)return message.channel.send(a)
            
            
            let roles = require('./roles.json');
            
            function numeros(){
              let level
              if(nivel == 0)level = roles.desactivado
              if(nivel == 1)level = roles.prank1
              if(nivel == 2)level = roles.prank2
              if(nivel == 3)level = roles.prank3
              if(nivel == 4)level = roles.prank4
              return level
            }
            
            
            function niveles() {
              let nombre = datos.name;
              let level
              if(nivel == 0)level = '⓪'
              if(nivel == 1)level = '①'
              if(nivel == 2)level = '②'
              if(nivel == 3)level = '③'
              if(nivel == 4)level = '④'
              
              if(id == message.guild.ownerID) return 
              
              user.setNickname(`${nombre} ${level}`).catch(console.error)
            }
            
            
            function addRol(){
                let r1 = user.roles.cache.find(r => r.id === roles.prank1)
                  if(r1)user.roles.remove(r1.id)
                let r2 = user.roles.cache.find(r => r.id === roles.prank2)
                  if(r2)user.roles.remove(r2.id)
                let r3 = user.roles.cache.find(r => r.id === roles.prank3)
                  if(r3)user.roles.remove(r3.id)
                let r4 = user.roles.cache.find(r => r.id === roles.prank4)
                  if(r4)user.roles.remove(r4.id)
            
                  let add
              if(nivel == 0) return;
              if(nivel == 1) add = roles.prank1;
              if(nivel == 2) add = roles.prank2;
              if(nivel == 3) add = roles.prank3;
              if(nivel == 4) add = roles.prank4;
            
            
                user.roles.add(add);
            }
            
              let SQLSelect = `SELECT * FROM broma WHERE idusuario = ${id}`;
            
                db.get(SQLSelect, (err, filas) => {
                  if (err) return console.error(err.message)
                   if (!filas){
                    let SQLInsert = `INSERT INTO broma(idusuario, nivel) VALUES(${id}, ${nivel})`;
                  
                  db.run(SQLInsert, function(err) {
                      if (err) return console.error(err.message)
                      message.channel.send(`<@${id}> :white_check_mark: | Se a añadido tu nivel a <@&${numeros()}>`)
                      niveles()
                      addRol()
                      consultas(user.user)
                  })
            
                   }
                   else{
                
                    let SQLUpdate = `UPDATE broma SET nivel = ${nivel} WHERE idusuario = ${id}`;
            
                    db.run(SQLUpdate, function(err) {
                        if (err) return console.error(err.message)
                        message.channel.send(`<@${id}> :white_check_mark: | Se actualizo tu nivel a <@&${numeros()}>`)
                        niveles()
                        addRol()
                        consultas(user.user)
                    })
            
                   }
            
            })
            
            })
            }



module.exports={
    "consultas": consultas,
    "ingresoDatos":ingresoDatos
}
