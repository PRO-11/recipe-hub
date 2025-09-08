import { timeout_sec } from "./config"
const timeout=function(sec)
{
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            reject(new Error(`Api took more then ${sec} second to respond`))
        },sec*1000)
    })
}
export const getJSON=async function(url)
{
    try{
    const data=await Promise.race([fetch(url),timeout(timeout_sec)])
    const res=await data.json();
    if(!data.ok)
    throw new Error(res.message)
    return res;
    }
    catch(err)
    {
        console.log("pro")
        throw err
    }
}
export const sendJSON=async function(url,reqdata)
{
    try{
    const fetchReq=fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(reqdata)
    })
    const data=await Promise.race([fetchReq,timeout(timeout_sec)])
    const res=await data.json();
    if(!data.ok)
    throw new Error(res.message)
    return res;
    }
    catch(err)
    {
        console.log("pro")
        throw err
    }
}