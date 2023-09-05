const { Client, GatewayIntentBits, IntentsBitField, Attachment, Collection} = require('discord.js');
const {Configuration, OpenAIApi} = require('openai')
//const { REST, Routes } = require('@discordjs/rest')
//const { Player } = require('discord-player')

//const fs = require('node:fs')
//const path = require('node:path')

var today = new Date()

const client = new Client({
    intents: [
       IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    
});


//'940824689444524063' SERVER ID
// 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 AI API KEY



client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`);
});

//DAILY MESSAGE CLOCK
// client.on('dailyMessage', async (c) => {
// var daycount = 1
// var nightcount = 0
// if(today.getHours() > 3 && today.getHours() < 10 && daycount == 0){

//   await client.channels.cache.get('940824690023333970').send(`Bueno Dia Coño`);
//   daycount++
//   nightcount--
// } 
// else if(today.getHours() > 11 && nightcount == 0 || today.getHours() < 4 && nightcount == 0){

//   await client.channels.cache.get('940824690023333970').send(`Bueno Noche Coño`);
//   nightcount++
//   daycount--
// }
// })





const configuration = new Configuration({
  apiKey: '',
})

const openai = new OpenAIApi(configuration)

//Original Chatbot Code
/*client.on('messageCreate', async (message) => {
  //if (message.author.bot) return;

  //if (message.content.startsWith('!')){

      let conversationsLog = [{role: 'system', content: "Eres un chatbot amigable"}];

      conversationsLog.push({
        role: 'user',
        content: message.content
      })

      await message.channel.sendTyping();

      const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationsLog
      });

      message.reply(result.data.choices[0].message);    
  //}
})*/

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!')){
  let conversationLog = [
    { role: 'system', content: 'You are a helpful, smart bot' },
  ];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {
      if (!msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push(

          {role: 'assistant',
          content: msg.content,
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
            },
            
          {role: 'system', 
          content: 'You are helpful, smart bot'
          });
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        // max_tokens: 256, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });

      if(result.data.choices[0].message.content.length > 2000){

        console.log('1000')

        let lhalf = result.data.choices.message.content.substring(0,(result.data.choices[0].message.content.length / 2))
        let rhalf = result.data.choices.message.content.substring((result.data.choices[0].message.content.length / 2), result.data.choices[0].message.content.length)

        console.log('2000')

        try{

          message.reply(lhalf)

          await message.channel.sendTyping();

          message.reply(rhalf)

        } catch (e) {
          console.log(`ERR: ${error}`);
        }
      }

    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
  }
  else return;
});

//WELCOME MSG
client.on("guildMemberAdd", (member) => {
  member.send(`Welcome to the server, ${member.user.username}!`);
  client.channels.cache.get('940824690023333970').send(`${member.user.username} se ha unido al clan! 🙏😎`);
});

//CHAT EASTER EGGS
client.on('messageCreate', async (message) => { 

  if(message.content.toLowerCase().includes('neldo')){
    if(!message.author.bot === true){
      message.reply('quien e Neldo?');
    }
    
  }
  if (message.content.toLowerCase().includes('btb btb') || message.content.toLowerCase().includes('bryan bryan') || message.content.toLowerCase().includes('brayan brayan') || message.content.toLowerCase().includes('braian braian') || message.content.toLowerCase().includes('braga braga')) {
    if (message.author.id !== '362671215162163200' && message.author.id !== '364495904981385216') {
      message.reply('Estaasss aaahiiii...???!!!! 🤔😳😨😧');
      try{
      //var bSmokeID = await client.users.fetch('364495904981385216');
      //let bPatrID = await client.users.fetch('362671215162163200');
      //let QMID = await client.users.fetch('347805201127833600');

      //bSmokeID.send(`${message.author.username}: ${message.content}`);
      //bSmokeID.send('Estaasss aaahiiii...???!!!! 🤔😳😨😧');

      //bPatrID.send(`${message.author.username}: ${message.content}`);
      //bPatrID.send('Estaasss aaahiiii...???!!!! 🤔😳😨😧');
      }
      catch(e){
        console.log("Error: " + e);
      }
    } 
    else{
    message.reply('👺🤑https://www.youtube.com/results?search_query=TheBtbGamerYT👺🤑');
    }
  }
  if (message.content.toLowerCase().includes('mariota')) {
  if(!message.author.bot === true){
  if (message.author.id !== '710910533586518057' && message.author.id !== '924854448776421427') {      
      message.reply('🔪⚡💥ASEEESSINAAAAA🔪⚡💥');

      var Mario1ID = await client.users.fetch('710910533586518057');
      var Mario2ID = await client.users.fetch('924854448776421427');
      //let QMID = await client.users.fetch('347805201127833600');

      Mario1ID.send(`${message.author.username}: ${message.content}`);
      Mario1ID.send('🔪⚡💥ASEEESSINAAAAA🔪⚡💥');

      Mario2ID.send(`${message.author.username}: ${message.content}`);
      Mario2ID.send('🔪⚡💥ASEEESSINAAAAA🔪⚡💥');
    } 
    else{
    message.reply('👺🤑https://www.youtube.com/watch?v=6H1-poNPQ4Q👺🤑');
}}}

  if(message.content.toLowerCase().includes('nacho churchill con 27') ||message.content.toLowerCase().includes('nacho 27 con churchill') ||message.content.toLowerCase().includes('churchill con 27') ||message.content.toLowerCase().includes('27 con churchill')) {
    message.reply('Piinturraaa copay');
  }
  if(message.content.toLowerCase().includes('don joaquin') || message.content.toLowerCase().includes('joaquin') || message.content.toLowerCase().includes('joaqin') || message.content.toLowerCase().includes('joakin')){
    message.reply('CALLESE LA BOCA');
  }
  if(message.content.toLowerCase().includes('los freseros') ||message.content.toLowerCase().includes('ciintron') ||message.content.toLowerCase().includes('cintron') ||message.content.toLowerCase().includes('marquito')) {
    message.reply('PRESO');
  }
  if(message.content.toLowerCase().includes('fliky') || message.content.toLowerCase().includes('flicky') || message.content.toLowerCase().includes('fliki') || message.content.toLowerCase().includes('flyki') || message.content.toLowerCase().includes('flyky') || message.content.toLowerCase().includes('flycky') || message.content.toLowerCase().includes('flycki') || message.content.toLowerCase().includes('chiki') || message.content.toLowerCase().includes('chiqui') || message.content.toLowerCase().includes('chiqi')|| message.content.toLowerCase().includes('flicki')){
    if(message.author.id !== '592832289755496465'){      
      message.reply('⚗🔬💸⚔ THE COOK ⚗🔬💸⚔'); 

      //var flickyID = await client.users.fetch('592832289755496465');
      //let QMID = await client.users.fetch('347805201127833600');
      //flickyID.send(`${message.author.username}: ${message.content}`);
      //flickyID.send('⚗🔬💸⚔ THE COOK ⚗🔬💸⚔');
      
    } else {

      const script1 = `My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead, murdered by my brother-in-law Hank Schrader. Hank has been building a meth empire for over a year now and using me as his chemist. Shortly after my 50th birthday, Hank came to me with a rather, shocking proposition. He asked that I use my chemistry knowledge to cook methamphetamine, which he would then sell using his connections in the drug world. Connections that he made through his career with the DEA. I was... astounded, I... I always thought that Hank was a very moral man and I was... thrown, confused, but I was also particularly vulnerable at the time, something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me on a ride along, and showed me just how much money even a small meth operation could make. And I was weak. I didn't want my family to go into financial ruin so I agreed. Every day, I think back at that moment with regret. I quickly realized that I was in way over my head, and Hank had a partner, a man named Gustavo Fring, a businessman. Hank essentially sold me into servitude to this man, and when I tried to quit, Fring threatened my family. I didn't know where to turn. `
      const script2 = `Eventually, Hank and Fring had a falling out. From what I can gather, Hank was always pushing for a greater share of the business, to which Fring flatly refused to give him, and things escalated. Fring was able to arrange, uh I guess I guess you call it a "hit" on my brother-in-law, and failed, but Hank was seriously injured, and I wound up paying his medical bills which amounted to a little over $177,000. Upon recovery, Hank was bent on revenge, working with a man named Hector Salamanca, he plotted to kill Fring, and did so. In fact, the bomb that he used was built by me, and he gave me no option in it. I have often contemplated suicide, but I'm a coward. I wanted to go to the police, but I was frightened. Hank had risen in the ranks to become the head of the Albuquerque DEA, and about that time, to keep me in line, he took my children from me. For 3 months he kept them. My wife, who up until that point, had no idea of my criminal activities, was horrified to learn what I had done, why Hank had taken our children. We were scared. I was in Hell, I hated myself for what I had brought upon my family. Recently, I tried once again to quit, to end this nightmare, and in response, he gave me this. I can't take this anymore. I live in fear every day that Hank will kill me, or worse, hurt my family. I... All I could think to do was to make this video in hope that the world will finally see this man, for what he really is.`
      message.reply(script1)
      message.reply(script2)
    }
  }
  if(message.content.toLowerCase().includes('pepelancha') || message.content.toLowerCase().includes('pepe lancha')){
    message.reply('A LA DIRECCION RAPIDO')
  }
}
)


client.login('MTExOTAxNDE0ODM4NzM4OTU0MA.GLx9MY.G7kJUiHSOM5cIW2BE8MlIm6ymJRWJrv1Olx5Xk');


