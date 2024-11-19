import http from "http";
import fs from 'fs/promises'
import url from 'url'
import path  from "path"
const PORT = process.env.PORT ;
// get current file path
const __Filename =url.fileURLToPath(import.meta.url)
const __dirname =path.dirname(__Filename)
// console.log(__Filename,__dirname)
const server = http.createServer(async (req, res) => {
  try {
    if(req.method==='GET'){
      let filepath;
      if(req.url==='/'){
        filepath=path.join(__dirname,'public','index.html')
      //   res.writeHead(200, { "content-type": "text/html" });
      // res.end('<h1>hello </h1>');
      }
      else if(req.url==='/about'){
        filepath=path.join(__dirname,'public','index.html')
        // res.writeHead(200, { "content-type": "text/html" });
        // res.end('<h1>welcome to about </h1>');
      }
      else{
        throw new Error('Not found')
        // res.writeHead(404, { "content-type": "text/html" });
        // res.end('<h1>Not found</h1>');
      }
      const data =await fs.readFile(filepath);
      res.setHeader('Content-Type','text/html')
      res.write(data)
      res.end()
    }else{
      throw new Error("Method not sloowes")
    }
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain" });
    
    res.end('server error');
  }
  
  // res.setHeader=('content-type','text/html')
});

server.listen(PORT, () => {
  console.log(`server runnuing on port ${PORT}`);
});
