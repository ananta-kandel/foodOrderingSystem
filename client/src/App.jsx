import { Store } from "./services/Cookie";
import AuthProvider from 'react-auth-kit';
//import components
import AppRoutes from "./routes/AppRoutes";
import './App.css'
import  store from '../src/redux/Store.js'
import { Provider } from 'react-redux'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <Provider store={store}>
    <AuthProvider store={Store}>
    <AppRoutes />
    <ToastContainer />
   </AuthProvider>
   </Provider>
  )
}

export default App
