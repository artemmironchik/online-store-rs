import {Product} from './components/Product'
import {useProducts} from './hooks/products'

function App() {

  const {loading, error, products} = useProducts();

  return (
    <div className="container pt-5 mx-auto">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {products.map(product => <Product product={product} key={product.id} />)}
    </div>
  );
}

export default App;
