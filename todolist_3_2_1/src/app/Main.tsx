import Grid from '@mui/material/Grid2';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm';
import Paper from '@mui/material/Paper';
import {TodolistItem} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem';
import Container from '@mui/material/Container';
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC, FilterValues
} from '@/features/todolists/model/todolists-reducer';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/features/todolists/model/tasks-reducer';
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {selectTodolists} from '@/features/todolists/model/todolists-selectors';
import {selectTasks} from '@/features/todolists/model/tasks-selectors';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import Todolists from '@/features/todolists/ui/Todolists/Todolists';

const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title));
  }

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{mb: '30px'}}>
        <CreateItemForm onCreateItem={createTodolist}/>
      </Grid>
      <Grid container spacing={4}>
        <Todolists/>
      </Grid>
    </Container>
  );
};

export default Main;
