import { useState } from 'react';
import '../App.css'

export function CreateTodo(){

    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");

    return(
        <div>
            <input className='title' id='title' type="text" placeholder="Title"onChange={(e)=>{
                const value = e.target.value; 
                console.log(value);
                setTitle(value);
            }} /> <br /> <br />
            <input className='desc' id='description' type="text" placeholder="Description" onChange={(e)=>{
                const  value = e.target.value; 
                console.log(value);
                setDescription(value);
            }} /><br /> <br />

            <button className='btn' onClick={()=>{
                fetch("http://localhost:3001/add-todo",{
                    method:"POST",
                    body:JSON.stringify({
                        title : title,
                        description : description
                    }) ,
                    headers:{ "Content-Type": "application/json"}
                })
                .then((async (res)=>{
                    const json = await res.json();
                    alert("todo added")
                }))
            }}>Create Todo</button>
        </div>
    )
   
}