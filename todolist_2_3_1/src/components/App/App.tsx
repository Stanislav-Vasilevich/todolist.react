import '../../App.css';
import {Todolist} from '../Todolist/Todolist';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import CssBaseline from '@mui/material/CssBaseline'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Container,
  Grid,
  Paper, Switch,
} from '@mui/material';
import {MenuButton} from '../MenuButton/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function MenuIcon() {
  return null;
}

function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const removeTask = (taskId: string, todolistId: string) => {
    const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
    setTasks(newTodolistTasks)
  }

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }

    const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
    setTasks(newTodolistTasks)
  }


  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
    }
    setTasks(newTodolistTasks)
  }

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    const newTodolists = todolists.map(tl => {
      return tl.id === todolistId ? {...tl, filter} : tl
    })
    setTodolists(newTodolists)
  }

  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(newTodolists)

    delete tasks[todolistId]
    setTasks({...tasks})
  }

  const addTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [todolistId]: []})
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
    }
    setTasks(newTodolistTasks)
  }

  const updateTodolist = (todolistId: string, title: string) => {
    const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
    setTodolists(newTodolists)
  }

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  });

  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Box>
          <AppBar position="static" sx={{marginBottom: '40px'}}>
            <Toolbar>
              <IconButton color="inherit">
                <MenuIcon/>
              </IconButton>
              <MenuButton color="inherit" background={theme.palette.primary.dark}>Login</MenuButton>
              <MenuButton color="inherit" background={theme.palette.primary.dark}>Logout</MenuButton>
              <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
              <Switch color={'default'} onChange={changeModeHandler} />
            </Toolbar>
          </AppBar>
        </Box>
        <Container maxWidth={'xl'}>
          <Grid container sx={{marginBottom: '40px'}}>
            <AddItemForm addItem={addTodolist}/>
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((tl) => {

              const allTodolistTasks = tasks[tl.id]
              let tasksForTodolist = allTodolistTasks

              if (tl.filter === 'active') {
                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
              }

              if (tl.filter === 'completed') {
                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
              }

              return (
                <Grid item key={tl.id}>
                  <Paper elevation={12} sx={{padding: '20px', borderRadius: '10px'}}>
                    <Todolist
                      todolistId={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      updateTask={updateTask}
                      updateTodolist={updateTodolist}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
