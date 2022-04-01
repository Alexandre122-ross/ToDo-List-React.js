import { useState } from 'react';
// 
import ModalTask from '../modal';
// Style
import './taskItem.css';

const TaskItem = ({ taskData, handlerUpdateTaskList, handlerCheckTask, handlerDeltedTask }) => {
  const [modalShow, setModalShow] = useState(false);

  // Modal Action
  const handlerModalShow = () => setModalShow(true);
  const handlerModalHidden = () => setModalShow(false);

  return (
    <li className='taskCardItem' style={{ textDecoration: taskData.completedTask && 'line-through' }}>
      {
        modalShow &&
        <ModalTask
          modalShow={modalShow}
          modalData={taskData}
          handlerModalHidden={handlerModalHidden}
          handlerUpdateTaskList={handlerUpdateTaskList}
          handlerCheckTask={handlerCheckTask}
          handlerDeltedTask={handlerDeltedTask}
        />
      }
      <div className='taskCardFlag' onClick={handlerModalShow}/>
      <div className='dataTask'>
        <h3 className='titleTask'>
          {taskData.titleTask}
        </h3>
        <p>
          {taskData.descriptionTask}
        </p>
      </div>
    </li>
  )
}

export default TaskItem;