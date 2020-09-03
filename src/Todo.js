import React,{useState} from 'react'
import { List, ListItem, ListItemText,Modal, Button, FormControl, InputLabel, Input } from '@material-ui/core'
import db from './firebase'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
      position: 'absolute',
      maxWidth: 400,
      minWidth: 200,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    list:{
        display: 'flex',
        width:'50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
    },
    textContainer:{
        border: '2px solid #C2185B',
        borderRadius:5,
        wordWrap:'break-word',
        minWidth:170,
        marginRight:10,
        padding:3
    },
    form:{
        display:'flex',
      },
  }));

function Todo({todo}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const updateTodo = ()=>{
        db.collection('todos').doc(todo.id).set({
            todo: input
        },{ merge: true })
        setOpen(false)
    }

    return (
        <>
        <Modal className={classes.modal} open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <form className={classes.form}>
                    <FormControl style={{marginRight:10}}>
                        <InputLabel>Update your Todo</InputLabel>
                        <Input value={input} onChange={event => setInput(event.target.value)} />
                    </FormControl>
                    <Button type='submit'  color="secondary" variant="contained" onClick={updateTodo}>Update</Button>
                </form>
            </div>
        </Modal>
        <List className={classes.list}>
            <ListItem className={classes.textContainer}>
                <ListItemText primary={todo.todo} secondary="Todo" />
            </ListItem>
            <Button 
            color="secondary" 
            variant="contained" 
            onClick={e => {
                setInput(todo.todo);
                setOpen(true)
            }}>Edit</Button>
            <DeleteOutlineIcon style={{fontSize:35}} onClick={event => db.collection('todos').doc(todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo
