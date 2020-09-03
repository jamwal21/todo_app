import React, { useState,useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core'
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  heading:{
    textAlign: 'center'
  },
  form:{
    display:'flex',
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent:'center'
  },

}))

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('')

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))) 
    })
  },[]) 

  const addTodo = (event)=>{
    event.preventDefault()  
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <h1 className={classes.heading}>Todo App</h1>
      <form className={classes.form}>   
        <FormControl style={{marginRight:10}}>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button 
        type='submit' 
        size="small"
        onClick={addTodo} 
        variant="contained" 
        color="primary"
        disabled={!input} >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo)=>(
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
