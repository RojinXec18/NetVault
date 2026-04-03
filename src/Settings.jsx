import { useState } from 'react';
import { User, Shield, Bell, Save } from 'lucide-react';

export default function Settings({ user, logout }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">System Configuration</h1>
      </div>

      <div className="detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title"><User size={20} /> User Profile</h2>
            </div>
            <div className="form-group">
              <label>Administrator Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button className="glow-btn"><Save size={16} /> Update Profile</button>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title"><Bell size={20} /> Notifications</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input type="checkbox" id="notif-1" defaultChecked style={{ width: 'auto' }} />
              <label htmlFor="notif-1" style={{ color: 'var(--text-primary)' }}>Email me when someone wants to collaborate</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="notif-2" style={{ width: 'auto' }} />
              <label htmlFor="notif-2" style={{ color: 'var(--text-primary)' }}>Weekly summary of community projects</label>
            </div>
          </div>

        </div>

        <div>
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title" style={{ color: '#e74c3c' }}><Shield size={20} /> Security</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Terminate your current authenticated session. You will need to re-enter credentials to access NetVault.
            </p>
            <button 
              className="glow-btn" 
              onClick={logout}
              style={{ color: '#e74c3c', borderColor: '#e74c3c' }}
            >
              Terminate Session
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
