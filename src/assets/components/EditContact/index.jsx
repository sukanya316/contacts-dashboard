import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {saveEditedDetails} from "../../../ContactReducer";
import SideBar from '../SideBar'
import './index.css'

const EditContact=()=>{
    const contactId=useParams()
    const contactList=useSelector((state)=>state.contacts)
    const dispatch=useDispatch()
    const contactDetails=contactList[contactId.id]
    const {id,fname,lname,status}=contactDetails
    const [editFname,setEditFname]=useState(fname)
    const [editLname,setEditLname]=useState(lname)
    const [editStatus,setEditStatus]=useState(status)
    const navigate=useNavigate()
    const submitEditedDetails=(event)=>{
        event.preventDefault()
        dispatch(saveEditedDetails({id,fname:editFname,lname:editLname,status:editStatus}))
        navigate('/contacts')
    }
    return(
        <div className='display-column'>
              <div className="contacts-header">
                <h2>Contact Page</h2>
            </div>
        <div className='edit-contact-container'>
            <SideBar/>
            <div className='edit-form-container'>
                <h2>Edit Contact Details</h2>
            <form className="form-container" onSubmit={submitEditedDetails}>
                        <div>
                        <label htmlFor="firstname">First Name: </label>
                        <input type="input" id="firstname" value={editFname} onChange={(event)=>setEditFname(event.target.value)} />
                        </div>
                        <div>
                        <label htmlFor="lastname">Last Name: </label>
                        <input type="input" id="lastname" value={editLname} onChange={(event)=>setEditLname(event.target.value)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <p style={{width:'70px'}}>Status: </p>
                        <div>
                        <input type="radio" name="status" value="Active" id="active" checked={'Active'===editStatus} onChange={(event)=>setEditStatus(event.target.value)}/>
                        <label htmlFor="active" >Active</label>
                        <br/>
                        <input type="radio" name="status" value="InActive" id="in-active" checked={'InActive'===editStatus} onChange={(event)=>setEditStatus(event.target.value)}/>
                        <label htmlFor="in-active">InActive</label>
                        </div>
                        </div>
                        <button type="submit">Save Edited Contact</button>
                    </form>
                    </div>
        </div>
        </div>
    )
}
export default EditContact
