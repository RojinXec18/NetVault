import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function Login({ login }) {
  const [step, setStep] = useState(1); // 1: Initial Google Auth, 2: Success Redirection
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth redirect and verification via Google 2FA internally
    setTimeout(() => {
      const authEmail = 'developer@gmail.com';
      setEmail(authEmail);
      setIsLoading(false);
      setStep(2);
      
      // Complete login
      setTimeout(() => {
        login({ 
          email: authEmail, 
          phone: '',
          name: authEmail.split('@')[0],
          avatar: null,
          bio: '',
          isPrivate: false,
          projectsPrivate: false
        });
        navigate('/dashboard');
      }, 1500);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-dark)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Progress bar line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--accent-cyan)', width: `${(step / 2) * 100}%`, transition: 'width 0.3s ease' }}></div>

        {step === 1 && (
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/logo.png" alt="NetVault Logo" style={{ width: '80px', height: '80px', borderRadius: '16px', marginBottom: '1rem', border: '1px solid var(--border-color)', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline-block'; }} />
              <Terminal size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', display: 'none' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>Access NetVault</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Secure your network workflows.</p>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="glow-btn"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem', padding: '1rem', background: 'var(--bg-lighter)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            >
              {isLoading ? (
                <span className="pulsing">2FA Verifying via Google...</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <ShieldCheck size={64} style={{ color: '#4caf50', marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
            <h2 style={{ color: 'var(--text-primary)' }}>Google 2FA Successful</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Welcome back, {email.split('@')[0]}! Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
