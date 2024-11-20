import {createServer} from 'http'
const PORT=process.env.PORT
const users=[
    {id:1,name:'john doe'},
    {id:2,name:'john kamau'},
    {id:3,name:'jim'}
]

// logger middleware
const logger =(req,res,next)=>{
    console.log(`${req.method} `)
    console.log(`${req.url}`)
    next()
}
// json middleware
const jsonmiddleware=(req,res,next)=>{
    res.setHeader('Content-Type','application/json')
    next()
} 
// route handler for Get /api/users
const getUserHandler=(req,res)=>{
    res.write(JSON.stringify(users))
    res.end()
}
// route handler for Get /api/users/:id
const getUserByIdHundler=(req,res)=>{
    const id=req.url.split('/')[3]
     const user=users.find((user)=>user.id===parseInt(id))
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
// route handler for post /api/users
const createUserHandler=(req,res)=>{
    let body='';
    // listen for data
    req.on('data',(chunck)=>{
        body+=chunck.toString()
    })
    req.on('end',()=>{
        const newUser=JSON.parse(body)
        users.push(newUser)
        res.statusCode=201;
        res.write(json.stringify(newUser))
        res.end()
    })
}
// Not found handler
const notFound=(req,res)=>{
    res.statusCode=404;
    res.write(JSON.stringify({ message:'Route Not found'}))
     res.end()
}
const server=createServer((req,res)=>{
    logger(req,res,()=>{
        jsonmiddleware(req,res,()=>{
            if(req.url==='/api/users' && req.method==='GET'){
                getUserHandler(req,res)
            }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method==='GET'){
                getUserByIdHundler(req,res)
            }else if(req.url==='/api/users' && req.method==='POST'){
                createUserHandler(req,res)
            }
            else{
                notFound(req,res)
            }
        })
    })
    
})
server.listen(PORT,()=>{
    console.log(`server runnong on port:${PORT}`)
})