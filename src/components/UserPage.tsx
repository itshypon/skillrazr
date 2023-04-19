import React from 'react'
import { useSelector } from 'react-redux'

const UserPage = () => {

    var user = useSelector((state: any) => state.currentUserReducer)
  
    return (
    <div className='user-page-container'>
        <img src={user?.photoURL} alt="avatar" />
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
    </div>
  )
}

export default UserPage