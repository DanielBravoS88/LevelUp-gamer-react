import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API_URL = 'http://localhost:5000/api/products';

export default function AdminPanel() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    categoria: 'PS5',
    genero: 'Acción',
    descripcion: '',
    imagen: '',
    stock: 10
  });

  const [editingProduct, setEditingProduct] = useState(null);

  // Cargar productos desde el backend al montar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Cargar productos desde el backend al montar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Error al cargar productos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          precio: parseInt(newProduct.precio),
          categoria: newProduct.categoria,
          plataforma: newProduct.categoria === 'PS5' ? 'PlayStation 5' : 
                     newProduct.categoria === 'Switch' ? 'Nintendo Switch' : 
                     newProduct.categoria === 'Accesorios' ? 'Accesorios' : 'Multi-plataforma',
          genero: newProduct.genero,
          descripcion: newProduct.descripcion || 'Sin descripción',
          imagen: newProduct.imagen || '/img/placeholder.jpg',
          stock: parseInt(newProduct.stock) || 10,
          destacado: false,
          activo: true
        })
      });

      const data = await response.json();

      if (data.success) {
        setProducts([...products, data.data]);
        setNewProduct({ nombre: '', precio: '', categoria: 'PS5', genero: 'Acción', descripcion: '', imagen: '', stock: 10 });
        alert('✅ Producto agregado exitosamente');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (err) {
      alert('❌ Error de conexión: ' + err.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio.toString(),
      categoria: product.categoria,
      genero: product.genero || 'Acción',
      descripcion: product.descripcion || '',
      imagen: product.imagen || '',
      stock: product.stock || 10
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct || !newProduct.nombre || !newProduct.precio) return;

    try {
      const response = await fetch(`${API_URL}/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          precio: parseInt(newProduct.precio),
          categoria: newProduct.categoria,
          plataforma: newProduct.categoria === 'PS5' ? 'PlayStation 5' : 
                     newProduct.categoria === 'Switch' ? 'Nintendo Switch' : 
                     newProduct.categoria === 'Accesorios' ? 'Accesorios' : 'Multi-plataforma',
          genero: newProduct.genero,
          descripcion: newProduct.descripcion,
          imagen: newProduct.imagen,
          stock: parseInt(newProduct.stock)
        })
      });

      const data = await response.json();

      if (data.success) {
        const updatedProducts = products.map(p => 
          p._id === editingProduct._id ? data.data : p
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        setNewProduct({ nombre: '', precio: '', categoria: 'PS5', genero: 'Acción', descripcion: '', imagen: '', stock: 10 });
        alert('✅ Producto actualizado exitosamente');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (err) {
      alert('❌ Error de conexión: ' + err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        const updatedProducts = products.filter(p => p._id !== productId);
        setProducts(updatedProducts);
        alert('✅ Producto eliminado exitosamente');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (err) {
      alert('❌ Error de conexión: ' + err.message);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ nombre: '', precio: '', categoria: 'PS5', genero: 'Acción', descripcion: '', imagen: '', stock: 10 });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="admin-panel">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin-panel">
        <div className="admin-header">
          <div>
            <h2>Panel de Administración</h2>
            <p>Bienvenido, {user?.name}</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="admin-section">
          <h3>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="product-form">
            <div className="form-grid">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.nombre}
                onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={newProduct.precio}
                onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />
              <select
                value={newProduct.categoria}
                onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
              >
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Consolas">Consolas</option>
              </select>
              <select
                value={newProduct.genero}
                onChange={(e) => setNewProduct({ ...newProduct, genero: e.target.value })}
                required
              >
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Deportes">Deportes</option>
                <option value="Carreras">Carreras</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulación">Simulación</option>
                <option value="Terror">Terror</option>
                <option value="Pelea">Pelea</option>
                <option value="Plataformas">Plataformas</option>
              </select>
              <input
                type="text"
                placeholder="URL de imagen"
                value={newProduct.imagen}
                onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
              />
              <textarea
                placeholder="Descripción del producto"
                value={newProduct.descripcion}
                onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                style={{ gridColumn: '1 / -1' }}
              />
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
          <h3>Productos Existentes ({products.length})</h3>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.nombre}</td>
                    <td>${product.precio?.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>{product.categoria}</td>
                    <td>
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleDeleteProduct(product._id)}
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