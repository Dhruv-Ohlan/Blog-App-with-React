import './App.css'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import { login , logout } from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  // every time the app loads, we will check if the user is logged in or not, and then set the loading state to false
  // It is a good practice to check if the user is logged in or not, before rendering the app, because we don't want to render the app if the user is not logged in, and then redirect them to the login page, because it will cause a flicker effect, and it will also cause a bad user experience.

  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
    
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
