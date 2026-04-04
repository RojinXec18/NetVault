import { useState } from 'react';
import { User, Shield, Bell, Save, Lock, Smartphone } from 'lucide-react';

export default function Settings({ user, logout }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isProfilePrivate, setIsProfilePrivate] = useState(user?.isPrivate || false);
  const [areProjectsPrivate, setAreProjectsPrivate] = useState(user?.projectsPrivate || false);
  const [bio, setBio] = useState(() => localStorage.getItem('netvault_user_bio') || '');

  const saveSettings = () => {
    // In a real app, send to backend. Here we simulate success.
    alert('Settings successfully updated!');
  };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">System Configuration</h1>
        <p className="subtitle">Manage your profile, privacy, and security preferences.</p>
      </div>

      <div className="detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title"><User size={20} /> User Profile</h2>
            </div>
            <div className="form-group">
              <label>Administrator Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" />
            </div>
            <div className="form-group">
              <label>Primary Phone</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Smartphone size={18} style={{ color: 'var(--text-muted)' }} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" style={{ flex: 1 }} />
              </div>
            </div>
            <div className="form-group">
              <label>What are you currently working on?</label>
              <textarea 
                value={bio} 
                onChange={e => setBio(e.target.value)} 
                placeholder="Mention your active projects or focus areas..." 
                style={{ width: '100%', minHeight: '80px', background: 'var(--bg-dark)', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem' }} 
              />
            </div>
            <button className="glow-btn" onClick={saveSettings}><Save size={16} /> Update Profile</button>
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
          <div className="detail-section" style={{ marginBottom: '1.5rem' }}>
            <div className="section-header">
              <h2 className="section-title"><Lock size={20} /> Privacy Settings</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Control who can see your workspace and profile details.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Private Profile</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hide your name and bio from the Community tab.</div>
              </div>
              <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                <input type="checkbox" checked={isProfilePrivate} onChange={() => setIsProfilePrivate(!isProfilePrivate)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span className="slider" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isProfilePrivate ? 'var(--accent-cyan)' : 'var(--border-color)', transition: '.4s', borderRadius: '34px' }}>
                  <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: isProfilePrivate ? '22px' : '2px', bottom: '2px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Private Projects</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hide your personal projects from public discovery.</div>
              </div>
              <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                <input type="checkbox" checked={areProjectsPrivate} onChange={() => setAreProjectsPrivate(!areProjectsPrivate)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span className="slider" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: areProjectsPrivate ? 'var(--accent-cyan)' : 'var(--border-color)', transition: '.4s', borderRadius: '34px' }}>
                  <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: areProjectsPrivate ? '22px' : '2px', bottom: '2px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                </span>
              </label>
            </div>
            
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title" style={{ color: '#e74c3c' }}><Shield size={20} /> Security</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Terminate your current authenticated session. You will need to verify via phone again to access NetVault.
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
