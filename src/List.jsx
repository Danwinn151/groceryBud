import React from 'react'
import {FaTrash, FaEdit} from 'react-icons/fa'
const List = ({list, deleteList, showAlert, editItem}) => {

  return (
    <div className='grocery-list'>
      {list.map(list => {
        const {id, title} = list;
        const deleteListHandler = (id) => {
         deleteList(id)
         showAlert(true, 'succesfully removed', "success")
    }
        return <article key={id} className='grocery-item'>
           <p className='title'>{title}</p>
           <div className='btn-container'>
            <button type='button' onClick={() => editItem(id)} className='edit-btn'>
              <FaEdit/>
            </button>
            <button type='button' onClick={() => deleteListHandler(id)}   className='delete-btn'>
              <FaTrash/>
            </button>
           </div>
        </article>
      })}
    </div>
  )
}

export default List