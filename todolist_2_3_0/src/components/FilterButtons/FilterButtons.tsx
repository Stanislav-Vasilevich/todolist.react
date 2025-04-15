import {FilteredTaskType} from '../../App';
import s from './FilterButtons.module.css';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';

type PropsType = {
  todolistId: string
  filterTasks: (todolistId: string, value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const FilterButtons = (props: PropsType) => {
  const buttonActiveAll = props.filter === 'all' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveActive = props.filter === 'active' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveCompleted = props.filter === 'completed' ? `${s.button} ${s.active}` : s.button;

  const onClickHandlerAll = () => props.filterTasks(props.todolistId, 'all');
  const onClickHandlerActive = () => props.filterTasks(props.todolistId, 'active');
  const onClickHandlerCompleted = () => props.filterTasks(props.todolistId, 'completed');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button variant={props.filter === 'all' ? 'outlined' : "text"}
              color={props.filter === 'all' ? "secondary" : "primary"}
              size="small"
              disableElevation
              className={buttonActiveAll}
              onClick={onClickHandlerAll}>All</Button>
      <Button variant={props.filter === 'active' ? 'outlined' : "text"}
              size="small"
              color={props.filter === 'active' ? "secondary" : "primary"}
              disableElevation
              className={buttonActiveActive}
              onClick={onClickHandlerActive}>Active</Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : "text"}
              size="small"
              color={props.filter === 'completed' ? "secondary" : "primary"}
              disableElevation
              className={buttonActiveCompleted}
              onClick={onClickHandlerCompleted}>Completed</Button>
    </Box>
  );
};

export default FilterButtons;
