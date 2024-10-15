import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
  addItem: (value: string) => void
}

const AddItemForm = ({addItem}: PropsType) => {
  const [error, setError] = useState<string | null>(null)
  const [taskTitle, setTaskTitle] = useState('')

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addItemHandler = (value: string) => {
    if (taskTitle.trim() !== '') {
      addItem(value.trim())
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (event.key === 'Enter') {
      addItemHandler(taskTitle)
    }
  }

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button title={'+'} onClick={() => addItemHandler(taskTitle)}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};

export default AddItemForm;
