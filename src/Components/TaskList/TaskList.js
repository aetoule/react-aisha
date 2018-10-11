import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setTaskArray, deleteTask, completed} from '../../redux/reducer';
import {Link} from 'react-router-dom';
import './TaskList.css';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        console.log('hi')
        this.props.setTaskArray()
    }
    handleDelete = (id) => {
        this.props.deleteTask(id)
    }
    render() { 
        let mappedTasks = this.props.taskArray.map((task, i) => {
            return (
                <Link to={`/task/${task.id}`}>
                    <div className="one-task-container">
                        {task.completed
                        ?
                        <div>
                            <strike><p>{task.title}</p></strike>
                            <button className="complete-btn-grayed" >Complete</button>
                        </div>
                        :
                        <div>
                            <p>{task.title}</p>
                            <button className="complete-btn" onClick={() => this.props.completed(this.task.id)}>Complete</button>
                        </div>
                        }
                        <button className="delete-btn-x" onClick={() => this.handleDelete(task.id)}>XX</button>
                    </div>
                </Link>
            )
        })
        return ( 
            <div>
                {mappedTasks}
            </div>
         );
    }
}

const mapStateToProps = state => {
    const {taskArray, deleteTask, completed} = state;
    console.log(state);
    return {
        taskArray,
        deleteTask,
        completed
    }
}
// // export default TaskList;
export default connect (mapStateToProps, {setTaskArray, deleteTask, completed}) (TaskList);