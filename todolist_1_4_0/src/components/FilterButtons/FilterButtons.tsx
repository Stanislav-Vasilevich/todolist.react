import {FilteredTaskType} from '../../App';
import s from './FilterButtons.module.css';

type PropsType = {
  filterTasks: (value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const FilterButtons = (props: PropsType) => {
  const buttonActiveAll = props.filter === 'all' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveActive = props.filter === 'active' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveCompleted = props.filter === 'completed' ? `${s.button} ${s.active}` : s.button;

  const onClickHandlerAll = () => props.filterTasks('all');
  const onClickHandlerActive = () => props.filterTasks('active');
  const onClickHandlerCompleted = () => props.filterTasks('completed');

  return (
    <div className={s.buttons}>
      <button className={buttonActiveAll}
              onClick={onClickHandlerAll}>all
      </button>
      <button className={buttonActiveActive}
              onClick={onClickHandlerActive}>active
      </button>
      <button className={buttonActiveCompleted}
              onClick={onClickHandlerCompleted}>completed
      </button>
    </div>
  );
};

export default FilterButtons;
