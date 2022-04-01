import { useState, useEffect } from 'react';
import TaskItem from './components/taskItem';

export default function App() {
  const [taskList, setTaskList] = useState(() => {
    const taskListLocal = localStorage.getItem('@task_list');
    if(taskListLocal) {
      return JSON.parse(taskListLocal);
    };

    return [];
  });

  const handlerAddTask = () => {
    let inputTaskPrompt = prompt('Write a Task');
    if(inputTaskPrompt !== '') {
      let createID = `${Math.floor(Math.random() * 10)}-${inputTaskPrompt.slice(0, 5)}`;
      taskList.push({ id: createID, taskTitle: inputTaskPrompt });
  
      setTaskList([...taskList]);
    }
  };
  const handlerUpdateTask = (taskData) => {
    let inputUpdateTask = prompt('Update Task', taskData.taskTitle);
    if(inputUpdateTask !== '') {
      let findIndex = taskList.findIndex((item) => item.id === taskData.id);
      taskList[findIndex].taskTitle = inputUpdateTask;

      setTaskList([...taskList]);
    };
  };
  const handlerDeleteTask = (taskID) => {
    let removeTaskById = taskList.filter((item) => item.id !== taskID);

    setTaskList(removeTaskById);
  };

  useEffect(() => {
    taskList.length > 0
      ? localStorage.setItem('@task_list', JSON.stringify(taskList))
      : localStorage.removeItem('@task_list');
  }, [taskList]);

  return (
    <div className='appContainer'>
      <h2 className='titleApp'> To-Do List </h2>
      <input
        type='button'
        className='addTaskBtn'
        value='Add Task'
        onClick={handlerAddTask}
      />
      <ul className='taskListContainer'>
        {
          taskList.length > 0
            ? taskList.map((item) => <TaskItem key={item.id} taskData={item} handlerUpdateTask={handlerUpdateTask} handlerDeleteTask={handlerDeleteTask} />)
            : <h3 className='noTask'> No tasks registered </h3>
        }
      </ul>
    </div>
  );
}