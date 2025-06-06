import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import '../../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const userData = await login(email, password);

      if (!userData) {
        throw new Error("Autenticacion fallida")
      }

      await Swal.fire({
        title: 'Bienvendido',
        text: `Usuario: ${userData.name1 || userData.email}`,
        icon: 'success',
      });
      navigate('/welcome');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      console.error('Login error details:', err);
      await Swal.fire({
        title: '¡Error!',
        text: 'Usuario no Identifcado en el sistema',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
        <div className='login'>
            <div className='login-form'>
                <h2>Iniciar Sesión</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                
                    <label>Email:</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    />
                    
                    <label>Contraseña:</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
                </form>
            </div>
            <div className='login-image-panel'>
                <div className='circle'></div>
                <p>S.G.R</p>
            </div>
        </div>
    </div>
    );
};



export default Login;