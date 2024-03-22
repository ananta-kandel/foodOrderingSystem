import React from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const AuthHeader = () => {
  const authHeader = useAuthHeader()
  const headers = {
        'Authorization': authHeader
      }
  return (
    <>
   <p>{authHeader}</p>
    </>
  )
}

export default AuthHeader 