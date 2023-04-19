import React from 'react'
import { setCurrentUser } from '../../actions/actions'
import './UserModal.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserModal = ({closeModal}) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT'});
    dispatch(setCurrentUser(null))
}

  return (
    <div className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
              <p className="cursor-pointer" onClick={() => navigate('/user')}>User Account</p>
              <p className="cursor-pointer logout-btn" onClick={handleLogout}>Log Out</p>
        </div>
    </div>
  )
}

export default UserModal