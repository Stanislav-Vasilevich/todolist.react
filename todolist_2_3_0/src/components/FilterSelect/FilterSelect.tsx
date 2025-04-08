import {FilteredTaskType} from '../../App';
import s from './FilterSelect.module.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
      <FormControl fullWidth  sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          onChange={onSelectChange} defaultValue={props.filter}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={'all'}
          label="All"
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelect;

