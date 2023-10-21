import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import  authService from './appwrite/auth'
import {login ,logout} from './store/authSlice'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()
useEffect(() => {
  authService.getCurrentUser()
  .then((userData)=>{
    if (userData){
dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  .catch((error)=>{console.log(error)})
  .finally(()=>setLoading(false))
}, [])

  return !loading?(
    <>
    <div className="min-h-screen flex flex-wrap bg-gray-900">
      <div className="w-full block">

    <Header/>
    <main>
    login
    </main>
    <Footer/>
      </div>
    </div>
    </>
  ):null //assignment
}

export default App
