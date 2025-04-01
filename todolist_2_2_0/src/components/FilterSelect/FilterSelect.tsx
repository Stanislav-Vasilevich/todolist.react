import {FilteredTaskType} from '../../App';
import s from './FilterSelect.module.css';

type PropsType = {
  todolistId: string
  filterTasks: (todolistId: string, value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const FilterSelect = (props: PropsType) => {
  const onClickHandlerAll = () => props.filterTasks(props.todolistId, 'all');
  const onClickHandlerActive = () => props.filterTasks(props.todolistId, 'active');
  const onClickHandlerCompleted = () => props.filterTasks(props.todolistId, 'completed');

  const onSelectChange = (e) => {
    let optionValue = e.target.value;

    if (optionValue === 'all') {
      onClickHandlerAll();
    }

    if (optionValue === 'active') {
      onClickHandlerActive();
    }

    if (optionValue === 'completed') {
      onClickHandlerCompleted();
    }
  }

  return (
    <div className={s.buttons}>
      <select className={s.select} onChange={onSelectChange} defaultValue={props.filter}>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
};

export default FilterSelect;

