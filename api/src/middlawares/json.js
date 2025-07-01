export async function Json(req, res) {
    res.setHeader('Content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Responde direto se for OPTIONS (pré-vôo)
    if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return false
    }

    const buffers = []

    for await(const chunk of req) {
        buffers.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch{
        req.body = null
    }

    return true
}