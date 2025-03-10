import {FilteredTaskType} from '../../App';
import s from './FilterButtons.module.css';
import {useState} from 'react';

type PropsType = {
  filterTasks: (value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const FilterButtons = (props: PropsType) => {
  /* const buttonActiveAll = props.filter === 'all' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveActive = props.filter === 'active' ? `${s.button} ${s.active}` : s.button;
  const buttonActiveCompleted = props.filter === 'completed' ? `${s.button} ${s.active}` : s.button; */

  const onClickHandlerAll = () => props.filterTasks('all');
  const onClickHandlerActive = () => props.filterTasks('active');
  const onClickHandlerCompleted = () => props.filterTasks('completed');

  const onSelectChange = (e) => {
    let optionValue = e.target.value;

    if(optionValue === 'all') {
      onClickHandlerAll();
    }

    if(optionValue === 'active') {
      onClickHandlerActive();
    }

    if(optionValue === 'completed') {
      onClickHandlerCompleted();
    }
  }

  return (
    <div className={s.buttons}>
      {/* <button className={buttonActiveAll}
              onClick={onClickHandlerAll}>all</button>
      <button className={buttonActiveActive}
              onClick={onClickHandlerActive}>active</button>
      <button className={buttonActiveCompleted}
              onClick={onClickHandlerCompleted}>completed</button> */}

      <select className={s.select} onChange={onSelectChange} defaultValue={props.filter}>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
};

export default FilterButtons;
