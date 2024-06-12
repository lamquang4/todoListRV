import { useState, useEffect } from 'react'
import './App.css'
import { RiCheckboxBlankFill } from 'react-icons/ri'
import { RiCheckboxFill } from 'react-icons/ri'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbPencilPlus } from 'react-icons/tb'
import { v4 as uuid } from 'uuid'

function App() {
 const [toDoList, setToDoList] = useState(() => {
    const storedList = localStorage.getItem('toDoList');
    return storedList ? JSON.parse(storedList) : [];
  });
const [popUp, setPopUp] = useState(false)
const [newTaskText, setNewTaskText] = useState("");

useEffect(() => {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
}, [toDoList]);

function handlePopUp(action){
  if(action === "open"){
     setPopUp(true)
  }else{
    setPopUp(false)
  }
 
}

function addTask(){
  if(newTaskText !== ""){
    setToDoList(current =>{
      return [
        ...current,
        {
          id: uuid(),
          complete: false,
          text: newTaskText
        }
      ]
    })
    setNewTaskText("");
    setPopUp(false);
  }
}

function toggleComplete(id){
  setToDoList(current =>{
    return current.map(item => {
      if(item.id === id){
        return {
          ...item,
          complete: !item.complete
        }
      }
      return item;
    });
  });
}

function deleteTask(id){
  setToDoList(current =>{
    return current.filter(item => item.id !== id);
  });
}

  return (
    <>
{popUp &&
<div className="pop-up-container">
  <div className="pop-up">
    <p className="pop-up-title">Add Task</p>
  <input type="text" className="pop-up-input" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)}/>
  <div className="pop-up-button-container">
    <button className="pop-up-button back" onClick={() => handlePopUp("close")}>Go Back</button>
    <button className="pop-up-button add" onClick={addTask}>Add Task</button>
  </div>
  </div>
</div>
}   
     <div className='header-container'>
      <div className='header'>
        <p className='header-title'>My Tasks</p>
        <div className='header-add-task' onClick={() => handlePopUp("open")}>
        <p className='header-add-task-text'>
          <TbPencilPlus />
        </p>
        </div>
      </div>
     </div>
   

   <div className='to-do-list'>

{toDoList.map(listItem => {
  return (
    <>
    <div className='to-do-container' key={listItem.id}>
<p className='to-do-checkbox' onClick={() => toggleComplete(listItem.id)}>
  {listItem.complete ? <RiCheckboxFill /> :  <RiCheckboxBlankFill /> }
</p>
<p className='to-do-text'>
{listItem.text}
</p>
<p className="to-do-delete" onClick={() => deleteTask(listItem.id)}>
  <RiDeleteBin6Line />
</p>
</div>
    </>
  )
})}




   </div>

    </>
  )
}

export default App
