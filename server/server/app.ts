import http, { IncomingMessage, Server, ServerResponse } from "http";
import { postData, getData, putData, deleteData } from "./main";
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if(req.method === "POST"){
      res.end(postData(req, res))
    }

    if(req.method === "GET"){
      res.end(getData(req, res))
    }

    if(req.method === "PUT"){
      res.end(putData(req, res))
    }

    if(req.method === "DELETE"){
      res.end(deleteData(req, res))
    }
  }
);

server.listen(3005, ()=>{
  console.log('server listening on port 3005')
});


