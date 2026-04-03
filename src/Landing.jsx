import { Link } from 'react-router-dom';
import { Terminal, Users, Network, Lock } from 'lucide-react';

export default function Landing() {
  return (
    <div className="landing-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div className="scanlines"></div>
      
      {/* Hero Section */}
      <section className="hero" style={{ padding: '4rem 2rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Terminal size={64} className="brand-icon" style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }} />
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 0 15px var(--accent-cyan-glow)' }}>NetVault</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
          The premium hub to manage, document, and showcase your Cisco Packet Tracer & networking projects.
        </p>
        <Link to="/login" className="glow-btn success" style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}>
          Get Started
        </Link>
      </section>

      {/* Our Story / Features Section */}
      <section className="story-section" style={{ backgroundColor: 'var(--bg-panel)', padding: '4rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
             Why I Built This
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '2rem' }}>
            I created NetVault because I experienced a recurring problem: <strong>uploading, tracking, and collaborating on my own networking projects was a chaotic mess.</strong><br/><br/>
            Whether it was losing track of complex Packet Tracer topologies (.pkt files), forgetting my CLI config snippets, or struggling to share my labs with peers and prospective employers, there was no centralized platform built specifically for network engineers.<br/><br/>
            NetVault aims to solve this by providing a terminal-inspired, secure environment where you can not only store your labs, but directly reach out and collaborate with other engineers whose architectures you admire!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <Network size={32} style={{ color: 'var(--accent-cyan)', margin: '0 auto 1rem' }} />
              <h3>Topology Vault</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Store and preview network environments safely.</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <Users size={32} style={{ color: 'var(--accent-green)', margin: '0 auto 1rem' }} />
              <h3>Collaborate</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Connect with creators of projects you like.</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <Lock size={32} style={{ color: '#f39c12', margin: '0 auto 1rem' }} />
              <h3>Secure Configs</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Keep snippets and credentials private but accessible.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
