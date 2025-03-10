import {useState} from 'react';
import s from './AddTaskForm.module.css';

type PropsType = {
  createTask: (title: string) => void
}

const AddTasksForm: React.FC<PropsType> = ({createTask}) => {
  const [title, setTitle] = useState('');

  const updateTitle = (e) => {
    setTitle(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    createTask(title);
    setTitle('');
  }

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }

  return (
    <div className={s.block}>
      <div className={title.length > 0 ? `${s.form} ${s.form_active}` : s.form}>
        <input className={s.input}
               onChange={updateTitle}
               onKeyPress={onClickEnter}
               value={title}
               placeholder={'10 charters max length'}
        />
        <button className={s.button} onClick={addTaskHandler} disabled={!title || title.length > 10}>+</button>
      </div>
      {(title.length <= 21 && title.length > 0) && <div className={s.lengthText}>21 charters max length</div>}
      {title.length > 21 && <div className={s.errorText}>21 charters max length</div>}
    </div>
  );
};

export default AddTasksForm;
