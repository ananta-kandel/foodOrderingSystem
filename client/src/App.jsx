import { store } from "./services/Cookie";
import AuthProvider from 'react-auth-kit';
//import components
import AppRoutes from "./routes/AppRoutes";
import './App.css'


function App() {

  return (
    
    <AuthProvider store={store}>
    
    <AppRoutes />
   
   </AuthProvider>

  )
}

export default App
