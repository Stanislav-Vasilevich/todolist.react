import {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.css';

type PropsType = {
  title: string
  classes?: boolean
  isEdit?: boolean
  setEditMode?: (mode: boolean) => void
}

const EditableSpan: React.FC<PropsType> = ({classes, title, isEdit, setEditMode}) => {
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [value, setValue] = useState(title);

  const onEditMode = () => {
    setIsEditMode(true);

    if (setEditMode) {
      setEditMode(!isEdit);
    }
  };

  const offEditMode = () => {
    setIsEditMode(false);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const onEnterKeyPress = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      setIsEditMode(false);

      if (setEditMode) {
        setEditMode(!isEdit);
      }
    }
  }

  return (
    isEditMode
      ? <input onBlur={offEditMode} value={value} onChange={onChangeTitle} onKeyPress={onEnterKeyPress} autoFocus/>
      : <span className={classes ? `${s.title} ${s.active}` : s.title}
              onDoubleClick={onEditMode}>{value}</span>
  )
};

export default EditableSpan;
