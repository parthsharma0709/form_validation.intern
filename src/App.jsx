
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormPage } from './FormPage';
import { Subbmission } from './submit';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormPage/>}/>
      <Route path='/submit' element={<Subbmission/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App;
