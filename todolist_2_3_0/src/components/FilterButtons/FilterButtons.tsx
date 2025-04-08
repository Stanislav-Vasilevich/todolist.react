import {FilteredTaskType} from '../../App';
import s from './FilterButtons.module.css';
import {Button} from '@mui/material';

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
    <div className={s.buttons}>
      <Button variant={props.filter === 'all' ? 'contained' : "outlined"}
              color={props.filter === 'all' ? "secondary" : "primary"}
              size="small"
              disableElevation
              className={buttonActiveAll}
              onClick={onClickHandlerAll}>
        All
      </Button>
      <Button variant={props.filter === 'active' ? 'contained' : "outlined"}
              size="small"
              color={props.filter === 'active' ? "secondary" : "primary"}
              disableElevation
              className={buttonActiveActive}
              onClick={onClickHandlerActive}>
        Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'contained' : "outlined"}
              size="small"
              color={props.filter === 'completed' ? "secondary" : "primary"}
              disableElevation
              className={buttonActiveCompleted}
              onClick={onClickHandlerCompleted}>
        Completed
      </Button>
    </div>
  );
};

export default FilterButtons;
