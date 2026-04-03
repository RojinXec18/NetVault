import { useState } from 'react';
import { X } from 'lucide-react';

const AVAILABLE_TAGS = ['VLAN', 'OSPF', 'BGP', 'Security', 'VPN', 'Wireless', 'VoIP', 'QoS'];

export default function NewProjectModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

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

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="glow-btn success">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}
