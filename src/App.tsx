import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist, ToodolistType,} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let [todolists, setTodolists] = useState<Array<ToodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistId: string, taskId: string) {
        let filteredTasks = tasks[todolistId].filter(t => t.id != taskId);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    function addTask(todolistId: string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todolistId]];
        setTasks({...tasks, [todolistId]: newTasks});
    }

    function changeStatus(todolistId: string,taskId: string, isDone: boolean) {
        let task = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone}: t);
        setTasks({...tasks, [todolistId]: task });
    }

    function changeFilter(todolistId: string,value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            {todolists.map((todo) => {
                let tasksForTodolist = tasks[todo.id];

                if (todo.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (todo.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={todo.id}
                        todoId={todo.id}
                        title={todo.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
