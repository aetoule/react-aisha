import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {setTaskArray, updateTask, deleteTask, completed} from '../../redux/reducer';

class OneTask extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            task: {},
            // id: 0,
            // title: 'hi from state title',
            // description: 'hi from state description',
            // completed: false
         }
    }

    componentDidMount() {
        console.log('this.props ', this.props)
        console.log('this.props.taskArray ', this.props.taskArray)

        const taskId = this.props.match.params.id;
        console.log('should print the id of the task ', taskId)
        let currentTask = this.props.taskArray.find(task => task.id == taskId)
        this.setState({
            id: taskId
        })
        // localStorage.setItem('taskKey', JSON.stringify(currentTask));
        let taskKey = localStorage.getItem('taskKey');
        console.log('taskKey ', taskKey)


        console.log('plz log current task', currentTask)
        console.log('this.props.taskArray ', this.props.taskArray)
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
    // navigate user back to home
    handleComplete = (id) => {
        this.setState({
            completed: true
        })
        this.props.completed(id)
    }
    
    // save changes then navigate user back to home
    handleSave = (id, title, description) => {
        this.setState({
            id: id,
            title: title,
            description: description
        })
        this.props.updateTask(this.state.id,this.state.title, this.state.description)

    }
    
    // set the input fields' values back to their original value
    handleCancel = () => {
        this.props.history.goBack()
    }

    // navigate user back to home
    handleDelete = (id) => {
        this.props.deleteTask(id)
    }
    

    render() { 

        return ( 
            <div>
                <button onClick={() => this.props.history.goBack()}>Back to Tasks</button>
                <p>Task</p>
                {/* <h1>{this.state.task.title !== undefined ? this.state.task.title : null}</h1> */}
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
// // export default TaskList;
export default connect (mapStateToProps, {setTaskArray, updateTask, deleteTask, completed}) (withRouter(OneTask));