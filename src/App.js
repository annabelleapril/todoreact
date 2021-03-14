import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
  //State
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
//useEffects
useEffect(() => {
  getLocalTodos();
}, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

//Functions
function filterHandler(){
  switch(status){
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed === true))
      break;
    case 'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed === false))
      break;
    default:
      setFilteredTodos(todos);
      break;
  }
}

function saveLocalTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos(){
  if(localStorage.getItem('todos') === null){
    localStorage.setItem('todos', JSON.stringify([]));
  }
  else{
    let todoLocal = JSON.parse(localStorage.getItem('todos'));

    setTodos(todoLocal);
  }
}
  
  return (
    <div className="App">
     <header>
      <h1>Gus's Todo List</h1>
    </header>
    <Form 
    todos={todos} 
    setTodos={setTodos} 
    setInputText={setInputText} 
    inputText={inputText} 
    setStatus={setStatus}
    />
    <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    
    </div>
  );
}

export default App;
