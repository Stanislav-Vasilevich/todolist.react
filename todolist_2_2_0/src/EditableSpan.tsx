import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  title: string
  changeItem: (title: string) => void
}

const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.title);

  const changeEditMode = () => {
    setEditMode(true);
  }

  const onBlurHandler = () => {
    setEditMode(false);
    props.changeItem(value);
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return editMode
    ? <input type="text" onChange={onChangeTitleHandler} onBlur={onBlurHandler} value={value} autoFocus/>
    : <span onDoubleClick={changeEditMode}>{value}</span>
};

export default EditableSpan;
