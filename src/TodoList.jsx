import React from 'react'
import {useState} from 'react'
import { Icon } from '@iconify/react';



export default function TodoList({ List, completeTask, removeTask }) { 
  try{
    return  List.map((task, index) => 
    (
      <div className={task.isComplete ?  'TodoApp__List__completed' : 'TodoApp__List__lift'} key={index} >
        <div className={'TodoApp__List'} key={task.id} onClick={()=>completeTask(task.id)}>
          <h1 className={task.isComplete ?  'Listtext__completed' : 'Listtext__left'}>
            {task.text}
          </h1>
         <p className={task.isComplete ?  'Listdate_complete' : 'Listdate_left'}>
           {task.date}
          </p>
        </div>
        <div>
          <button onClick={() => removeTask(task.id)} className={task.isComplete ?  'TodoApp__List__deleteIcon-completed' : "TodoApp__List__deleteIcon"}>
            <Icon icon="octicon:trash-16" /> 
          </button>
        </div>
      </div>
    )
    );
  }
  catch (err){
    console.log(err.message);
  }
}


