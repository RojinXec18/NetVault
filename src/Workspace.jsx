import { useState, useRef } from 'react';
import { Server, Monitor, Activity } from 'lucide-react';

export default function Workspace() {
  const [nodes, setNodes] = useState([]);
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState(null); // 'router', 'switch', 'pc'

  const handleCanvasClick = (e) => {
    if (!selectedTool) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setNodes([...nodes, { id: Date.now(), type: selectedTool, x, y, label: `${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} ${nodes.length + 1}` }]);
    setSelectedTool(null);
  };

  const clearCanvas = () => setNodes([]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity /> Network Canvas</h1>
          <p className="subtitle">Visually build and manage your project topologies online inside NetVault.</p>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
        {/* Tool Palette */}
        <div className="card" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Components</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select a tool, then click anywhere on the grid.</p>
          
          <button 
            onClick={() => setSelectedTool('router')}
            className={`tool-btn ${selectedTool === 'router' ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: selectedTool === 'router' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'router' ? '#000' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: selectedTool === 'router' ? 'bold' : 'normal' }}
          >
            <Activity size={18} /> Router
          </button>
          <button 
            onClick={() => setSelectedTool('switch')}
            className={`tool-btn ${selectedTool === 'switch' ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: selectedTool === 'switch' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'switch' ? '#000' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: selectedTool === 'switch' ? 'bold' : 'normal' }}
          >
            <Server size={18} /> Switch
          </button>
          <button 
            onClick={() => setSelectedTool('pc')}
            className={`tool-btn ${selectedTool === 'pc' ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: selectedTool === 'pc' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'pc' ? '#000' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: selectedTool === 'pc' ? 'bold' : 'normal' }}
          >
            <Monitor size={18} /> Workstation
          </button>

          <div style={{ marginTop: 'auto' }}>
            <button onClick={clearCanvas} className="glow-btn" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,100,100,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,100,100,0.3)' }}>
              Clear Canvas
            </button>
          </div>
        </div>

        {/* Canvas Grid */}
        <div 
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="card"
          style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: selectedTool ? 'crosshair' : 'default', backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center' }}
        >
          {nodes.length === 0 && !selectedTool && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-muted)', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
              <Activity size={48} />
              Select a component to architect your network overlay.
            </div>
          )}
          {nodes.map(node => (
            <div 
              key={node.id}
              className="fade-in"
              style={{ 
                position: 'absolute', left: node.x - 25, top: node.y - 25,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                zIndex: 10
              }}
            >
              <div style={{ 
                width: '50px', height: '50px', background: 'var(--bg-dark)', 
                border: '2px solid var(--accent-cyan)', borderRadius: '12px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                boxShadow: '0 0 15px rgba(0,240,255,0.2)', transition: 'transform 0.2s' 
              }}>
                {node.type === 'router' && <Activity size={24} color="var(--accent-cyan)" />}
                {node.type === 'switch' && <Server size={24} color="var(--text-primary)" />}
                {node.type === 'pc' && <Monitor size={24} color="var(--text-primary)" />}
              </div>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-lighter)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-color)', whiteSpace: 'nowrap', fontWeight: '500' }}>
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
