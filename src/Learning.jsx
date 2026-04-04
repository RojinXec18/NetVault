import { BookOpen, MonitorPlay, Globe, Code, ArrowRight, Shield, Target } from 'lucide-react';

export default function Learning() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen size={32} style={{ color: 'var(--accent-cyan)' }} />
            Networking Academy Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            A curated, highly-productive roadmap to master networking fundamentals from zero to engineer.
          </p>
        </div>
      </div>

      <div className="learning-roadmap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Phase 1: Basics */}
        <div className="card fade-in" style={{ borderTop: '4px solid #3498db', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(52, 152, 219, 0.05) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#3498db', color: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>The Fundamentals</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start here. Learn how devices talk to each other across the globe using standard protocols.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://www.netacad.com/" target="_blank" rel="noreferrer" className="learning-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.75rem', background: 'var(--bg-lighter)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'transform 0.2s' }}>
              <Globe size={20} color="#3498db" />
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Cisco Networking Academy</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Free introductory modules.</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>
            <a href="https://www.youtube.com/c/NetworkChuck" target="_blank" rel="noreferrer" className="learning-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.75rem', background: 'var(--bg-lighter)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'transform 0.2s' }}>
              <MonitorPlay size={20} color="#e74c3c" />
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>NetworkChuck</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>High-energy CCNA basics.</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>
          </div>
        </div>

        {/* Phase 2: Labs */}
        <div className="card fade-in" style={{ borderTop: '4px solid var(--accent-green)', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(0, 255, 0, 0.05) 100%)', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--accent-green)', color: '#000', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Hands-on Labs</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Theory is useless without CLI practice. Fire up Packet Tracer and start configuring.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://www.youtube.com/@JeremysITLab" target="_blank" rel="noreferrer" className="learning-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.75rem', background: 'var(--bg-lighter)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'transform 0.2s' }}>
              <Target size={20} color="var(--accent-green)" />
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Jeremy's IT Lab</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>The absolute standard for CCNA.</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>
          </div>
        </div>

        {/* Phase 3: Advanced */}
        <div className="card fade-in" style={{ borderTop: '4px solid #9b59b6', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(155, 89, 182, 0.05) 100%)', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#9b59b6', color: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Advanced Architecture</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Move beyond the access layer into automation, security, and BGP architectures.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://www.youtube.com/c/DavidBombal" target="_blank" rel="noreferrer" className="learning-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.75rem', background: 'var(--bg-lighter)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'transform 0.2s' }}>
              <Shield size={20} color="#9b59b6" />
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>David Bombal</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Python automation & security dives.</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>
          </div>
        </div>

      </div>

      <div className="card fade-in" style={{ background: 'var(--bg-dark)', border: '1px solid var(--accent-cyan)' }}>
        <div className="section-header" style={{ borderBottomColor: 'var(--border-color)', marginBottom: '1.5rem', paddingBottom: '1rem' }}>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Code size={24} /> Network Engineer's Cheat Sheet
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>OSI Model Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong style={{ color: 'var(--accent-green)' }}>7. Application</strong> - HTTP, FTP, DNS (Data)</li>
              <li><strong style={{ color: 'var(--accent-green)' }}>6. Presentation</strong> - SSL, TLS, JPEG (Data)</li>
              <li><strong style={{ color: 'var(--accent-green)' }}>5. Session</strong> - NetBIOS, PPTP (Data)</li>
              <li><strong style={{ color: '#3498db' }}>4. Transport</strong> - TCP, UDP (Segments)</li>
              <li><strong style={{ color: '#9b59b6' }}>3. Network</strong> - IP, ICMP, IPSec (Packets)</li>
              <li><strong style={{ color: '#e67e22' }}>2. Data Link</strong> - MAC, VLAN, ARP (Frames)</li>
              <li><strong style={{ color: '#e74c3c' }}>1. Physical</strong> - Cables, Hubs (Bits)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Subnetting Magic Rule</h3>
            <div style={{ background: 'var(--bg-lighter)', padding: '1.5rem', borderRadius: '8px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>2^H - 2 = Hosts</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Where <strong style={{ color: '#fff' }}>H</strong> is the remaining host bits.<br/>Subtract 2 for Network and Broadcast addresses.</p>
            </div>
            
            <h3 style={{ color: 'var(--text-primary)', margin: '1.5rem 0 1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Crucial Ports</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div><strong style={{ color: '#fff' }}>22</strong> - SSH</div>
              <div><strong style={{ color: '#fff' }}>80</strong> - HTTP</div>
              <div><strong style={{ color: '#fff' }}>53</strong> - DNS</div>
              <div><strong style={{ color: '#fff' }}>443</strong> - HTTPS</div>
              <div><strong style={{ color: '#fff' }}>20/21</strong> - FTP</div>
              <div><strong style={{ color: '#fff' }}>3389</strong> - RDP</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
