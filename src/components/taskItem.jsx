import { BsTrash } from 'react-icons/bs';
import './taskItem.css';

const TaskItem = ({ taskData, handlerUpdateTask, handlerDeleteTask }) => (
  <div className='taskItem'>
    <div className='taskFlag' onClick={() => handlerUpdateTask(taskData)}/>
    <h3> {taskData.taskTitle} </h3>
    <BsTrash className='iconRemovedTask' onClick={()=> handlerDeleteTask(taskData.id)} />
  </div>
)

export default TaskItem;