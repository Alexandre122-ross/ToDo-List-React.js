import { useState, useEffect, useRef } from 'react';
import { BsCheckCircle, BsTrash } from 'react-icons/bs';
// Style
import './modalStyle.css';

export default function ModalTask({ modalShow, modalData, handlerModalHidden, handlerAddTaskList, handlerUpdateTaskList, handlerCheckTask, handlerDeltedTask }) {
  const [inputTitleTask, setInputTitleTask] = useState(modalData.titleTask);
  const [descriptionTask, setDescriptionTask] = useState(modalData.descriptionTask);
  const modalRef = useRef(null);

  const handlerActionModal = () => {
    if (handlerUpdateTaskList) {
      handlerUpdateTaskList(modalData.id, inputTitleTask, descriptionTask);
    } else {
      handlerAddTaskList(inputTitleTask, descriptionTask);
    };

    handlerModalHidden();
  }

  useEffect(() => {
    function clickOutSideDetect(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handlerModalHidden();
      };
    }

    document.addEventListener('click', clickOutSideDetect);

    return () => document.removeEventListener('click', clickOutSideDetect);
  }, []);

  return (
    <div className='modalWrapper' style={{ display: modalShow && 'flex' }}>
      <div className='modalContainer' ref={modalRef}>
        <div className='headerModal'>
          <h2> {handlerUpdateTaskList ? 'Update' : 'Register'} Task </h2>
        </div>
        <div className='sectionModal'>
          <div className='quickActionContainer'>
            <BsCheckCircle 
              style={{ color: modalData.completedTask && '#26DBFF' }}
              className='iconQuickAction'
              onClick={() => handlerCheckTask(modalData.id)}  
            />
            <BsTrash 
              className={`iconQuickAction ${handlerUpdateTaskList && 'iconQuickActive'}`} 
              onClick={() => handlerUpdateTaskList && handlerDeltedTask(modalData.id)}
            />
          </div>
          <div className='inputDataContainer'>
            <span style={{ color: inputTitleTask !== '' && '#00b4d8', top: inputTitleTask !== '' && 0 }}>
              Title Task
            </span>
            <div className='borderInputActive' style={{ width: inputTitleTask !== '' && '100%' }} />
            <input
              type='text'
              className='inputData'
              value={inputTitleTask}
              onChange={(e) => setInputTitleTask(e.target.value)}
            />
          </div>
          <div className='inputDataContainer descriptionContainer'>
            <span style={{ color: descriptionTask !== '' && '#00b4d8', top: descriptionTask !== '' && 0 }}>
              Description Task
            </span>
            <div className='borderInputActive' style={{ width: descriptionTask !== '' && '100%' }} />
            <textarea
              className='descriptionTask'
              value={descriptionTask}
              onChange={(e) => setDescriptionTask(e.target.value)}
            />
          </div>
          {
            inputTitleTask !== ''
              ? <button type='button' className='actionModal' onClick={handlerActionModal}> {handlerUpdateTaskList ? 'Update' : 'Add'} </button>  
              : <button type='button' className='actionModal' disabled> {handlerUpdateTaskList ? 'Update' : 'Add'} </button>  
          }
        </div>
      </div>
    </div>
  );
}
