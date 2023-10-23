const express=require('express');
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(express.static(__dirname));
app.use(express.static(__dirname+"/index.html"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(request,response)=>{
response.sendFile(__dirname + "/index.html");
})



app.post("/",(req,res)=>{

var name=req.body.name;
var mail=req.body.email;

var pnum=req.body.pnum;
var address=req.body.address;
var order=req.body.oname;
var data={
members:[
{
email_address:mail,
status:"pending",
merge_fields:{
NAME: name,
ORDER: order,
ADDRESS: address,
PHONE: pnum

}
}]
};

const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/3df56403e5";
const options={
method:"POST",
auth:"nidhi:fd8e4e3b2cd0081ec28730f09d15492b-us6",
html:"<h1> HEY PLEASE CONFIRM THE MAIl ${name}</h1>"
};

const request=https.request(url,options,function(response){

if(response.statusCode===200){
res.send("<cenetr><h1>Please check your email</h1></cenetr>");
}
else {
res.send("<cenetr><h1>There was a bug try again or contact the developer</h1></cenetr>")
}
response.on("data",function(data){
JSON.parse(data)
})
});

request.write(jsonData);
request.end();

});






app.listen(process.env.PORT || 4000, ()=>{
console.log("hey");

});