const express = require('express');
const app = express();
const fs = require('fs');


const bodyParser = (req, res, next) => {
  let bodyData = '';
  req.on('data', (data) => {
    bodyData += data;
  });
  req.on('end', () => {
    if (bodyData) {
      req.body = JSON.parse(bodyData);
    }
    next();
  });
};


function getData() {
  const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  return data;
}

function addData(data, res) {
  fs.writeFileSync("./data.json", JSON.stringify(data), "utf8");
  res.send(data);
}

function addPokemon(data, name, res) {
  fs.writeFileSync("./data.json", JSON.stringify(data), "utf8");
  res.send(data[name]);
}


app.get('/pokemon/:value', (req, res, next) => {
  let data = getData();
  let result = {};
  let checker = true; 
  if (isNaN(parseInt(req.params.value))){
    for (let pok in data) {
      if (data[pok].name == req.params.value){
        result = data[pok];
        checker = false;
      }
    }
  } else {
    for (let pok in data) {
      if (data[pok].id == req.params.value){
        result = data[pok];
        checker = false;
      }
    }
  }
  if(checker){
    res.status(404).send("Element not found");
  }else{
    res.send(result);
  }
});


app.get('/pokemon', (req, res, next) => {
  let data = getData();
  res.send(data);
});

app.post('/pokemon', bodyParser, (req, res, next) => {
  let data = getData();
  const body = req.body;
  let checker = true; 
  for (let pok in data) {
    if (data[pok].name == body.name){
      checker = false;
    }
  }
  if(checker){
    data[body.name] = {"id":body.id, "name": body.name, "comments": []};
    addPokemon(data, body.name, res);
  } else {
    res.send(data[body.name]);
  }
});  


  
  app.get('/comments/:pokemon', (req, res, next) => {
    let data = getData();
    let result = {};
    let checker = true;
    if (isNaN(parseInt(req.params.pokemon))){
      for (let pok in data) {
        if (data[pok].name == req.params.pokemon){
          result = data[pok].comments;
          checker = false;
        }
      }
    } else {
      for (let pok in data) {
        if (data[pok].id == req.params.pokemon){
          result = data[pok].comments;
          checker = false;

        }
      }
    }
    if(checker){
      res.status(404).send("Element not found");
    }else{
      res.send(result);
    }
  });
  
  app.post('/comments/:pokemon', bodyParser, (req, res, next) => {
    const data = getData();
    const body = req.body;
    let checker = true;
    
    let id_array = [];

    for (let pok in data) {
      for (let i = 0; i < data[pok].comments.length; i++) {
        id_array.push(data[pok].comments[i].id);
      }
    }

    let max_id = Math.max.apply(Math, id_array);

    body.id = ++max_id;
  
    if (checker) {
      if (isNaN(parseInt(req.params.pokemon))){
        for (let pok in data) {
          if (data[pok].name == req.params.pokemon){
            data[pok].comments.push(body);
          }
        }
      } else {
        for (let pok in data) {
          if (data[pok].id == req.params.pokemon){
            data[pok].comments.push(body);
          }
        }
      }
    
      addData(data, res);
    } else {
      res.status(400).send("Element id is incorrect");
    }
   

  });




  app.put('/comments/:pokemon/:comment_id', bodyParser, (req, res, next) => {
    // put body 
    const data = getData();
    const body = req.body;
    let checker = true;

    if (isNaN(parseInt(req.params.pokemon))){
      for (let pok in data) {
        if (data[pok].name == req.params.pokemon){
          for (let i = 0; i < data[pok].comments.length; i++) {
            if (data[pok].comments[i].id == req.params.comment_id){
              data[pok].comments[i] = body;
              checker = false;
            } 
          }
        }
      }
    } else {
      for (let pok in data) {
        if (data[pok].id == req.params.pokemon){
          for (let i = 0; i < data[pok].comments.length; i++) {
            if (data[pok].comments[i].id == req.params.comment_id){
              data[pok].comments[i] = body;
              checker = false;
            } 
          }
        }
      }
    }

    if (checker){
      res.status(404).send("Element not found");
    } else {
      addData(data, res);
    }

  });

  app.delete('/comments/:pokemon/:comment_id', bodyParser, (req, res, next) => {
    // delete body
    const data = getData();
    //const body = req.body;
    let checker = false;

    for (let pok in data) {
      for (let i = 0; i < data[pok].comments.length; i++) {
        if (data[pok].comments[i].id == req.params.comment_id){
          checker = true;
        } 
      }
    }

    if (checker) {
      if (isNaN(parseInt(req.params.pokemon))){
        for (let pok in data) {
          if (data[pok].name == req.params.pokemon){
            let temp_comments_array = [];
            for (let i = 0; i < data[pok].comments.length; i++) {
              if (data[pok].comments[i].id != req.params.comment_id){
                temp_comments_array.push(data[pok].comments[i]);
              }
            }
            data[pok].comments = temp_comments_array;
          }
        }
      } else {
        for (let pok in data) {
          if (data[pok].id == req.params.pokemon){
            let temp_comments_array = [];
            for (let i = 0; i < data[pok].comments.length; i++) {
              if (data[pok].comments[i].id != req.params.comment_id){
                temp_comments_array.push(data[pok].comments[i]);
              }
            }
            data[pok].comments = temp_comments_array;
          }
        }
      }
  
      addData(data, res);

    } else {
      res.status(404).send("Element not found");
    }
  });
  

app.listen(3001, () => {
    console.log('Its started', new Date());
});
