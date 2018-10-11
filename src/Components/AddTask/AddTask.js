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
            // taskArray: [],
            title: '',

        }
    }

    handleAddToDo = (e) => {
        console.log('this should be the title input content', e)
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
            <div>
                <h1>TO-DO:</h1>
                <form className="add-task-form" onSubmit={(e) => e.preventDefault()}>                 
                    <input className="input-line" type="text" onChange={(e) => this.handleAddToDo(e.target.value)}></input>
                    <button onClick={() => this.props.addTask(this.state.title)} disabled={!isEnabled}>Add new To-do</button>
                </form>
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