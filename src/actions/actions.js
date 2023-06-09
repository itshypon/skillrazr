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

export const setAllInterns = (data) => {
  return{
    type: 'ALL_INTERNS',
    payload: data
  }
}

export const setInternPerformanceData = (data) => {
  return{
    type: 'INTERN_PERFORMANCE_DATA',
    payload: data
  }
}