import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Login({ login }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wrap in a mock promise to simulate network
    setTimeout(() => {
      login({ email, name: email.split('@')[0] });
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-dark)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Terminal size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
            {isRegistering ? 'Setup NetVault Access' : 'Access NetVault'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {isRegistering ? 'Initialize your secure workspace.' : 'Enter your credentials to continue.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address / Root ID</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@network.local" 
            />
          </div>
          <div className="form-group">
            <label>Password / Token</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="glow-btn success" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            {isRegistering ? 'Initialize Workspace' : 'Authenticate'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            {isRegistering ? 'Already have access?' : 'Need to initialize a workspace?'}
          </span>
          <button 
            type="button" 
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ 
              background: 'none', border: 'none', color: 'var(--accent-cyan)', 
              cursor: 'pointer', marginLeft: '0.5rem', fontFamily: 'inherit',
              textDecoration: 'underline' 
            }}
          >
            {isRegistering ? 'Sign In' : 'Setup Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
