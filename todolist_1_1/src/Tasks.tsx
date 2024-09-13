import React from 'react';
import {DataType} from "./App";

const Tasks: React.FC<DataType> = (props) => {
	return (
		<div>
			<h2>{props.title}</h2>
			<ul>
				{
					props.tasks.map(t => {
						return (
							<li key={t.taskId}>
								<input type="checkbox" name={t.title} id={`${t.taskId}`} checked={t.isDone}/>
								<label htmlFor={`${t.taskId}`}>{t.title}</label>
							</li>
						)
					})
				}
			</ul>
			<h2>Students:</h2>
			<ul>
				{
					props.students.map((s, index) => <li key={index}>{s}</li>)
				}
			</ul>
		</div>
	);
};

export default Tasks;
