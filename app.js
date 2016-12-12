process.env.PGHOST = 'localhost'
process.env.PGUSER = 'postgres'
process.env.PGPASSWORD = 'password'
process.env.PGDATABASE = 'postgres'

const TelegramBot = require('node-telegram-bot-api')
const pg = require('pg')

const client = new pg.Client()

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
});

client.connect((err) => {
  if (err)
    throw err

  console.log('connected')

  bot.onText(/^(.+)/, function (msg, match) {

    const chatId = msg.chat.id
    const q = match[1]

    const query = client.query("select * from find_company($1);", [q], (err, result) => {
      if (err) {
        // throw err
        console.log(err)
        return
      }

      // console.log(result.rowCount, result.rows)

      // less than 10 results found
      var msg = ''
      if (result.rowCount !== 1 && result.rows !== 10) {
        msg = result.rowCount.toString()
      }
      for (var i = 0; i < result.rows.length; i = i + 1) {
        msg = msg + '\n*' + result.rows[i].name + '* ' + result.rows[i].id + ' ' + result.rows[i].location_text + ', ' + result.rows[i].address
      }
      bot.sendMessage(chatId, msg, {
        parse_mode: 'Markdown'
      })


      if (result.rowCount === 10) {
        // calculate the actual number of matches
        const count_query = client.query("select * from count_companies($1);", [q], (err, result) => {
          if (err) {
            console.log(err)
            throw err
          }

          //console.log(JSON.stringify(result))
          msg = 'found *' + result.rows[0].count_companies.toString() + '*'
          bot.sendMessage(chatId, msg, {
            parse_mode: 'Markdown'
          })
        })
      }
    })
  })
})