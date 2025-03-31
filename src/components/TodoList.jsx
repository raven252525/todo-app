import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todos, selectedTab} = props
    // next line done in order to filter out tasks when in different tabs
    
    const filterTodosList = selectedTab === 'All' ? todos : 
    selectedTab === 'Open' ? todos.filter(val => !val.complete) :
    todos.filter(val=> val.complete)
    
    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                const tempTodoIndex = todos.findIndex(val => val.input == todo.input)
                return (
                   <TodoCard 
                   key={todoIndex} 
                   {...props}
                   todoIndex={tempTodoIndex}
                   todo={todo} /> 
                )
            })}
        
        </>
    )
}

//attribute props, and mapping explained in Header and Tabs components respectively

// to do card is rendered IN to do list, cards are separate component bc its a repeated action