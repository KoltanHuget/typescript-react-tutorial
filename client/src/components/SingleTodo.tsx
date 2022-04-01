import React, { useEffect, useRef, useState } from 'react'
import {Todo} from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'


interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos, index, setCompletedTodos}: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = async (current: Todo) => {
    let isCompleted: boolean = true
    await setTodos((old)=> {
      return old.filter((todo)=> {
        if (todo.id !== current.id) {
          return todo
        }
        console.log('todos')
        isCompleted = false
      })
    })
    await setCompletedTodos((old)=> {
      return old.filter((todo)=> {
        if (todo.id !== current.id) {
          return todo
        }
        console.log('completed')
        isCompleted = true
      })
    })
    if (isCompleted) {
      setTodos((prev)=> {
        return [...prev, current]
      })
    } else {
      setCompletedTodos((prev)=> {
        return [...prev, current]
      })
    }
    
      
    }
  

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo)=>{
      return todo.id !== id
    }))
    setCompletedTodos((old) => old.filter((todo)=>{
      return todo.id !== id
    }))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo)=>{
      return todo.id===id? {...todo, todo: editTodo} : todo
    }))
    setEdit(false);
  }

  useEffect(()=> {
    inputRef.current?.focus();
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot)=> (
        <form {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} 
        className={`todos_single ${snapshot.isDragging? "drag" : ""}`} 
        onSubmit={(e)=>handleEdit(e, todo.id)}>

        {edit ? (<input ref={inputRef} 
        type='input' 
        value={editTodo} 
        onChange={(e)=>setEditTodo(e.target.value)} 
        className='todos_single_text'/>) : (
            <span className='todos_single_text'>{todo.todo}</span>
          )
        }

        <div>
          <span className="icon" onClick={()=> {
            if (!edit && !todo.isDone) {
              setEdit(!edit)
            }
          }}>
            <AiFillEdit />
          </span>
          <span className="icon" onClick={()=>handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={()=>handleDone(todo)}>
            <MdDone />
          </span>
        </div>
      </form>
      )}
    
    </Draggable>
  )
}

export default SingleTodo