import { Image as ImageIcon, Download, GraduationCap } from 'lucide-react';

const beginnerTopologies = [
  { id: 'b1', name: 'Basic Two-PC LAN over Switch', ext: '.png', size: '1.2 MB', desc: 'The fundamental building block. Two PCs connected via a Layer 2 Switch.' },
  { id: 'b2', name: 'Simple Static Routing (3 Routers)', ext: '.png', size: '1.5 MB', desc: 'Understanding next-hop and routing tables between three discrete networks.' },
  { id: 'b3', name: 'Basic DHCP & DNS Server Setup', ext: '.pdf', size: '2.4 MB', desc: 'Automatic IP assignment and domain name resolution for endpoints.' }
];

const mockTopologies = [
  { id: '1', name: 'Core Redundancy Map', ext: '.png', size: '2.1 MB', desc: 'Enterprise core layer mapping.' },
  { id: '2', name: 'DC Overlay Architecture', ext: '.pdf', size: '5.4 MB', desc: 'Data Center leaf-spine diagram.' },
  { id: '3', name: 'Branch Office Template', ext: '.jpeg', size: '1.2 MB', desc: 'Standardized branch deployment.' }
];

export default function Topologies() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1 className="page-title">Saved Topologies</h1>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <GraduationCap size={20} /> Essential Beginner Topologies
        </h2>
        <div className="projects-grid">
          {beginnerTopologies.map((topo) => (
            <div key={topo.id} className="card" style={{ padding: '0', overflow: 'hidden', borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <div style={{ padding: '0.2rem 0.5rem', background: 'rgba(0, 255, 0, 0.1)', color: 'var(--accent-green)', fontSize: '0.7rem', fontWeight: 'bold' }}>
                STARTER LAB
              </div>
              <div style={{ height: '120px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-color)' }}>
                <ImageIcon size={40} style={{ color: 'var(--accent-green)', opacity: 0.5 }} />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{topo.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '35px' }}>{topo.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{topo.ext} &bull; {topo.size}</span>
                  <button className="copy-btn glow-btn success" style={{ padding: '0.2rem 0.5rem' }} title="Download Lab"><Download size={14} /> Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>My Architectures</h2>
        <div className="projects-grid">
          {mockTopologies.map((topo) => (
            <div key={topo.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '150px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-color)' }}>
                <ImageIcon size={48} style={{ color: 'var(--border-color)', opacity: 0.5 }} />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{topo.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{topo.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{topo.ext} &bull; {topo.size}</span>
                  <button className="copy-btn" title="Download"><Download size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
