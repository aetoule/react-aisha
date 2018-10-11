import axios from 'axios';

const initialState = {
    taskArray: [],
    task: {}
}

const GET_TASK_LIST = "GET_TASK_LIST";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const COMPLETED = "COMPLETED";

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${GET_TASK_LIST}_FULFILLED`:
            return {...state, taskArray: action.payload}
        case `${ ADD_TASK}_FULFILLED`:
            return {...state, task: action.payload}
        case `${DELETE_TASK}_FULFILLED`:
            return {...state, id: action.payload}
        case `${UPDATE_TASK}_FULFILLED`:
            return {...state, taskArray: action.payload}
        case `${COMPLETED}_FULFILLED`:
            return {...state, taskArray: action.payload}
        default: 
            return {...state}
    }
}

export function setTaskArray() {
    return {
        type: GET_TASK_LIST,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then(res => {
            return res.data
        })
    }
}

export function addTask(title) {
    return {
        type: ADD_TASK,
        payload: axios.post(`https://practiceapi.devmountain.com/api/tasks`,{title}).then( res => {
            return window.location.replace('/')
        })
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( res => {
            return window.location.replace('/')
        })
    }
}

export function updateTask(id, title, description) {
    return {
        type: UPDATE_TASK,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title, description}).then( res => {
            return window.location.replace('/')
        })
    }  
}

export function completed(id) {
    return {
        type: COMPLETED,
        payload: axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(res => {
            return window.location.replace('/')
        })
    }
}