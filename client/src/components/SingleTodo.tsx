import React from 'react'
import {Todo} from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import './styles.css'

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {

  const handleDone = (id: number) => {
    setTodos(todos.map((todo)=>{
      if (todo.id === id) {
        return {...todo, isDone: !todo.isDone}
      }
      return todo
    }))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo)=>{
      return todo.id !== id
    }))
  }

  return (
    <form className="todos_single">
      {todo.isDone ? (
        <s className='todos_single_text'>{todo.todo}</s>
      ) : (
        <span className='todos_single_text'>{todo.todo}</span>
      )}

      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon" onClick={()=>handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={()=>handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo