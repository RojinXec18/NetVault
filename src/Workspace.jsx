import { useState, useRef, useEffect } from 'react';
import { Server, Monitor, Activity, Link2, Shield, Cloud } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Workspace() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPreview = searchParams.get('preview') === 'true';

  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const canvasRef = useRef(null);
  
  const [selectedTool, setSelectedTool] = useState(null); // 'router', 'switch', 'pc', 'firewall', 'cloud', 'cable'
  const [connectingNode, setConnectingNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Load preview data if needed
  useEffect(() => {
    if (isPreview && nodes.length === 0) {
      setNodes([
        { id: 1, type: 'cloud', x: 200, y: 100, label: 'WAN Edge' },
        { id: 2, type: 'firewall', x: 200, y: 250, label: 'ASA-5506' },
        { id: 3, type: 'switch', x: 200, y: 400, label: 'Core Switch' },
        { id: 4, type: 'pc', x: 100, y: 550, label: 'VLAN 10' },
        { id: 5, type: 'pc', x: 300, y: 550, label: 'VLAN 20' }
      ]);
      setConnections([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 3, to: 5 }
      ]);
    }
  }, [isPreview, nodes.length]);

  const handleCanvasClick = (e) => {
    if (!selectedTool || selectedTool === 'cable' || selectedTool === 'select') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setNodes([...nodes, { id: Date.now(), type: selectedTool, x, y, label: `${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} ${nodes.length + 1}` }]);
    setSelectedTool('select');
  };

  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation();
    
    if (selectedTool === 'cable') {
      if (!connectingNode) {
        setConnectingNode(nodeId);
      } else if (connectingNode !== nodeId) {
        // Create connection
        const newConn = { from: connectingNode, to: nodeId };
        // Check if exists
        const exists = connections.some(c => (c.from === newConn.from && c.to === newConn.to) || (c.from === newConn.to && c.to === newConn.from));
        if (!exists) {
          setConnections([...connections, newConn]);
        }
        setConnectingNode(null);
        setSelectedTool('select');
      }
    } else {
      setSelectedNodeId(nodeId);
    }
  };

  const handleMouseMove = (e) => {
    if (connectingNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const clearCanvas = () => {
    setNodes([]);
    setConnections([]);
    setConnectingNode(null);
    setSelectedNodeId(null);
  };

  const getNodeIcon = (type, color) => {
    switch (type) {
      case 'router': return <Activity size={24} color={color || "var(--accent-cyan)"} />;
      case 'switch': return <Server size={24} color={color || "var(--text-primary)"} />;
      case 'pc': return <Monitor size={24} color={color || "var(--text-primary)"} />;
      case 'firewall': return <Shield size={24} color="#e74c3c" />;
      case 'cloud': return <Cloud size={24} color="#3498db" />;
      default: return <Server size={24} color="#fff" />;
    }
  };

  // Helper to find node pos for drawing lines
  const getNodePos = (id) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="page-header" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity /> Advanced Topology Canvas</h1>
          <p className="subtitle">Simulate, wire, and config enterprise topologies.</p>
        </div>
        {isPreview && <div style={{ background: 'rgba(0, 240, 255, 0.2)', color: 'var(--accent-cyan)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>READ-ONLY PREVIEW MODE</div>}
      </header>

      <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
        {/* Tool Palette */}
        <div className="card" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Equipment</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button onClick={() => setSelectedTool('router')} className={`tool-btn ${selectedTool === 'router' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'router' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'router' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'router' ? 'var(--accent-cyan)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Activity size={20} /> Router
            </button>
            <button onClick={() => setSelectedTool('switch')} className={`tool-btn ${selectedTool === 'switch' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'switch' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'switch' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'switch' ? 'var(--accent-cyan)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Server size={20} /> Switch
            </button>
            <button onClick={() => setSelectedTool('pc')} className={`tool-btn ${selectedTool === 'pc' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'pc' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'pc' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'pc' ? 'var(--accent-cyan)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Monitor size={20} /> PC
            </button>
            <button onClick={() => setSelectedTool('firewall')} className={`tool-btn ${selectedTool === 'firewall' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'firewall' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'firewall' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'firewall' ? 'var(--accent-cyan)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Shield size={20} /> Firewall
            </button>
            <button onClick={() => setSelectedTool('cloud')} className={`tool-btn ${selectedTool === 'cloud' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'cloud' ? 'var(--accent-cyan)' : 'var(--bg-dark)', color: selectedTool === 'cloud' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'cloud' ? 'var(--accent-cyan)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Cloud size={20} /> Cloud
            </button>
            <button onClick={() => setSelectedTool('cable')} className={`tool-btn ${selectedTool === 'cable' ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: selectedTool === 'cable' ? 'var(--accent-green)' : 'var(--bg-dark)', color: selectedTool === 'cable' ? '#000' : 'var(--text-primary)', border: `1px solid ${selectedTool === 'cable' ? 'var(--accent-green)' : 'var(--border-color)'}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Link2 size={20} /> Cat6 Cable
            </button>
          </div>

          {!isPreview && (
            <div style={{ marginTop: 'auto' }}>
              <button onClick={clearCanvas} className="glow-btn" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,100,100,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,100,100,0.3)' }}>
                Clear Canvas
              </button>
            </div>
          )}
        </div>

        {/* Canvas & Inspector */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Canvas Area */}
          <div 
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            className="card"
            style={{ flex: 3, position: 'relative', overflow: 'hidden', cursor: selectedTool === 'cable' ? 'crosshair' : (selectedTool ? 'cell' : 'default'), backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center' }}
          >
            {/* Draw active connecting line */}
            {connectingNode && (
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                <line x1={getNodePos(connectingNode).x} y1={getNodePos(connectingNode).y} x2={mousePos.x} y2={mousePos.y} stroke="var(--accent-green)" strokeWidth="3" strokeDasharray="5,5" />
              </svg>
            )}

            {/* Draw connections */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
              {connections.map((c, i) => (
                <line key={i} x1={getNodePos(c.from).x} y1={getNodePos(c.from).y} x2={getNodePos(c.to).x} y2={getNodePos(c.to).y} stroke="var(--text-secondary)" strokeWidth="3" />
              ))}
            </svg>

            {nodes.length === 0 && !selectedTool && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-muted)', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
                <Activity size={48} />
                Select equipment to architect your network overlay.
              </div>
            )}
            
            {nodes.map(node => (
              <div 
                key={node.id}
                onClick={(e) => handleNodeClick(e, node.id)}
                className="fade-in"
                style={{ 
                  position: 'absolute', left: node.x - 25, top: node.y - 25,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  zIndex: 10, cursor: 'pointer',
                  transform: selectedNodeId === node.id ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{ 
                  width: '50px', height: '50px', background: 'var(--bg-dark)', 
                  border: `2px solid ${selectedNodeId === node.id ? 'var(--accent-green)' : (node.type === 'firewall' ? '#e74c3c' : (node.type === 'cloud' ? '#3498db' : 'var(--accent-cyan)'))}`, borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  boxShadow: selectedNodeId === node.id ? '0 0 20px rgba(0,255,0,0.4)' : '0 0 15px rgba(0,240,255,0.2)'
                }}>
                  {getNodeIcon(node.type, selectedNodeId === node.id ? 'var(--accent-green)' : null)}
                </div>
                <span style={{ fontSize: '0.75rem', background: selectedNodeId === node.id ? 'var(--accent-green)' : 'var(--bg-lighter)', color: selectedNodeId === node.id ? '#000' : 'var(--text-primary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-color)', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                  {node.label}
                </span>
              </div>
            ))}
          </div>

          {/* Device Inspector */}
          {selectedNode && (
            <div className="card fade-in" style={{ flex: 1, borderTop: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{getNodeIcon(selectedNode.type)} Device Inspector: {selectedNode.label}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Management IP</div>
                  <div style={{ fontFamily: 'monospace', color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>10.0.{selectedNode.id % 255}.1/24</div>
                </div>
                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: 'bold' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 5px var(--accent-green)' }}></div>
                    ONLINE (UP)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
