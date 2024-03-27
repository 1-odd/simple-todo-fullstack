import { useState } from 'react';

import './App.css'
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {

  const [todos,setTodos] = useState([]);

  fetch("http://localhost:3001/todos").then(async function(res){
    const result = await res.json();
    setTodos(result.data)
  })

  return (
    <div>

      <CreateTodo/>
      <Todos todos={todos} />
     
    </div>
  )
}

export default App
