const express = require('express');
const app = express();
let connections = [];
let tick = 0;

const LIMIT = +process.argv.splice(2)[0];
const DELAY = 1000;
const PORT = 3000;

app.get('/date', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  connections.push(res)
})

let server = app.listen(PORT, () => {
  console.log(`serv run ${PORT}`)
})

if(Number.isInteger(+LIMIT)) {
  setTimeout(function run() {
    let time = new Date();

    console.log(tick)

    if(++tick > LIMIT) {
      connections.map(res => {
        res.write(`Текущая дата ${time.toLocaleDateString()} и время ${time.toLocaleTimeString('ru-RU')}.\n`);
        res.end();
      })

      connections = [];
      tick = 0;
    }

    connections.map((res, i) => {
      res.write(`Hello ${i}! Time: ${time.toLocaleTimeString('ru-RU')}.\n`);
    })

    setTimeout(run, DELAY)
  }, DELAY)
} else {
  console.log('Введите число');

  server.close()
}
