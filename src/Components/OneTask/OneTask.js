import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {setTaskArray, updateTask, deleteTask, completed} from '../../redux/reducer';

class OneTask extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            task: {},
         }
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        let currentTask = this.props.taskArray.find(task => task.id == taskId)

        this.setState({
            id: taskId
        })

        let taskKey = localStorage.getItem('taskKey');
        if (currentTask == undefined) {
            this.setState({
                task: JSON.parse(taskKey)
            })
        } else{
            localStorage.setItem('taskKey', JSON.stringify(currentTask));
            this.setState({
                task: currentTask
            })
        } 
    }

    handleTitleEdits = (e) => {
        this.setState({
            title: e
        })
    }

    handleDescriptionEdits = (e) => {
        this.setState({
            description: e
        })
    }

    handleComplete = (id) => {
        this.setState({
            completed: true
        })
        this.props.completed(id)
    }
    
    handleSave = (id, title, description) => {
        this.setState({
            id: id,
            title: title,
            description: description
        })
        this.props.updateTask(this.state.id,this.state.title, this.state.description)

    }
    
    handleCancel = () => {
        this.props.history.goBack()
    }

    handleDelete = (id) => {
        this.props.deleteTask(id)
    }
    
    render() { 
        return ( 
            <div>
                <button onClick={() => this.props.history.goBack()}>Back to Tasks</button>
                <p>Task</p>
                <input type="text" defaultValue={this.state.task.title} onChange={(e) => this.handleTitleEdits(e.target.value)}></input>
                <button onClick={() => this.handleComplete(this.state.task.id)}>Complete</button>
                <p>Description</p>
                <input type="text" defaultValue={this.state.task.description} onChange={(e) => this.handleDescriptionEdits(e.target.value)}></input>
                <button className="save" onClick={() => this.handleSave(this.state.task.id, this.state.task.title, this.state.task.description)}>Save</button>
                <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                <button className="delete" onClick={() => this.handleDelete(this.state.task.id)}>Delete</button>
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    const {taskArray, deleteTask, updateTask, completed} = state;
    console.log(state);
    return {
        taskArray,
        deleteTask,
        updateTask,
        completed
    }
}
export default connect (mapStateToProps, {setTaskArray, updateTask, deleteTask, completed}) (withRouter(OneTask));