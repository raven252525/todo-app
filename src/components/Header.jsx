export function Header(props) {
    //  destructuring syntax to load necessary prop info in accessible format
    // todos is name of attribute in the tag that we want to access, linked to todos arr in main
    const { todos } = props
    const todosLength = todos.length

    const isTasksPlural = todos.length != 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'
    
    // MY OWN THING made header non highlightable
    return (
        <header> 
            <h1 style={{userSelect: "none"}} className="text-gradient">You have {todosLength} total {taskOrTasks}</h1>
        </header>
    )
} // header has args passed in parenthesis, and body returns anything(currently empty HTML header)

// displays how many open tasks we have, but number is dynamic, so insert class
//on component side, to recieve props, use props keyword as function parameter
