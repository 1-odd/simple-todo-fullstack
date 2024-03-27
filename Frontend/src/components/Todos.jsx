export function Todos({ todos }) {
   

    
    return (
        <div>
            {todos.map((todo) => (
                console.log(todo._id), 
                <div key={todo.id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={()=>{
                        fetch("http://localhost:3001/todo-completed",{
                            method:"PUT",
                            body:JSON.stringify({
                                id: todo._id,
                            }),
                            headers:{ "Content-Type": "application/json"}
                            
                        }).then(async (res)=>{
                            const  data = await res.json();
                            alert(data.msg);
                        })
                    }}>{todo.completed ? "completed" : "mark as complete"}</button>
                </div>
            ))}
        </div>
    );
}

