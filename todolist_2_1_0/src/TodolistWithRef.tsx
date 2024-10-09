import React from "react"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (newFilter: FilterValuesType) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const inputRef = React.useRef<HTMLInputElement>(null)
    console.log(inputRef);

    const tasksList: JSX.Element = props.tasks.length === 0
        ? <div>Ваш список дел пуст</div>
        : <ul>
            {
                props.tasks.map((t: TaskType) => {
                    return (
                        <li>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <Button
                                title="x"
                                onClickHandler={() => props.removeTask(t.id)}
                            />
                        </li>
                    )
                })
            }
        </ul>

    const onClickAddTaskHandler = () => {
        if (inputRef.current) {
            if (inputRef.current.value.length < 15) {
                props.addTask(inputRef.current.value)
                inputRef.current.value = ""
            } else {
                alert("to long")
            }

        }
    }
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    ref={inputRef}
                    placeholder="max length title 15 charters"
                />
                <Button title="+" onClickHandler={onClickAddTaskHandler} />
                <div>Max length title is 15 characters</div>
            </div>
            {tasksList}
            <div>
                <Button
                    title="Все"
                    onClickHandler={() => props.changeFilter("all")}
                />
                <Button
                    title="В работе"
                    onClickHandler={() => props.changeFilter("active")}
                />
                <Button
                    title="Выполненные"
                    onClickHandler={() => props.changeFilter("completed")}
                />
            </div>
        </div>
    )
}