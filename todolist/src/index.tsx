import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

/* <React.StrictMode> — это инструмент в React, который активирует дополнительные проверки и предупреждения для обнаружения потенциальных проблем в вашем приложении. Он помогает выявить устаревший код, небезопасные методы жизненного цикла и неожиданные побочные эффекты. Строгий режим работает только в режиме разработки и не влияет на сборку. */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

