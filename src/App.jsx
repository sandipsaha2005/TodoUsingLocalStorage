import { useState ,useEffect} from 'react'
import { TodoProvider, useTodo } from './context/TodoContext'
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';
function App() {
  const [todos, setTodos] = useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:uuidv4(),...todo}, ...prev])
  }
  // const updateTodo=(id,todo)=>{
  //   setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id? todo : prevTodo)))
  // }

  const updateTodo=(id,todo)=>{
    const updatedTodo=[...todos];
    for(let i=0;i<updatedTodo.length;i++){
      if(updatedTodo[i].id==id){
        // updatedTodo[i].todo=todo;
        updatedTodo[i]=todo;
        break;
      }
    }
    setTodos(updatedTodo);
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
      const data=JSON.parse(localStorage.getItem("todos"));
      if(data && data.length>0){
        setTodos(data);
      }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  
  

  return (
    <TodoProvider value={{addTodo,updateTodo,toggleComplete,deleteTodo,todos}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                      <div className="mb-4">
                        <TodoForm/>
                        
                      </div>
                      <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((item)=>(
                          <div key={item.id} className='w-full'>
                            <TodoItem todo={item}/>

                          </div>
                        ))}
                      </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
