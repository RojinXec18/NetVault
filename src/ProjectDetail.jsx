import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Copy, Upload, Download, CheckCircle, File as FileIcon, Trash2, Edit2 } from 'lucide-react';
import EditProjectModal from './EditProjectModal';

export default function ProjectDetail({ projects, updateProject, deleteProject }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  
  const [newSnippetCode, setNewSnippetCode] = useState('');
  const [newSnippetTitle, setNewSnippetTitle] = useState('');
  const [notes, setNotes] = useState(project?.notes || '');
  const [copiedId, setCopiedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!project) return <div>Project not found</div>;

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSnippet = () => {
    if (!newSnippetTitle || !newSnippetCode) return;
    const updatedProject = {
      ...project,
      snippets: [...project.snippets, { id: Date.now().toString(), title: newSnippetTitle, code: newSnippetCode }]
    };
    updateProject(id, updatedProject);
    setNewSnippetTitle('');
    setNewSnippetCode('');
  };

  const handleDeleteSnippet = (snippetId) => {
    updateProject(id, { ...project, snippets: project.snippets.filter(s => s.id !== snippetId) });
  };

  const handleSaveNotes = () => {
    updateProject(id, { ...project, notes });
  };

  const handleFileUploadMock = () => {
    const defaultName = `topology_v${project.files.length + 1}.pkt`;
    const newFile = {
      id: Date.now().toString(),
      name: defaultName,
      size: (Math.random() * 5).toFixed(1) + ' MB'
    };
    updateProject(id, {
      ...project,
      files: [...project.files, newFile],
      fileCount: project.fileCount + 1
    });
  };

  const handleDeleteFile = (fileId) => {
    updateProject(id, { ...project, files: project.files.filter(f => f.id !== fileId), fileCount: project.fileCount - 1 });
  };

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}><ArrowLeft size={24} /></Link>
          <h1 className="page-title" style={{ margin: 0 }}>{project.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="tags-row" style={{ margin: 0 }}>
            {project.tags.map(tag => <span key={tag} className={`tag ${tag}`}>{tag}</span>)}
          </div>
          <button 
            className="glow-btn" 
            style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => setIsEditModalOpen(true)}
            title="Edit Project Details"
          >
            <Edit2 size={14} /> Edit
          </button>
          <button 
            className="glow-btn" 
            style={{ color: '#e74c3c', borderColor: 'rgba(231, 76, 60, 0.3)', padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this project?')) {
                deleteProject(id);
                navigate('/dashboard');
              }
            }}
            title="Delete Project"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* Left Column */}
        <div>
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title">Documentation & Notes</h2>
              <button className="glow-btn" onClick={handleSaveNotes} style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>Save</button>
            </div>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', minHeight: '200px', resize: 'vertical' }}
              placeholder="Write your networking documentation here..."
            />
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title">Config Snippets</h2>
            </div>
            {project.snippets.map(snippet => (
              <div key={snippet.id} className="snippet-block">
                <div className="snippet-header">
                  <span>{snippet.title}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="copy-btn" onClick={() => handleCopy(snippet.id, snippet.code)}>
                      {copiedId === snippet.id ? <CheckCircle size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                      {copiedId === snippet.id ? 'Copied' : 'Copy'}
                    </button>
                    <button className="copy-btn" style={{ color: '#e74c3c' }} onClick={() => handleDeleteSnippet(snippet.id)} title="Delete Snippet">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="snippet-code">{snippet.code}</div>
              </div>
            ))}
            
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <input 
                type="text" 
                placeholder="Snippet Title..." 
                value={newSnippetTitle} 
                onChange={(e) => setNewSnippetTitle(e.target.value)} 
                style={{ width: '100%', marginBottom: '0.5rem' }} 
              />
              <textarea 
                placeholder="Paste config..." 
                value={newSnippetCode} 
                onChange={(e) => setNewSnippetCode(e.target.value)}
                style={{ width: '100%', minHeight: '80px', marginBottom: '0.5rem' }}
              />
              <button className="glow-btn success" onClick={handleAddSnippet}><Plus size={16} /> Add Snippet</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title">Attached Files</h2>
              <button className="glow-btn success" onClick={handleFileUploadMock} style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                <Upload size={14} /> Upload
              </button>
            </div>
            
            {project.files.map(file => (
              <div key={file.id} className="file-item">
                <div className="file-name">
                  <FileIcon size={16} />
                  <span>{file.name}</span>
                </div>
                <div className="file-actions">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{file.size}</span>
                  <button className="copy-btn"><Download size={14} /></button>
                  <button className="copy-btn" style={{ color: '#e74c3c' }} onClick={() => handleDeleteFile(file.id)} title="Delete Attached File"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {project.files.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>No files attached yet.</div>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProjectModal 
          project={project} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={(data) => updateProject(id, { ...project, ...data })} 
        />
      )}
    </>
  );
}
