import { useState } from "react"

export function TodoInput(props) {
    const { handleAddTodo } = props
    const [inputValue, setInputValue] = useState('')

    // add handleAddTodo to onclick event to button, but needs state change info  from input tag
    return (
        <div className="input-container">
            <input value={inputValue} onChange={(e) => 
            {setInputValue(e.target.value)
            }} placeholder="Add task" onKeyDown={(e) => {
                // same as below, but added to allow Enter button to submit launch too MY OWN THING
                if(e.key === 'Enter') {
                    if (!inputValue) { return } 
                    handleAddTodo(inputValue)
                    setInputValue("")
                }
            }} />
            <button onClick={() => {
                if (!inputValue) { return } // if empty str, return, preventing blank tasks
                handleAddTodo(inputValue)
                setInputValue("") // MY OWN THING, clearing the writing value after adding todo
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

// showing how to add icon