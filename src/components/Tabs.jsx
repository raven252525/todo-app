export function Tabs(props) {
    const { todos, selectedTab, setSelectedTab } = props
    
    const tabs = ['All', 'Open', 'Completed']

    // tabs has dynamic class name, this has JS assign diff class names depending on if its selected
    // this is done by wrapping classname in {} and(className={..}), and cocatenate extra classNames/logic 
    //ex, adding a space sep class, based on a conditional if the tab being rendered is selected, if it is, 
    // extra styling
    return (
        <nav className="tab-container">
            
            {tabs.map((tab, tabIndex) => {
                // scoped to map js : conditional statement that provides the correct length of each type of task
                const numOfTasks = tab === 'All' ? todos.length :
                tab === 'Open' ? todos.filter(val => !val.complete).length :
                todos.filter(val => val.complete).length

                return (
                    <button onClick={() => {
                        setSelectedTab(tab)
                    }} key={tabIndex} className={"tab-button "
                        + (tab == selectedTab ? ' tab-selected' : ' ')}>
                        <h4>{tab} <span>({numOfTasks})</span></h4>
                    </button>
                )
            })}
            <hr />
        </nav>
    )
}

// attribute prop use documentation and explaination detailed in Header file

// we dont want to copy past multiple buttons, soln -> react concept MAPPING this allows us to create 
// an array with all our tabs we want to have, and we are going to MAP to each one, essentially returning jsx
// for each element in array tabs, kind of like iterating over a for loop

//-- use map method of JS arrays, inputs are element and index, returns button we want, as jsx code
//each tab needs a unique key, so we use the index(maybe this was patched bc no issue w/o it)
