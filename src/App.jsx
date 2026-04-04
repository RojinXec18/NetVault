import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Terminal, Folder, Settings, Search, Plus, Server, LogOut, Users, BookOpen, Activity } from 'lucide-react';
import Dashboard from './Dashboard';
import ProjectDetail from './ProjectDetail';
import NewProjectModal from './NewProjectModal';
import Landing from './Landing';
import Login from './Login';
import Community from './Community';
import Topologies from './Topologies';
import SettingsPage from './Settings';
import Learning from './Learning';
import ChatBot from './ChatBot';
import Workspace from './Workspace';
import './App.css';

const defaultProjects = [
  {
    id: '1', title: 'Enterprise Campus Network', description: 'Core, distribution, and access layer design using OSPF and VLANs.', tags: ['VLAN', 'OSPF'], fileCount: 3, size: '2.4 MB', lastUpdated: '2023-10-15', notes: 'Configured HSRP for redundancy on the distribution layer.', snippets: [{ id: 's1', title: 'VLAN Configuration', code: 'vlan 10\n name SALES\nvlan 20\n name ENG' }], files: [{ id: 'f1', name: 'campus_v1.pkt', size: '1.2 MB' }]
  },
  { id: '2', title: 'BGP Data Center', description: 'eBGP underlay with EVPN/VXLAN overlay.', tags: ['BGP', 'Security'], fileCount: 5, size: '5.1 MB', lastUpdated: '2023-11-02', notes: 'Testing route reflection.', snippets: [], files: [] },
  { id: '3', title: 'OSPF Migration', description: 'Migrating from EIGRP to OSPF multi-area.', tags: ['OSPF'], fileCount: 1, size: '800 KB', lastUpdated: '2023-11-10', notes: 'Area 0 is functional.', snippets: [], files: [] }
];

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('netvault_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('netvault_projects');
    if (saved) return JSON.parse(saved);
    return defaultProjects;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('netvault_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('netvault_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('netvault_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const addProject = (project) => {
    setProjects(prev => [{...project, id: Date.now().toString(), fileCount: 0, size: '0 KB', lastUpdated: new Date().toISOString().split('T')[0], snippets: [], files: [], notes: ''}, ...prev]);
  };

  const updateProject = (id, updatedData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // ----- Unauthenticated Flow -----
  if (!user) {
    return (
      <div className="app-container" style={{ display: 'block' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ChatBot />
      </div>
    );
  }

  // ----- Authenticated Flow -----
  return (
    <div className="app-container">
      <div className="scanlines"></div>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <Terminal size={24} className="brand-icon" />
          <span className="brand-title">NetVault</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <Folder size={18} />
            My Projects
          </Link>
          <Link to="/community" className={`nav-item ${location.pathname === '/community' ? 'active' : ''}`}>
            <Users size={18} />
            Community
          </Link>
          <Link to="/topologies" className={`nav-item ${location.pathname === '/topologies' ? 'active' : ''}`}>
            <Server size={18} />
            Topologies
          </Link>
          <Link to="/workspace" className={`nav-item ${location.pathname === '/workspace' ? 'active' : ''}`}>
            <Activity size={18} />
            Workspace Canvas
          </Link>
          <Link to="/learning" className={`nav-item ${location.pathname === '/learning' ? 'active' : ''}`}>
            <BookOpen size={18} />
            Learning Hub
          </Link>
          <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`} style={{ marginTop: 'auto' }}>
            <Settings size={18} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          {location.pathname === '/dashboard' || location.pathname === '/community' ? (
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : <div />} {/* spacer */}
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</span>
            {location.pathname === '/dashboard' && (
              <button className="glow-btn success" onClick={() => setIsModalOpen(true)}>
                <Plus size={16} /> New Project
              </button>
            )}
            <button title="Logout" onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="content-area">
          <Routes>
            <Route path="/dashboard" element={<Dashboard projects={projects} searchTerm={searchTerm} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/topologies" element={<Topologies />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/settings" element={<SettingsPage user={user} logout={logout} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} updateProject={updateProject} deleteProject={deleteProject} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </main>

      {isModalOpen && (
        <NewProjectModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addProject} 
        />
      )}
      <ChatBot />
    </div>
  );
}

export default App;
