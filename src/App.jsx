import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import { useState, useEffect } from "react"

function App() {
  // top level logic for app, for generating tasks-- arr of objects w/ two key-val pairs
  // const todos = [
  //   {input: 'Hello, add your first todo COMPLETE', complete: true},
  //   {input: 'Hello, add your second todo', complete: false},
  //   {input: 'Hello, add your 3rd todo', complete: false},
  //   {input: 'Hello, add your 4th todo!! COMPLETE', complete: true},
  // ]

  // use state: variable, then a setter function for variable. Note USESTATE IS A HOOK
  const [todos, setTodos] = useState([{input: 'Hello, add your first todo COMPLETE', complete: true},]) // empty/full brackets are default values, default todos in this case

  //since tab selection info is needed in Tabs and Todolist, init data in parent to pass as props
  const [selectedTab, setSelectedTab] = useState('Open')

  //when adding new item, must create a new list bc list items are const
  function handleAddTodo(newTodo) { // conditional for clearing out input without adding new task if task alr in
    if (todos.find((val) => val.input === newTodo)) {
      console.log("Already in task list");
      return}
    const newTodoList = [...todos, {input: newTodo, complete: false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    // update/edit/U of CRUD
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index // if valindex is not equal, then it will return val
    })

    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  // In order to have use effect run, we need to have a function in place to actually save the data into the db
  // to ensure we have up to date data, we store arg as todos Value
  function handleSaveData(currentTodos) {
    // shorthand for obj syntax todos: todos(KV pair needed for obj), where K=todos, V= list of tasks
    // that  we then need to stringify it to JSON
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos })) 
  }


  // USE EFFECT HOOK- two args, arrow func, and dependency arr. dependency array tells us when the func 
  // occurs based on content. ex: if empty, effect func runs immediately(onMount event)
  useEffect(() => {
    // guard clause, if local stg not avail, then dont run, wait until avail, 
    // or if local storage w/ our custom key DNE
    if (!localStorage || !localStorage.getItem('todo-app')) {return} 

    let db = JSON.parse(localStorage.getItem('todo-app')) // saved as JSON, so we need to convert it
    setTodos(db.todos) // setting todos to what was in db
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} 
      handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo} />  
    </>
  )
}

export default App

// a react component is simply a function (technically a functional component here)
// a component returns .jsx code, which is just HTML w/ JS written directly into it

// curly brackets allow direct injection into HTML
// import functional components into app to provide functionality

// each component should serve a singular purpose, if you want another purpose w/ repeated logic,
// create a new component

// we dont want to have a double nested div, so we remove the App return div, but then we get errors
// this is because each component can only have one top level element(elements can have kids,
//  but only child up top) -> soln? wrap in empty div called a FRAGMENT

// how do we communicate between each component? goes parent -> child
// Header and Tabs need access to TodoList for # of open tasks, but they're siblings, how to solve?
// PROPS : defining info in parent component to pass down info as properties -> give props to comp tags

// props are boxes conataining info, that we can detail ATTRIBUTE STYLE PROP of component tags
//= give it a unique name to reference, then input prop variable in {}

//USE STATE, changing the screen depending on the variables present or state of them
//HOOKS: specific functions for manipulating and managing data on a page, MUST IMPORT FROM REACT DIRECTLY

//Use effect react hook- used for dealing with local storage and saving data
//tells this like if page is up, or listening for events occuring, and then running code