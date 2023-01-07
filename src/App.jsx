import {useState, useEffect} from 'react'
import List from './List'
import Alert from './Alert'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "localstoragekey"


const getLocalstorage = () => {
  const list = localStorage.getItem(LOCAL_STORAGE_KEY)
  if(list){
    return JSON.parse(list)
  }
  else {
    return [] 
  }
} 

function App() {

 
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalstorage())
  const [isEditing, setIsEditing] = useState(false)
  const[editID, setEditId] = useState(null)
  const [alert, setAlert] = useState({
      show:false, 
      msg: "", 
      type: ""
    }) 
const handleSubmit = (e) => {
  e.preventDefault()
  if(!name){
   showAlert(true, "Please input your value",  "danger")
  }
  else if(name && isEditing){
     const editedItems = list.map(item => {
      if(item.id === editID){
        return {...item, title:name}
      }
      return item
     })
     setList(editedItems)
     setName("")
     setIsEditing(false)
     setEditId(null)
     showAlert(true, "item edited", "success")
  }
  else{
    showAlert(true, "successfully added", "success")
    const newItems = {id: uuidv4(), title:name }
    setList([...list, newItems])
    setName('')
  } 
   
}
//store item in the browser
useEffect(() => {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
}, [list])
//clearList Functionalty
const clearList = () => {
  showAlert(true, "empty List", "danger")
  setList([])
}
const deleteList = (id) => {
  setList(list.filter(item => item.id !== id))
  
}

const editItem = (id) => {
  const specificItem = list.find(item => item.id === id);
  setIsEditing(true)
  setEditId(id)
  setName(specificItem.title)  
}
//showAlert functionality
const showAlert = (show=false, msg, type) => {
    setAlert({
      show: show,
      msg: msg,
      type: type   
    })
}   
return (
    <section className="section-center">
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert list={list} removeAlert={showAlert} {...alert} /> }
       <h3>grocery bud</h3>
       <div className='form-control'>
          <input type={'text'} className='grocery' value={name} onChange={(e) => setName(e.target.value)} placeholder='eggs'/>
       <button type='submit' className='submit-btn'>
            {isEditing ? 'edit ' : 'Submit'}
       </button>
       </div>
       
    </form>
    {list.length > 0 &&
    <div className='grocery-container'>
      <List list={list} editItem={editItem} showAlert={showAlert} deleteList={deleteList}/>
      <button className='clear-btn' onClick={clearList}>clear items</button>
       
      </div> 
    }
      
    </section>
  )
}

export default App