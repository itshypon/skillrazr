export const setUser = (user, dispatch) => {
  dispatch(setCurrentUser(user))  
  return {
      type: 'AUTH_USER',
      payload: user
    };
  }

export const setCurrentUser = (data) => {
  return{
      type: 'FETCH_CURRENT_USER',
      payload: data
  }
}