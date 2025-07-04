import http from 'node:http'
import { routes } from './routes.js'
import { Json } from './middlawares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
    
    const {method, url} = req

    const continueProcessing = await Json(req, res)

    if(!continueProcessing) return

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
         
        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    res.writeHead(404)
    res.end()
})

server.listen(3333)