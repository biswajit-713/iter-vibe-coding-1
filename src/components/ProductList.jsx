function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <div className="product-name">{product.name}</div>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-price">₹{product.price}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
