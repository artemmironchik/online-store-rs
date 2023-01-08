import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { useProducts } from '../hooks/products';
import { Product } from '../components/Product';

export function ProductsPage() {
  
    const {loading, error, products} = useProducts();

    return (
    
      <div className="grid grid-cols-4 gap-4 flex-wrap justify-center items-center flex items-center pt-5 mx-auto">
        {loading && <Loader/>}
        {error && <Error error={error}/>}
        {products.map(product => <Product product={product} key={product.id} />)}
      </div>
    );
}
