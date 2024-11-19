import {createServer} from 'http'
import path from 'path'
import url from 'url'
const PORT=process.env.PORT
const __filepath=url.fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filepath)
const users=[
    {id:1,name:'john doe'},
    {id:2,name:'john kamau'},
    {id:3,name:'jim'}
]

// logger
const logger =(req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
}
const server=createServer((req,res)=>{
    logger(req,res,()=>{
        if(req.url==='/api/users' && req.method==='GET'){
            res.write(JSON.stringify(users))
            res.end()
         }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method==='GET'){
             const id=req.url.split('/')[3]
             const user=users.find((user)=>user.id===parseInt(id))
             res.setHeader('Content-Type','application/json')
             if(user){
             res.write(JSON.stringify(user))
             res.end() 
             }else{
                 res.statusCode=404;
                 res.setHeader('Content-Type','application/json')
                res.write(JSON.stringify({ message:'user Not found'}))
                
                res.end()
             }
             
         }
         else{
             res.statusCode=404;
             res.setHeader('Content-Type','application/json')
            res.write(JSON.stringify({ message:'Route Not found'}))
            
            res.end()
         }
    })
    
})
server.listen(PORT,()=>{
    console.log(`server runnong on port:${PORT}`)
})