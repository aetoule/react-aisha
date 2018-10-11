import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTask from '../AddTask/AddTask';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <AddTask />
                <TaskList />
            </div>
         );
    }
}
 
export default Home;
