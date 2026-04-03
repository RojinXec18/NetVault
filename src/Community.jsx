import { useState } from 'react';
import { Mail, CheckCircle, Search, ExternalLink } from 'lucide-react';

const mockCommunityProjects = [
  { id: 'c1', title: 'Global ISP Backbone', author: 'Anna N.', tags: ['BGP', 'MPLS'], desc: 'Scaling BGP across 4 continents using Route Reflectors.' },
  { id: 'c2', title: 'Campus Security Audit', author: 'Mark T.', tags: ['Security', 'VLAN'], desc: 'Hardening access layers with 802.1X and DAI.' },
  { id: 'c3', title: 'SD-WAN Migration Hub', author: 'Sarah K.', tags: ['VPN', 'QoS'], desc: 'IPsec tunnels optimizing voice traffic under heavy load.' },
];

export default function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const openEmailModal = (proj) => {
    setSelectedProject(proj);
    setEmailSent(false);
    setEmailModalOpen(true);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => setEmailModalOpen(false), 2000);
    }, 800);
  };

  const filtered = mockCommunityProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1 className="page-title">Community Topologies</h1>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="search-box" style={{ width: '100%', maxWidth: '500px' }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search community architectures..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map(proj => (
          <div key={proj.id} className="card project-card" style={{ cursor: 'default' }}>
            <div className="project-header">
              <div className="project-icon" style={{ color: 'var(--accent-green)' }}>
                <ExternalLink size={24} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>By: {proj.author}</span>
            </div>
            
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.desc}</p>
            
            <div className="tags-row">
              {proj.tags.map(tag => (
                <span key={tag} className={`tag ${tag}`}>{tag}</span>
              ))}
            </div>

            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button className="glow-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openEmailModal(proj)}>
                <Mail size={16} /> Email to Collaborate
              </button>
            </div>
          </div>
        ))}
      </div>

      {emailModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Contact {selectedProject?.author}</h2>
              <button className="close-btn" onClick={() => setEmailModalOpen(false)}>×</button>
            </div>
            
            {emailSent ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={48} style={{ color: 'var(--accent-green)', margin: '0 auto 1rem' }} />
                <h3>Message Dispatched</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Your collaboration request has been securely routed.</p>
              </div>
            ) : (
              <form onSubmit={handleSendEmail}>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" readOnly value={`Collaboration Request: ${selectedProject?.title}`} style={{ opacity: 0.7 }} />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    required 
                    placeholder={`Hi ${selectedProject?.author},\n\nI really liked your architecture for ${selectedProject?.title}. I am currently building something similar and would love to exchange ideas...`}
                    style={{ minHeight: '120px' }}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setEmailModalOpen(false)}>Cancel</button>
                  <button type="submit" className="glow-btn success"><Mail size={16} /> Send Email</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
