function gen(){
    return Math.floor(Math.random()*100)+1;
}
function cel(cel){
    return(cel*9)/5+32;
}

module.exports={
    gen(),
    cel()
}