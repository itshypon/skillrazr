export const setUser = (user) => {
    return {
      type: 'AUTH_USER',
      payload: user
    };
  }