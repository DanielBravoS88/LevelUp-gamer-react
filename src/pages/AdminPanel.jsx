import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import productsData from '../data/products.json';

// Productos originales (estado base) - ahora usa los datos reales
const ORIGINAL_PRODUCTS = Array.isArray(productsData) ? productsData.map((product, index) => ({
  id: index + 1,
  name: product.name,
  price: product.price,
  category: product.category,
  description: product.description || '',
  image: product.image || ''
})) : [];

export default function AdminPanel() {
  const { user, saveAdminChanges, adminChanges } = useAuth();
  const [products, setProducts] = useState(ORIGINAL_PRODUCTS);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'PS5'
  });

  const [editingProduct, setEditingProduct] = useState(null);

  // Cargar cambios guardados del admin al montar el componente
  useEffect(() => {
    if (adminChanges.products) {
      setProducts(adminChanges.products);
    }
  }, [adminChanges]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        category: newProduct.category,
        description: '',
        image: '/img/placeholder.jpg' // Imagen por defecto para productos nuevos
      };
      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      setNewProduct({ name: '', price: '', category: 'PS5' });
      setHasUnsavedChanges(true);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (editingProduct && newProduct.name && newProduct.price) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: newProduct.name, 
              price: parseInt(newProduct.price), 
              category: newProduct.category 
            }
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: 'PS5' });
      setHasUnsavedChanges(true);
    }
  };

  const handleDeleteProduct = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveChanges = () => {
    saveAdminChanges({ products });
    setHasUnsavedChanges(false);
  };

  const handleResetChanges = () => {
    if (confirm('¿Estás seguro de descartar todos los cambios?')) {
      setProducts(ORIGINAL_PRODUCTS);
      setHasUnsavedChanges(false);
      saveAdminChanges({ products: ORIGINAL_PRODUCTS });
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: 'PS5' });
  };

  return (
    <div className="container">
      <div className="admin-panel">
        <div className="admin-header">
          <div>
            <h2>Panel de Administración</h2>
            <p>Bienvenido, {user?.name}</p>
          </div>
          <div className="admin-actions">
            {hasUnsavedChanges && (
              <div className="unsaved-indicator">
                <span className="unsaved-dot"></span>
                Cambios sin guardar
              </div>
            )}
            <button 
              className="btn secondary" 
              onClick={handleResetChanges}
              disabled={!hasUnsavedChanges}
            >
              Resetear
            </button>
            <button 
              className="btn primary" 
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="admin-section">
          <h3>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="product-form">
            <div className="form-grid">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Consolas">Consolas</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary">
                {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
              </button>
              {editingProduct && (
                <button type="button" className="btn" onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-section">
          <h3>Productos Existentes</h3>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price.toLocaleString()}</td>
                    <td>{product.category}</td>
                    <td>
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}