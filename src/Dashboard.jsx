import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Network, FileText, Clock, User, Activity, Star } from 'lucide-react';

export default function Dashboard({ projects, searchTerm }) {
  const [bio, setBio] = useState(() => localStorage.getItem('netvault_user_bio') || "I'm currently brushing up on my BGP fundamentals and setting up a new virtual lab environment for testing route reflectors.");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('netvault_profile_img') || null);

  useEffect(() => {
    localStorage.setItem('netvault_user_bio', bio);
  }, [bio]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('netvault_profile_img', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">Workspace Dashboard</h1>
      </div>

      {/* User Profile / Status Header */}
      <div className="detail-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem', background: 'linear-gradient(135deg, var(--bg-dark), rgba(0, 240, 255, 0.05))', borderRadius: '12px', padding: '1.5rem' }}>
        
        {/* User Visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0,255,255,0.2)', overflow: 'hidden', position: 'relative', transition: 'all 0.3s' }} className="avatar-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={40} style={{ color: 'var(--text-primary)' }} />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} title="Upload Profile Picture" />
            <div className="avatar-overlay" style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.6rem', textAlign: 'center', padding: '2px 0', pointerEvents: 'none', opacity: 0, transition: 'opacity 0.2s' }}>Upload</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>Administrator</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level 3 Engineer</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{projects.length}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Projects</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>14</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Snippets Saved</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-green)' }}>
              <Star size={24} style={{ display: 'inline-block', marginBottom: '4px' }} />
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Community Rating</span>
          </div>
        </div>

        {/* What I'm Doing Now (Bio) */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <Activity size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span>Current Focus</span>
            </div>
            {!isEditingBio ? (
              <button 
                onClick={() => setIsEditingBio(true)} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
              >
                Edit Focus
              </button>
            ) : (
              <button 
                onClick={() => setIsEditingBio(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-green)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                Save
              </button>
            )}
          </div>
          
          {isEditingBio ? (
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: '100%', minHeight: '60px', borderRadius: '4px', background: 'var(--bg-dark)', padding: '0.5rem', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              autoFocus
            />
          ) : (
            <div style={{ color: 'var(--text-primary)', lineHeight: '1.5', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
              "{bio}"
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Project Vault</h2>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="card project-card">
            <div className="project-header">
              <div className="project-icon">
                <Network size={24} />
              </div>
            </div>
            
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="tags-row">
              {project.tags.map(tag => (
                <span key={tag} className={`tag ${tag}`}>{tag}</span>
              ))}
            </div>
            
            <div className="project-footer">
              <div className="file-info">
                <FileText size={14} />
                <span>{project.fileCount} Files ({project.size})</span>
              </div>
              <div className="file-info">
                <Clock size={14} />
                <span>{project.lastUpdated}</span>
              </div>
            </div>
          </Link>
        ))}
        {filteredProjects.length === 0 && (
          <div style={{ color: 'var(--text-muted)', padding: '2rem', textAlign: 'center', background: 'var(--bg-dark)', borderRadius: '8px' }}>
            No projects found matching your search.
          </div>
        )}
      </div>
    </>
  );
}
