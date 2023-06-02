import { useSelector,useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import SideBar from "../SideBar";
import { deleteContact } from "../../../ContactReducer";
import {MdCancel} from 'react-icons/md'
import './index.css'

const Home=()=>{
    const contactsList=useSelector((state)=>state.contacts)
    console.log(contactsList)
    const dispatch=useDispatch()
   
    const onDelete=(contact)=>{
        dispatch(deleteContact(contact))
    }

    const renderNoContactsView=()=>(
        <div className="no-contacts-container">
             <div>
            <MdCancel className="cancel-icon"/><br/>
            <p>No Contact Found Please add contact from Create Contact Button</p>
            </div>
           
        </div>
    )

    return(
        <div className="display-column">
            <div className="contacts-header">
                <h2>Contact Page</h2>
            </div>
        <div className="home-container">
            <SideBar/>
            <div style={{textAlign:'center'}}> 
                <Link to="/create-contact" className="create-link"  ><button type="button" className="create-btn" >Create Contact</button></Link>
                {
                    contactsList.length===0? renderNoContactsView() :
                <ul className="contact-items-container">
                    {
                        contactsList.map(contact=><li key={contact.id} className="contact-item">
                            <p>Full Name: {contact.fname} {contact.lname} </p>
                            <p>Status: {contact.status}</p>
                            <Link to={`/edit-contact/${contact.id}`} contactDetails={contact}><button type="button" className="edit-btn">Edit</button></Link>
                            <button type="button" className="del-btn" onClick={()=>onDelete(contact)}>Delete</button>
                        </li>)
                    }
                </ul>
                }
            </div>
        </div>
        </div>
    )
}
export default Home