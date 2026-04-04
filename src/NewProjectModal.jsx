import { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';

const AVAILABLE_TAGS = ['VLAN', 'OSPF', 'BGP', 'Security', 'VPN', 'Wireless', 'VoIP', 'QoS'];

export default function NewProjectModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({
      title,
      description,
      tags: selectedTags,
      isPublic
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{ margin: 0, fontSize: '1.4rem', textShadow: '0 0 5px var(--accent-cyan)' }}>New Project Lab</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input 
              type="text" 
              required
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g., Core Network Redundancy" 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Brief overview of the topology..." 
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-row">
              {AVAILABLE_TAGS.map(tag => (
                <button 
                  key={tag} 
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`tag ${tag}`}
                  style={{
                    cursor: 'pointer',
                    opacity: selectedTags.includes(tag) ? 1 : 0.4,
                    borderWidth: selectedTags.includes(tag) ? '2px' : '1px'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Visibility Strategy</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <label 
                style={{ 
                  flex: 1, padding: '1rem', borderRadius: '8px', border: `2px solid ${!isPublic ? 'var(--accent-cyan)' : 'var(--border-color)'}`, 
                  background: !isPublic ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' 
                }}
              >
                <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} style={{ display: 'none' }} />
                <Lock size={20} color={!isPublic ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Private Vault</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Only you can access this.</div>
                </div>
              </label>

              <label 
                style={{ 
                  flex: 1, padding: '1rem', borderRadius: '8px', border: `2px solid ${isPublic ? 'var(--accent-green)' : 'var(--border-color)'}`, 
                  background: isPublic ? 'rgba(0, 255, 0, 0.1)' : 'var(--bg-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' 
                }}
              >
                <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} style={{ display: 'none' }} />
                <Globe size={20} color={isPublic ? 'var(--accent-green)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Community Public</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Allow others to view and request collaboration.</div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '2rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="glow-btn success">Create Architecture</button>
          </div>
        </form>
      </div>
    </div>
  );
}
