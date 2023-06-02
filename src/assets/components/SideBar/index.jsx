import {Link} from 'react-router-dom'
import './index.css'

const SideBar=()=>{
    return(
        <div className='sidebar-container'>
            <Link to="/contacts" className='sidebar-link'>Contact</Link>
            <Link to="/charts-and-maps" className='sidebar-link'>Charts And Maps</Link>
        </div>
    )
}
export default SideBar