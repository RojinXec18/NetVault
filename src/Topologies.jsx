import { Network, Download, GraduationCap, Server, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const beginnerTopologies = [
  { id: 'b1', name: 'Basic Two-PC LAN', ext: 'Packet Tracer', size: '1.2 MB', desc: 'The fundamental building block. Two endpoints connected via a Layer 2 Switch. Great for learning MAC tables.', color: 'var(--accent-cyan)' },
  { id: 'b2', name: 'Static Routing (3 Routers)', ext: 'GNS3 Lab', size: '1.5 MB', desc: 'Understand next-hop, routing tables, and metric basics between three discrete networks.', color: 'var(--accent-green)' },
  { id: 'b3', name: 'DHCP & DNS Automation', ext: 'Packet Tracer', size: '2.4 MB', desc: 'Implement automatic IP assignment and local domain name resolution for endpoints.', color: '#e74c3c' }
];

const mockTopologies = [
  { id: '1', name: 'Core Redundancy Map', ext: 'Visio', size: '2.1 MB', desc: 'High availability Enterprise core layer mapping with HSRP/VRRP protocols active.', color: '#9b59b6' },
  { id: '2', name: 'Data Center Leaf-Spine', ext: 'PDF', size: '5.4 MB', desc: 'Modern Data Center architecture featuring VXLAN routing, EVPN control plane, and multipath fabric.', color: '#3498db' },
  { id: '3', name: 'Software-Defined Branch', ext: 'LucidChart', size: '1.2 MB', desc: 'SD-WAN edge devices with application-aware routing, IPSec overlays, and local breakout policies.', color: '#f1c40f' },
  { id: '4', name: 'Global BGP & MPLS Backbone', ext: 'Packet Tracer', size: '6.8 MB', desc: 'Expert CCIE-level service provider core. Featuring eBGP peering, OSPF underlay, and VRF-lite segmentation.', color: '#e74c3c' }
];

export default function Topologies() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Network size={28} /> Saved Architectures
        </h1>
        <p className="subtitle">Explore, download, and visualize network layouts.</p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={20} color="var(--accent-green)" /> Essential Beginner Labs
          </h2>
          <button className="glow-btn" style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)' }} onClick={() => navigate('/learning')}>
            View Learning Hub <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="projects-grid">
          {beginnerTopologies.map((topo) => (
            <div key={topo.id} className="card project-card fade-in" style={{ padding: '0', overflow: 'hidden', borderTop: `4px solid ${topo.color}`, background: 'var(--bg-dark)' }}>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${topo.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Server size={20} color={topo.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{topo.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: topo.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Starter Lab</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.4' }}>{topo.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{topo.ext} &bull; {topo.size}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="glow-btn" style={{ padding: '0.4rem', background: 'var(--bg-lighter)' }} onClick={() => navigate('/workspace')} title="Open in Workspace">
                      <Eye size={14} />
                    </button>
                    <button className="glow-btn success" style={{ padding: '0.4rem 0.8rem' }} title="Download Lab">
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Enterprise Architectures</h2>
        <div className="projects-grid">
          {mockTopologies.map((topo) => (
            <div key={topo.id} className="card fade-in" style={{ padding: '0', overflow: 'hidden', background: 'linear-gradient(to bottom right, var(--bg-dark), var(--bg-lighter))' }}>
              <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', borderBottom: `2px solid ${topo.color}`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at center, ${topo.color}20 0%, transparent 70%)` }}></div>
                <Network size={48} style={{ color: topo.color, opacity: 0.8, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{topo.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{topo.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{topo.ext} &bull; {topo.size}</span>
                  <button className="glow-btn" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} title="Download Design">
                    <Download size={16} style={{ marginRight: '6px' }} /> Get Source
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
