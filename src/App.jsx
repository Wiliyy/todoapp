import './App.css'
import TodoList from './TodoList';
import uuid from 'react-uuid';
import { Icon } from '@iconify/react';
import { useState  , useEffect , useRef } from 'react'

function App() {

  const [tasks , setTasks] = useState([])
  const [input, setInput] = useState();
  const [errorMessage, seterrorMessage] = useState();
  const [completed, setcompleted] = useState(0);
  const inputRef = useRef(null);
  let date =new Date()

  function handleChange(e){
    setInput(e.target.value);
    seterrorMessage("")
  };
  
  function addtask(e){
    e.preventDefault();
    if (!inputRef.current.value || /^\s*$/.test(inputRef.current.value)) {
      seterrorMessage("you must enter value")
    } else {
      const newTask = [{ id: uuid(),  text: input , isComplete:false , date: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+ " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() }, ...tasks];
      setTasks(newTask);
      seterrorMessage("")
      setInput('');
    }
  }
  
  function removetask(id){
    const removedArr = [...tasks].filter(list => list.id !== id);
    const arr = [...tasks].map(list => {if (list.id === id) {list.isComplete ? setcompleted(completed - 1) : setcompleted(completed)}  });
    setTasks(removedArr);
  }


  function completetask(id){
      let updatedTask = tasks.map(list => {
        if (list.id === id) 
        {
          list.isComplete = !list.isComplete;
          list.isComplete ? setcompleted(completed + 1) : setcompleted(completed - 1) 
        }
        return list;
      });
      setTasks(updatedTask);
  }
  

  return (
    <div className="TodoApp">
      <form onSubmit={addtask} className="TodoApp__input">   
        <input placeholder='Add a task' value={input} onChange={handleChange}  ref={inputRef} />
        <button  className='todo-button'>
        +
        </button>
      </form>
      <p className="TodoApp__input__errorMessage"> {errorMessage}  </p>
      <TodoList List={tasks} completeTask={completetask}  removeTask={removetask}  />
          <div className="TodoApp__input__total">
           <p className="">  <Icon icon="ant-design:check-circle-outlined" /> {  completed} \ {tasks.length} </p>
          </div>
    </div>
  );
}

export default App
