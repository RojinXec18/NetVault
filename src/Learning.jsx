import { BookOpen, MonitorPlay, Globe, Code } from 'lucide-react';

export default function Learning() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={28} style={{ color: 'var(--accent-cyan)' }} />
            Learning Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            A curated list of foundational external resources to jumpstart your networking journey.
          </p>
        </div>
      </div>

      <div className="detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="detail-section" style={{ borderColor: '#ef0000' }}>
            <div className="section-header" style={{ borderBottomColor: '#222' }}>
              <h2 className="section-title"><MonitorPlay size={20} style={{ color: '#ef0000' }} /> Essential YouTube Channels</h2>
            </div>
            
            <a href="https://www.youtube.com/c/NetworkChuck" target="_blank" rel="noreferrer" className="file-item" style={{ textDecoration: 'none', display: 'flex' }}>
              <div>
                <div className="file-name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>NetworkChuck</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Coffee-fueled, high energy networking fundamentals and CCNA prep.</div>
              </div>
            </a>

            <a href="https://www.youtube.com/@JeremysITLab" target="_blank" rel="noreferrer" className="file-item" style={{ textDecoration: 'none', display: 'flex', marginTop: '1rem' }}>
              <div>
                <div className="file-name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Jeremy's IT Lab</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>The absolute standard for free, highly-structured CCNA video courses and Packet Tracer labs.</div>
              </div>
            </a>

            <a href="https://www.youtube.com/c/DavidBombal" target="_blank" rel="noreferrer" className="file-item" style={{ textDecoration: 'none', display: 'flex', marginTop: '1rem' }}>
              <div>
                <div className="file-name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>David Bombal</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Deep dives into networking, Python automation, and cybersecurity.</div>
              </div>
            </a>
          </div>

          <div className="detail-section" style={{ borderColor: '#3498db' }}>
            <div className="section-header" style={{ borderBottomColor: '#222' }}>
              <h2 className="section-title"><Globe size={20} style={{ color: '#3498db' }} /> Web Courses & Articles</h2>
            </div>

            <a href="https://www.netacad.com/" target="_blank" rel="noreferrer" className="file-item" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="file-name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Cisco Networking Academy</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>The official training grounds directly from Cisco. Excellent free modules.</div>
            </a>

            <a href="https://www.geeksforgeeks.org/computer-network-tutorials/" target="_blank" rel="noreferrer" className="file-item" style={{ textDecoration: 'none', display: 'block', marginTop: '1rem' }}>
              <div className="file-name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>GeeksForGeeks: Computer Networks</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Great text-based walkthroughs of core protocols like TCP/IP and OSI.</div>
            </a>
          </div>

        </div>

        <div>
          <div className="detail-section">
            <div className="section-header">
              <h2 className="section-title"><Code size={20} style={{ color: 'var(--accent-green)' }} /> Cheat Sheet</h2>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text-primary)' }}>OSI Model:</strong><br/>
              7. Application<br/>
              6. Presentation<br/>
              5. Session<br/>
              4. Transport<br/>
              3. Network<br/>
              2. Data Link<br/>
              1. Physical</p>

              <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text-primary)' }}>Common Ports:</strong><br/>
              20/21 - FTP<br/>
              22 - SSH<br/>
              23 - Telnet<br/>
              53 - DNS<br/>
              80 - HTTP / 443 - HTTPS</p>

              <p><strong style={{ color: 'var(--text-primary)' }}>Subnetting Magic Rule:</strong><br/>
              2^H - 2 = Usable Hosts (where H is remaining host bits).</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
