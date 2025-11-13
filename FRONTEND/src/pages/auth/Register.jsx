import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api.js';
import '../../styles/auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contrasenas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const requestData = {
        ...dataToSend,
        nombre: dataToSend.name
      };
      delete requestData.name;
      
      const response = await api.post('/auth/register', requestData);

      if (response.data) {
        setSuccess('Â¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } else {
        setError('Error al registrarse');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || 'Error al registrarse');
      } else {
        setError('Error de conexion. Verifica que el servidor este ejecutandose.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-link">â† Volver al inicio</Link>
          <h1>RepuestosAuto</h1>
          <h2>Crear Cuenta</h2>
          <p>Ãšnete a nuestra comunidad de compradores y vendedores</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+54 11 1234-5678"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Tipo de Cuenta</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Comprador</option>
              <option value="seller">Vendedor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contrasena</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contrasena</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contrasena"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-links">
          <p>Ya tienes cuenta? <Link to="/auth/login">Inicia sesion aqui</Link></p>
        </div>

        <div className="features-list">
          <h4>âœ¨ Beneficios de registrarte:</h4>
          <ul>
            <li>ðŸ›’ Carrito de compras persistente</li>
            <li>ðŸ“¦ Seguimiento de pedidos</li>
            <li>ðŸ’° Precios preferenciales</li>
            <li>ðŸŽ¯ Ofertas personalizadas</li>
            <li>ðŸ“± Soporte prioritario</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

