import 'reflect-metadata'
// import Simulation from './Simulation'
// import { OBJA } from './simulation/'
import { Order } from './entity/Order'
import data from './data/product'
var cors = require('cors')
import * as express from 'express'
const app = express()

const SSE_RESPONSE_HEADER = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
}
var users = {}

app.use(cors())

app.get('/', function(req, res) {
  res.send('Hello World!')
})
let y
app.get('/get', function(req, res) {
  let userId = getUserId(req)
  y = true
  users[userId] = req

  res.writeHead(200, SSE_RESPONSE_HEADER)

  res.write(`data: los gehts\n\n`)
  let i = 1
  if (y) {
    setInterval(() => {
      let myOrder = new Order()
      let val = i
      let index = Math.floor(Math.random() * (10 - 1 + 1) + 1) - 1
      myOrder.name = data[index].name
      myOrder.orderId = val
      myOrder.productId = data[index].productId
      myOrder.value = data[index].price
      i++
      res.write(`data: ${JSON.stringify(myOrder)}\n\n`)
    }, Number(process.env.speed) || 1000)
  }

  req.on('close', function() {
    let userId = getUserId(req)
    console.log(`*** Close. userId: "${userId}"`)
    // Breaks the interval loop on client disconnected
    // Remove from connections
    delete users[userId]
  })

  req.on('end', function() {
    let userId = getUserId(req)
    console.log(`*** End. userId: "${userId}"`)
  })

  // Writes response header.
})

function getUserId(req) {
  // Note:
  // In reality, you should use userId stored in req.session,
  // but not URI parameter.
  // return req.params.userId;
  return 1
}

app.listen(3555, function() {
  console.log('Example app listening on port 3555!')
  console.log(data)
})
