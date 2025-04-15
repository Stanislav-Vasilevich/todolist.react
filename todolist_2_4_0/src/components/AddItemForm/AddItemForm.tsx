import {FormEvent, useState} from 'react';
import s from './AddItemForm.module.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox'

type PropsType = {
  todolistId?: string
  minCharter: number
  maxCharter: number
  createItem: (title: string, todolistId?: string) => void
}

const AddItemForm: React.FC<PropsType> = ({todolistId, createItem, minCharter, maxCharter}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const updateTitle = (e) => {
    console.log('e: ', e.currentTarget.value);

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

    if (todolistId && title.trim()) {
      createItem(title.trim(), todolistId);
      setError('');
    } else {
      createItem(title.trim());
    }

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
        <TextField
          label={(error && title.length < minCharter) && error}
          variant="standard"
          value={title}
          placeholder={'max length 20 charters'}
          onChange={updateTitle}
          onKeyPress={onClickEnter}
          error={error}
          helperText={error && 'enter valid text'}
        />
        <IconButton aria-label="delete">
          <AddBoxIcon onClick={addTaskHandler} disabled={!title || title.length > maxCharter}/>
        </IconButton>
      </div>
    </div>
  );
};

export default AddItemForm;
