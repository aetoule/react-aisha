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
                        <div className="title-complete-x-btn">
                            <strike><p className="todo-title">{task.title}</p></strike>
                            <div className="complete-and-x-btn">
                                <button className="complete-btn-grayed" disabled={true}>Complete</button>
                                <button className="delete-btn-x" onClick={() => this.handleDelete(task.id)}>X</button>
                            </div>
                        </div>
                        :
                        <div className="title-complete-x-btn">
                            <p className="todo-title">{task.title}</p>
                            <div className="complete-and-x-btn">
                                <button className="complete-btn" onClick={() => this.props.completed(task.id)}>Complete</button>
                                <button className="delete-btn-x" onClick={() => this.handleDelete(task.id)}>X</button>
                            </div>
                        </div>
                        }
                        
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
export default connect (mapStateToProps, {setTaskArray, deleteTask, completed}) (TaskList);