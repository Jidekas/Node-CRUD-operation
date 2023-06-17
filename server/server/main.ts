import http, { IncomingMessage, Server, ServerResponse } from 'http';
import fs from 'fs'
import path from 'path'

interface organization {
createdAt: string
updatedAt:string; 
products: string[];
marketValue:string; 
address: string;
ceo:string;
country:string; 
id: number
noOfEmployees:number
employees:string [];
}



//POST DATA

export const postData = (req:IncomingMessage, res:ServerResponse) =>{
    let incoming = ''
    req.on('data', (chunk) =>{
        incoming += chunk
    })

    req.on('end', ()=>{
        let incomingData = JSON.parse(incoming)
        let databaseDir = path.join(__dirname,"database")
        let myDatabase = path.join(databaseDir, "database.json")

        if(!fs.existsSync(databaseDir)){
            fs.mkdirSync(databaseDir)
        }
        if(!fs.existsSync(myDatabase)){
            fs.writeFileSync(myDatabase, "")
        }

        return fs.readFile(myDatabase, 'utf-8', (err, data) =>{
            if(err){
                res.writeHead(500, {"Content-Type":"application/json"});
                res.end(JSON.stringify({
                    success: false,
                    error: err   
                }))
            } else{

                let organization: organization[] = []
                try {
                    organization = JSON.parse(data)
                } catch (error) {
                    organization = []
                }

                incomingData.createdAt = new Date();
                incomingData.updatedAt = new Date();
                incomingData.noOfEmployees = incomingData.employees.length
                if(organization.length < 1){
                    incomingData.id = 1
                } else{
                  let  Ids = organization.map((a)=> a.id)
                  let lastId = Math.max(...Ids)
                  incomingData.id = lastId +1
                }
                
                organization.push(incomingData);

                //console.log(organization)

                fs.writeFile(myDatabase, JSON.stringify(organization, null, 2), "utf-8", (err) =>{
                    if(err){
                        res.writeHead(500, {"Content-Type":"application/json"});
                        res.end(JSON.stringify({
                            success: false,
                            error: err   
                        })) 
                    }else{
                
                        res.writeHead(200, {"Content-Type":"application/json"});
                        console.log(incomingData)
                        res.end(
                            
                            JSON.stringify({
                                "success": true,
                                "message": incomingData
                               // info:  "added successfuly"
                            })
                        );
                    }
                })
            }
        })



    })

}


//GET DATA

export const getData = (req:IncomingMessage, res:ServerResponse) =>{
    return fs.readFile(path.join(__dirname,"./database/database.json"), "utf-8", (err, info)=>{
        if(err){
            res.writeHead(500, {'Context-Type': 'application/json'})
            res.end(JSON.stringify({
                success: false,
               error: err
                
            }))
        } else { 
            let fetched =  JSON.parse(info) 

            console.log(fetched)

            res.writeHead(200, {'Context-Type': 'application/json'})
            res.end(JSON.stringify({
            success: true,
            message:  fetched     
        }))

        }

    })
}




//PUT DATA
export const putData = (req:IncomingMessage, res:ServerResponse) =>{
    let incoming = ''
    req.on('data', (chunk) =>{
        incoming += chunk
    })

    req.on('end', ()=>{
        let incomingData = JSON.parse(incoming)
        let databaseDir = path.join(__dirname,"database")
        let myDatabase = path.join(databaseDir, "database.json")

        if(!fs.existsSync(databaseDir)){
            fs.mkdirSync(databaseDir)
        }
        if(!fs.existsSync(myDatabase)){
            fs.writeFileSync(myDatabase, "")
        }

        return fs.readFile(myDatabase, 'utf-8', (err, data) =>{
            if(err){
                res.writeHead(500, {"Content-Type":"application/json"});
                res.end(JSON.stringify({
                    success: false,
                    error: err   
                }))
            } else{

                let organization: organization[] = []
                try {
                    organization = JSON.parse(data)
                } catch (error) {
                    organization = []
                }

                let putIndex = 0

                organization.map((a,i)=>{
                    if(a.id === incomingData.id){
                        putIndex = i
                    }
                })
                
                incomingData.updatedAt = new Date();
                organization.splice(putIndex,1,incomingData)

               // console.log(organization)
             
                fs.writeFile(myDatabase, JSON.stringify(organization, null, 2), "utf-8", (err) =>{
                    if(err){
                        res.writeHead(500, {"Content-Type":"application/json"});
                        res.end(JSON.stringify({
                            success: false,
                            error: err   
                        })) 
                    }else{
                        
                        //console.log("succeed")
                        res.writeHead(200, {"Content-Type":"application/json"});
                        //console.log(incomingData)
                        res.end(
                            
                            JSON.stringify({
                                "success": true,
                                "message": incomingData
                               // info:  "added successfuly"
                            })
                        );
                    }
                })
            }
        })

    })
}


//DELETE  DATA
export const deleteData = (req:IncomingMessage, res:ServerResponse) =>{
    let incoming = ''
    req.on('data', (chunk) =>{
        incoming += chunk
    })

    req.on('end', ()=>{
        let incomingData = JSON.parse(incoming)
        let databaseDir = path.join(__dirname,"database")
        let myDatabase = path.join(databaseDir, "database.json")

        if(!fs.existsSync(databaseDir)){
            fs.mkdirSync(databaseDir)
        }
        if(!fs.existsSync(myDatabase)){
            fs.writeFileSync(myDatabase, "")
        }

        return fs.readFile(myDatabase, 'utf-8', (err, data) =>{
            if(err){
                res.writeHead(500, {"Content-Type":"application/json"});
                res.end(JSON.stringify({
                    success: false,
                    error: err   
                }))
            } else{

                let organization: organization[] = []
                try {
                    organization = JSON.parse(data)
                } catch (error) {
                    organization = []
                }

                let putIndex = 0

                organization.map((a,i)=>{
                    if(a.id === incomingData.id){
                        putIndex = i
                    }
                })
                
                incomingData.updatedAt = new Date();
                organization.splice(putIndex,1)

               // console.log(organization)
             
                fs.writeFile(myDatabase, JSON.stringify(organization, null, 2), "utf-8", (err) =>{
                    if(err){
                        res.writeHead(500, {"Content-Type":"application/json"});
                        res.end(JSON.stringify({
                            success: false,
                            error: err   
                        })) 
                    }else{
                        
                        //console.log("succeed")
                        res.writeHead(200, {"Content-Type":"application/json"});
                        //console.log(incomingData)
                        res.end(
                            
                            JSON.stringify({
                                "success": true,
                                "message": incomingData
                               // info:  "added successfuly"
                            })
                        );
                    }
                })
            }
        })

    })
}