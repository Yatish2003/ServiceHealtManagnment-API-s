const express =require('express');
const services=require('./services.json');
const fs=require('fs');
const app=express();

const port=5000;
app.use(express.urlencoded({extended:false}))   
//      GET
app.get('/api/service',(req,res)=>{
    res.send(services);
})

//POST
app.post('/api/service',(req,res)=>{
    let values=req.body;
    services.push({...values,id: services.length+1});
    fs.writeFile('./services.json',JSON.stringify(services),(err,data)=>{

        res.json({mesgae:"value get huii"});
    })
})


app.get('/api/service/:id',(req,res)=>{
    let ID=Number(req.params.id);
    let idVal=services.find(serv => serv.id === ID);
    res.json(idVal);

})

app.put('/api/service/:id',(req,res)=>{
    let ID=Number(req.params.id);
    let putVal=req.body;
    let idVal=services.find(serv => serv.id === ID);
    serviceToUpdate = { ...idVal, ...putVal };
    let newService=services.map(service => service.id === ID ?serviceToUpdate:service )
    fs.writeFile('./services.json',JSON.stringify(newService,null,2),(err,data)=>{
        if(err){
            res.json({mesgae:"Oops! Some thing Went Wrong"})
        }
        res.json(serviceToUpdate);
    })


})

app.listen(port,()=>{
    console.log(`Server is listning on port http://localhost:${port}/api/service`);
})