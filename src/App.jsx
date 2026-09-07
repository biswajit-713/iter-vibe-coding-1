import products from "./data/products.js";
import ProductList from "./components/ProductList.jsx";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Product List</h1>
        <p className="app-subtitle">{products.length} products available</p>
      </header>
      <ProductList products={products} />
    </div>
  );
}

export default App;
