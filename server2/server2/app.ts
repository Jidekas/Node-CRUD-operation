import http, { IncomingMessage, Server, ServerResponse } from "http";
import { scrapeData } from './routes';



const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {

    return scrapeData(req, res);
    
  }
});

server.listen(3000, () => console.log(`server is listening on port 3000`));