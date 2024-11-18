import http from 'http'
const PORT =8080;
const server  =http.createServer((req,res)=>{
    console.log(req.url)
    // res.detHeader=('content-type','text/html')
    res.writeHead(500,{'content-type':'application/json'})

    res.end(JSON.stringify({messahe:'server error'}))
})

server.listen(PORT,()=>{
    console.log(`server runnuing on port ${PORT}`)
})