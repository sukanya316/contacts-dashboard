import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addContact } from '../../../ContactReducer'
import SideBar from '../SideBar'
import './index.css'

const CreateContact=(props)=>{
    console.log(props)
    const contactsList=useSelector((state)=>state.contacts)
    const [createBtn,setCreateBtn]=useState(true)
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [status,setStatus]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const submitContact=(event)=>{
        event.preventDefault()
        const contactDetails={id:contactsList.length,fname,lname,status}
        dispatch(addContact(contactDetails))
        setFname('')
        setLname('')
        setStatus('');
        console.log(status);
       navigate("/contacts");
    }
    return(
        <div className='display-column'>
              <div className="contacts-header">
                <h2>Contact Page</h2>
            </div>
        <div className='home-container'>
            <SideBar/>
             <div className="create-contact-container">
                <h2>Create Contact</h2>
             <form className="form-container" onSubmit={submitContact}>
                        <div>
                        <label htmlFor="firstname">First Name: </label>
                        <input type="input" id="firstname" value={fname} onChange={(event)=>setFname(event.target.value)} />
                        </div>
                        <div>
                        <label htmlFor="lastname">Last Name: </label>
                        <input type="input" id="lastname" value={lname} onChange={(event)=>setLname(event.target.value)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <p style={{width:'70px'}}>Status: </p>
                        <div >
                        <input type="radio" name="status" value="Active" id="active" onChange={(event)=>setStatus(event.target.value)}/>
                        <label htmlFor="active" >Active</label>
                        <br/>
                        <input type="radio" name="status" value="InActive" id="in-active" onChange={(event)=>setStatus(event.target.value)}/>
                        <label htmlFor="in-active">InActive</label>
                        </div>
                        </div>
                        <button type="submit">Save Contact</button>
                    </form>
                    </div>
        </div>
        </div>
    )
}
export default CreateContact