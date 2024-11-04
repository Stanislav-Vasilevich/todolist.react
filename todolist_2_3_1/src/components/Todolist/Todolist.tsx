import {FilterValuesType, TaskType} from '../App/App';
import {ChangeEvent} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Box, Button, Checkbox, Grid, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {getListItemXs, styles} from './Todolist.styles';

type PropsType = {
  title: string
  todolistId: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist
  } = props

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const addTaskCallback = (title: string) => {
    addTask(title, props.todolistId)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolist(props.todolistId, title)
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler}/>
        </h3>
        <Button title={'x'} onClick={removeTodolistHandler}/>
      </div>
      <div className="input">
        <AddItemForm addItem={addTaskCallback}/>
      </div>
      {
        tasks.length === 0
          ? <p>Тасок нет</p>
          : <Grid container spacing={4} style={{width: '100%', margin: '0', padding: '0'}}>
            <List sx={{width: '100%'}}>
              {tasks.map((task) => {

                const removeTaskHandler = () => {
                  removeTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

                const changeTaskTitleHandler = (title: string) => {
                  updateTask(todolistId, task.id, title)
                }

                return (
                  <Grid item>
                    <ListItem key={task.id}
                              sx={getListItemXs(task.isDone)}>
                      <div>
                        <Checkbox defaultChecked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                      </div>
                      <IconButton onClick={removeTaskHandler} aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                    </ListItem>
                  </Grid>
                )
              })}
            </List>
          </Grid>
      }
      <Box sx={styles}>
        <Button variant={'outlined'} color={filter === 'all' ? 'primary' : 'inherit'} title={'All'}
                onClick={() => changeFilterTasksHandler('all')}>All</Button>
        <Button variant={'outlined'} color={filter === 'active' ? 'primary' : 'inherit'} title={'Active'}
                onClick={() => changeFilterTasksHandler('active')}>Active</Button>
        <Button variant={'outlined'} color={filter === 'completed' ? 'primary' : 'inherit'} title={'Completed'}
                onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
      </Box>
    </div>
  )
}
