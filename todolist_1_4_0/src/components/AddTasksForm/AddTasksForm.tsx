import {FormEvent, useState} from 'react';
import s from './AddTaskForm.module.css';

type PropsType = {
  createTask: (title: string) => void
}

const AddTasksForm: React.FC<PropsType> = ({createTask}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const updateTitle = (e) => {
    setTitle(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    if(title.trim().length < 2) {
      setError('min length 2 charset');
      return;
    }

    if(title.trim()) {
      createTask(title.trim());
      setError('');
    }
    setTitle('');
  }

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if(!value.length) {
      setError('');
    }
  }

  return (
    <div className={s.block}>
      <div className={title.length > 0 ? `${s.form} ${s.form_active}` : s.form}>
        <input className={error && title.length < 2 ? `${s.input} ${s.inputActive}` : s.input}
               onChange={updateTitle}
               onKeyPress={onClickEnter}
               value={title}
               placeholder={'max length 20 charters'}
               onInput={(e) => onInputChange(e)}
        />
        <button className={s.button} onClick={addTaskHandler} disabled={!title || title.length > 20}>+</button>
      </div>
      {(error && title.length < 2) ? <div className={s.errorText}>{error}</div> : ''}
      {(title.length <= 21 && title.length >= 2) && <div className={s.lengthText}>max length 21 charters</div>}
      {title.length > 21 && <div className={s.errorText}>max length 21 charters</div>}
    </div>
  );
};

export default AddTasksForm;
