const express = require('express');
const app=express();

app.get('/',(req,res)=>{
  res.send('hellow express')
});

app.get('/api',(req,res)=>{
  res.send('hellow api')
});

app.get('/api/posts',(req,res)=>{
  res.json([
    {id:1,content:'hellow'},
    {id:2,content:'hellow2'},
    {id:3,content:'hellow3'}, 
    {id:4,content:'hellow4'},
  ]);
});

app.post('/api/post',(req,res)=>{
  res.json({id:1,content:'hellow'})
});

app.delete('/api/post',(req,res)=>{
  res.json({id:1})
});

app.listen(3065,()=>{
  console.log('서버실행중');
});