import {Route, Routes} from 'react-router-dom'
import { ProductsPage } from './pages/ProductsPage';
import { BasketPage } from './pages/BasketPage';
import { Navigation } from './components/Navigation';
import { DetailPage } from './pages/DetailPage';

function App() {
  return(
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<ProductsPage/>}/>
        <Route path="/basket" element={<BasketPage/>}/>
        <Route path="/details/:id" element={<DetailPage/>}/>
      </Routes>
    </>
  )
}

export default App;
