import {FilterValuesType, TaskType} from '../App/App';
import s from './Todolist.module.css';
import Button from '../Button/Button';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  date?: string
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (id: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

const Todolist = ({
    title,
    tasks,
    filter,
    date,
    removeTask,
    changeFilter,
    addTask,
    changeStatus
  }: PropsType) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<null | string>(null);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }
  const addTaskHandler = () => {
    const valueTrim = value.trim();

    if(valueTrim === '') {
      setError("Title is required");
      return;
    }

    if(valueTrim.length < 2) {
      setError("Title is required");
      return;
    }

    addTask(valueTrim);
    setValue('');
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }
  const changeFilterHandler = (filter: FilterValuesType) => {
    changeFilter(filter);
  }

  return (
    <div>
      <h3 className={s.title}>{title}</h3>
      <div className={s.date}>{date}</div>
      <div className={s.inputBlock}>
        <input className={error ? `${s.error} ${s.input}` : s.input} onChange={changeValue} value={value} onKeyUp={onKeyPressHandler}/>
        <Button name={'+'} onClick={addTaskHandler}/>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
      <ul className={s.list}>
        {
          !tasks.length
            ? <div className={s.not}>-- no tasks --</div>
            : tasks.map(t => {
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatus(t.id, e.currentTarget.checked);
              }

              return (
                <li key={t.id} className={t.isDone ? s.hidden : ''}>
                  <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/> <span className={s.text}>{t.title}</span>
                  <button onClick={() => removeTask(t.id)}>X
                  </button>
                </li>
              )
            })
        }
      </ul>
      <div>
        <Button className={filter === 'all' ? 'active' : ''} name={'All'} onClick={() => changeFilterHandler('all')}/>
        <Button className={filter === 'active' ? 'active' : ''} name={'Active'} onClick={() => changeFilterHandler('active')}/>
        <Button className={filter === 'completed' ? 'active' : ''} name={'Completed'} onClick={() => changeFilterHandler('completed')}/>
      </div>
    </div>
  );
};

export default Todolist;
