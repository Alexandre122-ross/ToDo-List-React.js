import { useState, useEffect } from 'react';
// components
import TaskItem from './components/taskCardItem';
import ModalTask from './components/modal';

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const [taskList, setTaskList] = useState(() => {
    const taskListLocal = localStorage.getItem('@task-list');
    if(taskListLocal) {
      return JSON.parse(taskListLocal);
    };

    return [];
  });

  // Modal Action
  const handlerModalShow = () => setModalShow(true);
  const handlerModalHidden = () => setModalShow(false);
  // Action TaskList
  const handlerAddTaskList = (titleTask, descriptionTask) => {
    const generetedId = `${Math.floor(Math.random() * 10)}-${titleTask.slice(0, 5)}`;
    taskList.push({ id: generetedId, titleTask, descriptionTask });

    setTaskList([...taskList]);
  };
  const handlerUpdateTaskList = (IdTask, titleTask, descriptionTask) => {
    const findIndex = taskList.findIndex((item) => item.id === IdTask);
    taskList[findIndex].titleTask = titleTask;
    taskList[findIndex].descriptionTask = descriptionTask;
    
    setTaskList([...taskList]);
  };
  const handlerCheckTask = (idTask) => {
    const findIndex = taskList.findIndex((item) => item.id === idTask);
    taskList[findIndex].completedTask = !taskList[findIndex].completedTask;

    setTaskList([...taskList]);
  }
  const handlerDeltedTask = (idTask) => {
    console.log(idTask)
    const removeById = taskList.filter((item) => item.id !== idTask);

    setTaskList(removeById);
  }

  useEffect(() => {
    taskList.length > 0
      ? localStorage.setItem('@task-list', JSON.stringify(taskList))
      : localStorage.removeItem('');
  }, [taskList]);

  return (
    <div className='appWrapper'>
      {
        modalShow &&
        <ModalTask
          modalShow={modalShow}
          modalData={{
            id: 0,
            titleTask: '',
            descriptionTask: '',
          }}
          handlerModalHidden={handlerModalHidden}
          handlerAddTaskList={handlerAddTaskList}
        />
      }
      <h1 className='titleToDos'> To-Do List </h1>
      <button type='button' className='registerNewTaskBtn' onClick={handlerModalShow}>
        Register new task
      </button>
      <ul className='taskList'>
        {
          taskList.length > 0
            ? taskList.map((item) => 
              <TaskItem 
                key={item.id} 
                taskData={item} 
                handlerUpdateTaskList={handlerUpdateTaskList} 
                handlerCheckTask={handlerCheckTask}
                handlerDeltedTask={handlerDeltedTask}
              />
            )
            : <h2 className='noTask'> No tasks registered </h2>
        }
      </ul>
    </div>
  );
}