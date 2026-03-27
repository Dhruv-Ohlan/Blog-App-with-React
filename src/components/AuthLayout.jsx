import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { selectAuthStatus } from '../store/authSlice'

export default function Protected({ children, authentication = true}) {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(true);
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
      if(authentication && authStatus !== authentication){
        navigate('/login');
      }else if(!authentication && authStatus === authentication){
        navigate('/');
      }

      setLoader(false);
    }, [authStatus, navigate, authentication])
    

    return loader ? <h1>Loading...</h1> : <>{children}</> 
}