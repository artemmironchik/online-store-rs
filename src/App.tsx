import {Route, Routes} from 'react-router-dom'
import { ProductsPage } from './pages/ProductsPage';
import { BasketPage } from './pages/BasketPage';
import { Navigation } from './components/Navigation';

function App() {
  return(
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<ProductsPage/>}/>
        <Route path="/basket" element={<BasketPage/>}/>
      </Routes>
    </>
  )
}

export default App;
