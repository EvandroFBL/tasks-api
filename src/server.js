import http from 'node:http'
import { json } from './middleware/json.js'

const server = http.createServer(async (req, res) => {
    await json(req, res)
    return res.end('working!')
})

server.listen(3434)