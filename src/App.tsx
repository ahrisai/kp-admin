import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './GlobalStyles'
import AppRouter from './components/AppRouter'
import Loader from './components/Loader'
import { RootState, useAppDispatch } from './redux'
import { checkUserIsAuth, setPendingForCheck } from './redux/usersSlice'
import { useSelector } from 'react-redux'

function App() {
  
  const token=Cookies.get('token')
  const dispatch=useAppDispatch()
  const check=useSelector((state:RootState)=>state.userReducer.checkUserStatus)
  useEffect(() => {
    if(token){
      dispatch(setPendingForCheck())
      dispatch(checkUserIsAuth())
    }
    dispatch(checkUserIsAuth())
  }, [])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      const fontRegular = new FontFace('montserrat', 'url(/fonts/Montserrat-Regular.ttf)',{ weight: '400' });
      const fontBold = new FontFace('montserrat', 'url(/fonts/Montserrat-Bold.ttf)', { weight: '700' });
      const fontLight = new FontFace('montserrat', 'url(/fonts/Montserrat-Light.ttf)', { weight:'300' });
  
      Promise.all([
        fontRegular.load(),
        fontBold.load(),
        fontLight.load(),
      ])
        .then(() => {
          document.fonts.add(fontRegular);
          document.fonts.add(fontBold);
          document.fonts.add(fontLight);
          setLoaded(true);
        })
        
    };    
    
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  

  return (
    
    <BrowserRouter>
    
    <GlobalStyle/>
    {!loaded||(check!=='fulfilled'&&check!=='rejected')
    ?     <Loader/>
    :    <AppRouter/>
    }
    </BrowserRouter>
  )
}

export default App
