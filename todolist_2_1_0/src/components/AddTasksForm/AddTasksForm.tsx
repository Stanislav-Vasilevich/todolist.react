import {FormEvent, useState} from 'react';
import s from './AddTaskForm.module.css';

type PropsType = {
  todolistId: string
  minCharter: number
  maxCharter: number
  createTask: (todolistId: string, title: string) => void
}

const AddTasksForm: React.FC<PropsType> = ({todolistId, createTask, minCharter, maxCharter}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const updateTitle = (e) => {
    setTitle(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    if (title.trim().length < minCharter) {
      setError(`min length ${minCharter} charset`);
      return;
    }

    if (title.trim().length > maxCharter) {
      setError(`max length ${maxCharter} charters`);
      return;
    }

    if (title.trim()) {
      createTask(todolistId, title.trim());
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
    const value = e.currentTarget.value;

    if (!value.length) {
      setError('');
    }
  }

  return (
    <div className={s.block}>
      <div className={title.length > 0 ? `${s.form} ${s.form_active}` : s.form}>
        <input className={error && title.length < minCharter ? `${s.input} ${s.inputActive}` : s.input}
               onChange={updateTitle}
               onKeyPress={onClickEnter}
               value={title}
               placeholder={'max length 20 charters'}
               onInput={(e) => onInputChange(e)}
        />
        <button className={s.button} onClick={addTaskHandler} disabled={!title || title.length > maxCharter}>+</button>
      </div>
      {(error && title.length < minCharter) ? <div className={s.errorText}>{error}</div> : ''}
      {(title.length <= maxCharter && title.length >= minCharter) && <div className={s.lengthText}>max length ${maxCharter} charters. <span className={s.length}>Now: {title.length}</span></div>}
      {title.length > maxCharter && <div className={s.errorText}>max length ${maxCharter} charters <span className={s.lengthError}>Now: {title.length}</span></div>}
    </div>
  );
};

export default AddTasksForm;
