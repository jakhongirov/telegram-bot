require('dotenv').config()
const path = require('path')
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.BOT_TOKEN, {
   polling: true
})

bot.onText(/\/start/, msg => {
   const chatId = msg.chat.id
   const username = msg.from.first_name
   // const AboutMe = 

   bot.sendMessage(chatId, `Hello ${username}!`, {
      reply_markup: JSON.stringify({
         keyboard: [
            [
               {
                  text: "About me"
               },
               {
                  text: "Rezume"
               }
            ],
            [
               {
                  text: "Channel link"
               },
            ]
         ],
         resize_keyboard: true
      })
   })
})


bot.on('message', msg => {
   if (msg.text == 'Channel link') {
      bot.sendMessage(msg.chat.id, 'https://t.me/jakhongirov_blog')
   }
})

bot.on('message', msg => {
   if (msg.text == 'Rezume') {
      bot.sendDocument(msg.chat.id, path.resolve(__dirname, './docs/rezume.pdf'))
   }
})

bot.on('message', msg => {
   if (msg.text == 'About me') {
      bot.sendMessage(msg.chat.id,
         "My full name is Jakhongirov Diyorbek. i am 15 years old. I was born in 2006. I study at 'Najot ta'lim'. I learn Web-Programming in here. In may opinion, you want to learn IT, you  should study 'Najot ta'lim'.",
         {
            reply_markup: {
               inline_keyboard: [
                  [
                     {
                        text: "More",
                        callback_data: "channel_link"
                     }
                  ]
               ]
            }
         }
      )
   }
})

bot.on('callback_query', msg => {
   if (msg.data == 'channel_link') {
      bot.sendMessage(msg.message.chat.id, 'https://t.me/jakhongirov_blog')
   }
})

