import fs from 'fs/promises'
// import fs from 'fs'
// // readfile -callback
// fs.readFile('./text.txt','utf-8',(err,data)=>{
//     if(err)throw err
//     console.log(data)
// })
// readfileSync()-syncronous version

// writefile
const writefile= async ()=>{
    try {
        await fs.writeFile('./text.txt','iam writing to this file');
        console.log('file written to ...')
    } catch (error) {
        console.log(error)
    }
  

}
// append file
const appendfile=async ()=>{
    try {
        await fs.appendFile('./text.txt','\n this is appended text');
        console.log("file appended to")
    } catch (error) {
        console.log(error)
    }
}
const readFile=async()=>{
   try {
    const data= await fs.readFile('./text.txt','utf8');
    console.log(data)
   } catch (error) {
    console.log(error)
   }
}
writefile()
appendfile()
readFile()