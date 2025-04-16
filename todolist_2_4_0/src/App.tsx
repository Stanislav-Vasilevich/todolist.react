import {useState, useReducer} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {NavButton} from './components/NavButton/NavButton';
import {paper} from './Todolist.styles';
import {createTheme, ThemeProvider, ThemeOptions} from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from './model/todolists-reducer';
import {
  changeTaskStatusAC,
  createTaskAC,
  deleteTaskAC,
  deleteTasksFromTodolistAC,
  tasksReducer
} from './model/tasks-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilteredTaskType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilteredTaskType
}
export type TasksType = {
  [key: string]: Array<TaskType>
}
type ThemeMode = 'dark' | 'light';

const todolist_1 = v1();
const todolist_2 = v1();

function App() {
  const initialStateTodolists: TodolistType[] = [
    {id: todolist_1, title: 'What to learn', filter: 'all'},
    {id: todolist_2, title: 'What to buy', filter: 'all'},
  ];
  const initialStateTasks: TasksType = {
    [todolist_1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JavaScript', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
      {id: v1(), title: 'PHP', isDone: false},
    ],
    [todolist_2]: [
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Meet', isDone: true},
      {id: v1(), title: 'Fish', isDone: false},
    ]
  }

  const [todolist, dispatchTodolist] = useReducer(todolistsReducer, initialStateTodolists);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialStateTasks);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const themeOptions: ThemeOptions = {
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  };
  const theme = createTheme(themeOptions);

  console.log('tasks[todolist_1]: ', tasks[todolist_1]);
  console.log('tasks[todolist_2]: ', tasks[todolist_2]);

  const filterTasks = (todolistId: string, filter: FilteredTaskType) => {
    dispatchTodolist(changeTodolistFilterAC({id: todolistId, filter}));
  }

  const createTask = (todolistId: string, title: string) => {
    dispatchTasks(createTaskAC({todolistId, title}));
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchTasks(deleteTaskAC({todolistId, taskId}));
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC({ todolistId, taskId, isDone }));
  }

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchTodolist(action);
    const action2 = deleteTasksFromTodolistAC(todolistId);
    dispatchTasks(action2);

    console.log('action2: ', action2);
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
    })
  }

  const createTodolist = (title: string) => {
    const newTodolistId = v1();
    const action = createTodolistAC(newTodolistId, title);

    dispatchTodolist(action);
    setTasks({...tasks, [action.payload.id]: []});
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    const action = changeTodolistTitleAC({id: todolistId, title});
    dispatchTodolist(action);
  }

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeProvider className="app" theme={theme}>
      <CssBaseline/>
      <AppBar position="static" sx={{mb: '30px'}}>
        <Toolbar>
          <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton color="inherit">
              <MenuIcon/>
            </IconButton>
            <Box>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color={'default'} onChange={changeMode}/>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth={'lg'}>
        <Grid sx={{mb: '30px'}}>
          <h1 className="title">Добавить новый todolist</h1>
          <AddItemForm minCharter={2} maxCharter={20} createItem={createTodolist}/>
        </Grid>

        <Grid container spacing={4}>
          {
            todolist.map(t => {
              let filteredTasks: TaskType[] = tasks[t.id];

              if (t.filter === 'active') {
                filteredTasks = tasks[t.id].filter(t => !t.isDone);
              }
              if (t.filter === 'completed') {
                filteredTasks = tasks[t.id].filter(t => t.isDone);
              }

              return (
                <Grid key={t.id}>
                  <Paper sx={paper}>
                    <Todolist
                      id={t.id}
                      title={t.title}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeTaskStatus={changeTaskStatus}
                      createTask={createTask}
                      filterTasks={filterTasks}
                      filter={t.filter}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App;
