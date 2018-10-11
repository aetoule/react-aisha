import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import './addTask.css';
import {connect} from 'react-redux';
import {addTask} from '../../redux/reducer';
import axios from 'axios';


class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',

        }
    }

    handleAddToDo = (e) => {
        this.setState({
            title: e
        })
    }

    handleSubmit = (title) => {   
        document.getElementById("add-task-form").reset();
    }

    render() { 
        const isEnabled = this.state.title.length > 0;
          
        return ( 
            <div className="add-task-form">
                <div className="todo-content">
                    <h1>TO-DO:</h1>
                    <form className="form-class" onSubmit={(e) => e.preventDefault()}>                 
                        <input className="input-line" type="text" onChange={(e) => this.handleAddToDo(e.target.value)}></input>
                        {
                            !isEnabled 
                            ?
                            <button className="add-button-disabled" onClick={() => this.props.addTask(this.state.title)} disabled={!isEnabled}>Add new To-do</button>
                            :
                            <button className="add-button-abled" onClick={() => this.props.addTask(this.state.title)} disabled={!isEnabled}>Add new To-do</button>
                        }
                    </form>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    const {title} = state;
    return (
        title
    )
}
 
export default connect (mapStateToProps, {addTask}) (AddTask);