import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Smartphone, Lock, ShieldCheck } from 'lucide-react';

export default function Login({ login }) {
  const [step, setStep] = useState(1); // 1: Initial, 2: Phone Entry, 3: OTP Entry, 4: Success
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth redirect and return
    setTimeout(() => {
      setEmail('developer@gmail.com'); // Mocked returning email
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length === 6) {
      setIsLoading(true);
      // Simulate verification
      setTimeout(() => {
        setStep(4);
        setTimeout(() => {
          login({ 
            email: email, 
            phone: phone,
            name: email.split('@')[0],
            avatar: null, // to be uploaded later
            bio: '',
            isPrivate: false,
            projectsPrivate: false
          });
          navigate('/dashboard');
        }, 1500);
      }, 1000);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-dark)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Progress bar line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--accent-cyan)', width: `${(step / 4) * 100}%`, transition: 'width 0.3s ease' }}></div>

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
                <span className="pulsing">Connecting to Provider...</span>
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
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Smartphone size={40} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-primary)' }}>Verify Identity</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                For enhanced security, please link your phone number to <strong>{email}</strong>.
              </p>
            </div>
            <form onSubmit={handlePhoneSubmit}>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000" 
                  style={{ fontSize: '1.1rem', letterSpacing: '1px' }}
                />
              </div>
              <button type="submit" disabled={isLoading} className="glow-btn success" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', cursor: 'pointer' }}>
                {isLoading ? 'Sending SMS...' : 'Send OTP Code'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Lock size={40} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-primary)' }}>Enter OTP</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                We sent a 6-digit code to <strong>{phone}</strong>.
              </p>
            </div>
            <form onSubmit={handleOtpSubmit}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '2rem 0' }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    style={{ 
                      width: '40px', height: '50px', textAlign: 'center', fontSize: '1.5rem',
                      background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px'
                    }}
                    maxLength={1}
                  />
                ))}
              </div>
              <button type="submit" disabled={isLoading || otp.join('').length < 6} className="glow-btn success" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}>
                Change Phone Number
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <ShieldCheck size={64} style={{ color: '#4caf50', marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
            <h2 style={{ color: 'var(--text-primary)' }}>Verification Successful</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to your secure dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
