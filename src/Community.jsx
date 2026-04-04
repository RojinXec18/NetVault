import { useState } from 'react';
import { Network, CheckCircle, Search, ExternalLink, Users, Activity } from 'lucide-react';

const mockCommunityProjects = [
  { id: 'c1', title: 'Global ISP Backbone', author: 'Anna N.', tags: ['BGP', 'MPLS'], desc: 'Scaling BGP across 4 continents using Route Reflectors. Currently highly available and load balanced.', online: true },
  { id: 'c2', title: 'Campus Security Audit', author: 'Mark T.', tags: ['Security', 'VLAN'], desc: 'Hardening access layers with 802.1X and DAI. Focused on zero-trust architecture at the edge.', online: false },
  { id: 'c3', title: 'SD-WAN Migration Hub', author: 'Sarah K.', tags: ['VPN', 'QoS'], desc: 'IPsec tunnels optimizing voice traffic under heavy load across 50 branch locations.', online: true },
];

export default function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const openCollabModal = (proj) => {
    setSelectedProject(proj);
    setRequestSent(false);
    setCollabModalOpen(true);
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => setCollabModalOpen(false), 2000);
  };

  const filtered = mockCommunityProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users /> Open Community</h1>
        <p className="subtitle">Discover, preview, and collaborate on cutting-edge network topologies built by engineers worldwide.</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="search-box" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem' }}>
          <Search size={20} className="search-icon" style={{ color: 'var(--accent-cyan)' }} />
          <input 
            type="text" 
            placeholder="Search community architectures..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', marginLeft: '0.5rem', width: '90%' }}
          />
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map(proj => (
          <div key={proj.id} className="card project-card" style={{ cursor: 'default', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="project-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div className="project-icon" style={{ color: proj.online ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                <Network size={24} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', fontWeight: 'bold' }}>By: {proj.author}</span>
                {proj.online && <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}><Activity size={12} /> Live Topology</span>}
              </div>
            </div>
            
            <h3 className="project-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
            <p className="project-desc" style={{ flex: 1, minHeight: '60px' }}>{proj.desc}</p>
            
            <div className="tags-row" style={{ marginBottom: '1.5rem' }}>
              {proj.tags.map(tag => (
                <span key={tag} className={`tag ${tag}`}>{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                className="glow-btn" 
                style={{ flex: 1, justifyContent: 'center', background: 'var(--bg-lighter)', color: 'var(--text-primary)' }} 
                onClick={() => alert(`Opening preview for ${proj.title}...`)}
              >
                <ExternalLink size={16} /> View Online
              </button>
              <button 
                className="glow-btn success" 
                style={{ flex: 1, justifyContent: 'center' }} 
                onClick={() => openCollabModal(proj)}
              >
                <Users size={16} /> Collaborate
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', background: 'var(--bg-dark)', borderRadius: '12px' }}>
            <p style={{ color: 'var(--text-muted)' }}>No community projects found for that query.</p>
          </div>
        )}
      </div>

      {collabModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Request Access: {selectedProject?.title}</h2>
              <button className="close-btn" onClick={() => setCollabModalOpen(false)}>×</button>
            </div>
            
            {requestSent ? (
              <div className="fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={64} style={{ color: 'var(--accent-green)', margin: '0 auto 1rem', animation: 'pulse 2s infinite' }} />
                <h3 style={{ color: 'var(--text-primary)' }}>Request Dispatched</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedProject?.author} has been notified of your collaboration request.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="fade-in">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Send a brief message to <strong>{selectedProject?.author}</strong> explaining why you would like to collaborate on this project.
                </p>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    required 
                    placeholder="E.g., I'm extremely interested in your Route Reflector implementation and would love to help optimize the access layer..."
                    style={{ minHeight: '120px', background: 'var(--bg-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.75rem', width: '100%' }}
                  />
                </div>
                <div className="form-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="btn-secondary" onClick={() => setCollabModalOpen(false)}>Cancel</button>
                  <button type="submit" className="glow-btn success"><Users size={16} /> Send Request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
