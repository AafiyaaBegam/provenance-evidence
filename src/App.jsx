import { useState, useEffect, useRef } from 'react'

// ─── Demo data ─────────────────────────────────────────────────────────────
const EVIDENCE_ITEMS = [
  {
    id: 'EV-001',
    type: 'Dataset',
    title: 'Urban Temperature Dataset — SAMPLE',
    source: 'Fictional Climate Data Institute (SAMPLE)',
    date: '2024-03-15',
    confidence: 90,
    tags: ['quantitative', 'sample'],
    icon: '📊',
    color: '#06b6d4',
  },
  {
    id: 'EV-002',
    type: 'Research Report',
    title: 'Climate Research Report — SAMPLE',
    source: 'Invented Urban Studies Group (SAMPLE)',
    date: '2024-01-20',
    confidence: 82,
    tags: ['analytical', 'sample'],
    icon: '📋',
    color: '#f59e0b',
  },
  {
    id: 'EV-003',
    type: 'Chart',
    title: 'Urban Temperature Trend Chart — SAMPLE',
    source: 'Fictional Analytics Lab (SAMPLE)',
    date: '2024-04-02',
    confidence: 85,
    tags: ['visual', 'sample'],
    icon: '📈',
    color: '#f43f5e',
  },
  {
    id: 'EV-004',
    type: 'Source Record',
    title: 'Sensor Source Record — SAMPLE',
    source: 'Imaginary IoT Sensor Network (SAMPLE)',
    date: '2023-11-08',
    confidence: 78,
    tags: ['archival', 'sample'],
    icon: '🗂',
    color: '#a78bfa',
  },
]

const STATS = [
  { label: 'Evidence Items', value: '2,847', delta: '+12 today', color: '#8b5cf6' },
  { label: 'Sources Indexed', value: '641', delta: '+3 today', color: '#06b6d4' },
  { label: 'Avg. Confidence', value: '89.4%', delta: '↑ 1.2%', color: '#10b981' },
  { label: 'Traceability Score', value: '96.1', delta: 'Excellent', color: '#f59e0b' },
]

// ─── Evidence Network SVG ──────────────────────────────────────────────────
const NODES = [
  { id: 'conclusion', label: 'CONCLUSION', x: 340, y: 220, r: 48, color: '#8b5cf6', glow: '#8b5cf6', main: true },
  { id: 'doc',    label: 'DOCUMENT',      x: 120, y: 80,  r: 32, color: '#6366f1', icon: '📄' },
  { id: 'photo',  label: 'PHOTOGRAPH',    x: 560, y: 80,  r: 32, color: '#06b6d4', icon: '🖼' },
  { id: 'data',   label: 'DATASET',       x: 640, y: 240, r: 32, color: '#10b981', icon: '📊' },
  { id: 'report', label: 'REPORT',        x: 530, y: 380, r: 32, color: '#f59e0b', icon: '📋' },
  { id: 'chart',  label: 'CHART',         x: 160, y: 380, r: 32, color: '#f43f5e', icon: '📈' },
  { id: 'src',    label: 'SOURCE\nRECORD', x: 60,  y: 240, r: 32, color: '#a78bfa', icon: '🗂' },
]

function EvidenceNetwork() {
  const conclusion = NODES[0]
  const satellites = NODES.slice(1)
  const [hovered, setHovered] = useState(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full flex justify-center items-center" style={{ minHeight: 460 }}>
      {/* Background glow */}
      <div
        className="hero-orb"
        style={{ width: 420, height: 420, background: 'rgba(139,92,246,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />
      <svg
        viewBox="0 0 700 460"
        className="w-full max-w-2xl"
        style={{ overflow: 'visible' }}
        aria-label="Evidence provenance network"
      >
        <defs>
          {NODES.map(n => (
            <radialGradient key={n.id} id={`glow-${n.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="blur-sm">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Edges */}
        {satellites.map((node, i) => {
          const isHov = hovered === node.id
          return (
            <g key={node.id}>
              {/* Glow duplicate */}
              <line
                x1={conclusion.x} y1={conclusion.y}
                x2={node.x} y2={node.y}
                stroke={node.color}
                strokeWidth={isHov ? 3 : 1.5}
                strokeOpacity={isHov ? 0.6 : 0.2}
                filter="url(#blur-sm)"
              />
              {/* Crisp edge */}
              <line
                x1={conclusion.x} y1={conclusion.y}
                x2={node.x} y2={node.y}
                stroke={node.color}
                strokeWidth={isHov ? 2 : 1}
                strokeOpacity={isHov ? 0.9 : 0.45}
                strokeDasharray={animated ? 'none' : '300'}
                style={animated ? {} : {
                  strokeDashoffset: 300,
                  animation: `edgeDraw 1.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s forwards`,
                }}
              />
            </g>
          )
        })}

        {/* Satellite nodes */}
        {satellites.map((node, i) => (
          <g
            key={node.id}
            style={{ cursor: 'pointer', animation: `floatNode ${4.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Glow circle */}
            <circle cx={node.x} cy={node.y} r={node.r + 14} fill={`url(#glow-${node.id})`} />
            {/* Ring */}
            <circle
              cx={node.x} cy={node.y} r={node.r + 2}
              fill="none"
              stroke={node.color}
              strokeWidth={hovered === node.id ? 1.5 : 0.8}
              strokeOpacity={hovered === node.id ? 0.8 : 0.3}
            />
            {/* Body */}
            <circle
              cx={node.x} cy={node.y} r={node.r}
              fill={hovered === node.id ? `${node.color}22` : '#0d0d1a'}
              stroke={node.color}
              strokeWidth={hovered === node.id ? 2 : 1}
              strokeOpacity={0.7}
              style={{ transition: 'all 0.2s' }}
            />
            {/* Icon */}
            <text x={node.x} y={node.y - 6} textAnchor="middle" fontSize="16" dominantBaseline="middle">
              {node.icon}
            </text>
            {/* Label */}
            {node.label.split('\n').map((line, li) => (
              <text
                key={li}
                x={node.x}
                y={node.y + 14 + li * 11}
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="'Inter', sans-serif"
                fontWeight="600"
                letterSpacing="0.08em"
                fill={node.color}
                fillOpacity="0.9"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Central CONCLUSION node */}
        <g style={{ cursor: 'default' }}>
          {/* Pulse rings */}
          <circle cx={conclusion.x} cy={conclusion.y} r={conclusion.r + 6}
            fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.15"
            style={{ animation: 'nodeRing 2.8s ease-out 0s infinite' }}
          />
          <circle cx={conclusion.x} cy={conclusion.y} r={conclusion.r + 6}
            fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.1"
            style={{ animation: 'nodeRing 2.8s ease-out 0.9s infinite' }}
          />
          {/* Glow */}
          <circle cx={conclusion.x} cy={conclusion.y} r={conclusion.r + 20} fill="url(#glow-conclusion)" />
          {/* Ring */}
          <circle cx={conclusion.x} cy={conclusion.y} r={conclusion.r + 3}
            fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.4"
          />
          {/* Body */}
          <circle cx={conclusion.x} cy={conclusion.y} r={conclusion.r}
            fill="#14102a" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.85"
          />
          {/* Label */}
          <text x={conclusion.x} y={conclusion.y - 6} textAnchor="middle" fontSize="11"
            fontFamily="'Sora','Inter',sans-serif" fontWeight="700" letterSpacing="0.12em"
            fill="#c4b5fd"
          >
            CONCLUSION
          </text>
          <text x={conclusion.x} y={conclusion.y + 10} textAnchor="middle" fontSize="8"
            fontFamily="'Inter',sans-serif" fontWeight="400" letterSpacing="0.06em"
            fill="#8b5cf6" fillOpacity="0.7"
          >
            DEMO NODE
          </text>
        </g>
      </svg>
    </div>
  )
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <div className="glass-card glass-card-hover rounded-xl p-5 flex flex-col gap-1">
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: stat.color, opacity: 0.8 }}>
        {stat.label}
      </span>
      <span className="text-3xl font-display font-semibold text-white mt-1">
        {stat.value}
      </span>
      <span className="text-xs text-white/40">{stat.delta}</span>
    </div>
  )
}

// ─── Evidence Card ─────────────────────────────────────────────────────────
function EvidenceCard({ item, onClick }) {
  return (
    <div
      className="glass-card glass-card-hover rounded-xl p-5 cursor-pointer select-none"
      onClick={() => onClick(item)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color: item.color }}>
              {item.type}
            </p>
            <p className="text-sm font-medium text-white/90 leading-snug">{item.title}</p>
          </div>
        </div>
        <span
          className="text-xs font-mono shrink-0 mt-0.5 px-2 py-0.5 rounded-full"
          style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}
        >
          {item.confidence}%
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-white/35">
        <span>{item.source}</span>
        <span className="font-mono">{item.date}</span>
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {item.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/8">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Demo provenance data ───────────────────────────────────────────────────
const DEMO_CONCLUSION = {
  id: 'CON-001',
  title: 'The analyzed dataset shows a significant increase in urban temperature over the observed period.',
  summary:
    'FICTIONAL SAMPLE — All sources, dates, confidence values, and relationships shown below are invented demonstration data and are NOT verified real-world evidence.',
  confidence: 88,
  color: '#8b5cf6',
}

const DEMO_CHAIN = [
  { step: 'CONCLUSION', label: 'CON-001', color: '#8b5cf6', icon: '🔮' },
  { step: 'ANALYSIS',   label: 'ANL-044', color: '#6366f1', icon: '🧩' },
  { step: 'DATASET',    label: 'DST-112', color: '#06b6d4', icon: '📊' },
  { step: 'SOURCE RECORDS', label: 'SRC-× 4', color: '#10b981', icon: '🗂' },
]

const DEMO_EVIDENCE = [
  {
    id: 'EV-D01',
    type: 'Dataset',
    title: 'Urban Temperature Dataset — SAMPLE',
    source: 'Fictional Climate Data Institute (SAMPLE)',
    date: '2024-03-15',
    confidence: 90,
    tags: ['quantitative', 'sample'],
    icon: '📊',
    color: '#06b6d4',
    relevance: 'Critical',
    relationship: 'Primary quantitative basis for the conclusion',
  },
  {
    id: 'EV-D02',
    type: 'Report',
    title: 'Climate Research Report — SAMPLE',
    source: 'Invented Urban Studies Group (SAMPLE)',
    date: '2024-01-20',
    confidence: 82,
    tags: ['analytical', 'sample'],
    icon: '📋',
    color: '#f59e0b',
    relevance: 'High',
    relationship: 'Corroborates trend identified in dataset',
  },
  {
    id: 'EV-D03',
    type: 'Chart',
    title: 'Urban Temperature Trend Chart — SAMPLE',
    source: 'Fictional Analytics Lab (SAMPLE)',
    date: '2024-04-02',
    confidence: 85,
    tags: ['visual', 'sample'],
    icon: '📈',
    color: '#f43f5e',
    relevance: 'High',
    relationship: 'Visualises the upward temperature trend',
  },
  {
    id: 'EV-D04',
    type: 'Source Record',
    title: 'Sensor Source Record — SAMPLE',
    source: 'Imaginary IoT Sensor Network (SAMPLE)',
    date: '2023-11-08',
    confidence: 78,
    tags: ['archival', 'sample'],
    icon: '🗂',
    color: '#a78bfa',
    relevance: 'Supporting',
    relationship: 'Raw sensor readings underlying the dataset',
  },
]

// ─── Demo Modal ─────────────────────────────────────────────────────────────
function DemoModal({ onClose }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  const relevanceColor = r =>
    r === 'Critical' ? '#f43f5e' :
    r === 'High'     ? '#f59e0b' :
    r === 'Medium'   ? '#06b6d4' : '#a78bfa'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(4,4,12,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.28s ease',
      }}
      onClick={handleClose}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-2xl relative overflow-hidden"
        style={{
          border: '1px solid rgba(139,92,246,0.3)',
          boxShadow: '0 0 80px rgba(139,92,246,0.18)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
          transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease',
          opacity: visible ? 1 : 0,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 pt-6 pb-4"
          style={{ background: 'rgba(8,8,20,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pill" style={{ fontSize: '0.68rem', padding: '3px 10px', letterSpacing: '0.1em' }}>
                  ⚠ DEMO / SAMPLE DATA
                </span>
              </div>
              <h2 className="text-white font-display font-semibold text-lg leading-snug">
                {DEMO_CONCLUSION.title}
              </h2>
              <p className="text-xs text-white/40 mt-1 leading-relaxed max-w-lg">
                {DEMO_CONCLUSION.summary}
              </p>
            </div>
            <span
              className="text-xs font-mono shrink-0 px-2.5 py-1 rounded-full mt-1"
              style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.35)' }}
            >
              {DEMO_CONCLUSION.confidence}% conf.
            </span>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Provenance chain */}
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Provenance Chain</p>
            <div className="flex items-center gap-0 flex-wrap">
              {DEMO_CHAIN.map((node, i) => (
                <div key={node.step} className="flex items-center">
                  <div
                    className="rounded-lg px-3 py-2 text-center demo-chain-node"
                    style={{
                      background: `${node.color}12`,
                      border: `1px solid ${node.color}35`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  >
                    <div className="text-base mb-0.5">{node.icon}</div>
                    <p className="text-xs font-mono font-bold tracking-widest" style={{ color: node.color, fontSize: '0.6rem' }}>
                      {node.step}
                    </p>
                    <p className="text-xs text-white/35 font-mono" style={{ fontSize: '0.62rem' }}>{node.label}</p>
                  </div>
                  {i < DEMO_CHAIN.length - 1 && (
                    <div className="mx-1.5 flex items-center" style={{ color: 'rgba(255,255,255,0.18)' }}>
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M1 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Evidence items */}
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">
              Evidence Items — click to inspect
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEMO_EVIDENCE.map((item, i) => (
                <button
                  key={item.id}
                  className="text-left rounded-xl p-3.5 demo-ev-card"
                  style={{
                    background: selectedEvidence?.id === item.id ? `${item.color}12` : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${selectedEvidence?.id === item.id ? item.color + '45' : 'rgba(255,255,255,0.07)'}`,
                    transition: 'all 0.2s',
                    animationDelay: `${0.1 + i * 0.07}s`,
                  }}
                  onClick={() => setSelectedEvidence(selectedEvidence?.id === item.id ? null : item)}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: item.color, fontSize: '0.6rem' }}>
                        {item.type}
                      </span>
                    </div>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                      style={{ background: `${relevanceColor(item.relevance)}18`, color: relevanceColor(item.relevance), border: `1px solid ${relevanceColor(item.relevance)}30`, fontSize: '0.62rem' }}
                    >
                      {item.relevance}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs font-medium leading-snug mb-1">{item.title}</p>
                  <p className="text-white/30 text-xs">{item.source} · {item.date}</p>

                  {/* Expanded detail */}
                  {selectedEvidence?.id === item.id && (
                    <div
                      className="mt-3 pt-3 space-y-1.5 demo-ev-detail"
                      style={{ borderTop: `1px solid ${item.color}20` }}
                    >
                      {[
                        ['Confidence', `${item.confidence}%`],
                        ['Relevance', item.relevance],
                        ['Relationship', item.relationship],
                        ['Status', 'Sample / Demo Data'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center">
                          <span className="text-white/30 text-xs">{k}</span>
                          <span className="text-white/70 text-xs font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/20 text-center pb-1">
            ⓘ All records shown are sample data for demonstration purposes only.
          </p>
        </div>

        {/* Close button */}
        <div
          className="sticky bottom-0 px-6 py-4 flex justify-center"
          style={{ background: 'rgba(8,8,20,0.92)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            className="btn-secondary"
            style={{ padding: '9px 28px', fontSize: '0.82rem' }}
            onClick={handleClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Close Demo
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Evidence Detail Modal ──────────────────────────────────────────────────
function EvidenceModal({ item, onClose }) {
  if (!item) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,4,12,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl p-7 max-w-md w-full relative"
        style={{ border: `1px solid ${item.color}40`, boxShadow: `0 0 60px ${item.color}25` }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: item.color }}>{item.type}</p>
            <h3 className="text-white font-semibold leading-snug">{item.title}</h3>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          {[
            ['Evidence ID', item.id],
            ['Source', item.source],
            ['Date Recorded', item.date],
            ['Confidence Score', `${item.confidence}%`],
            ['Tags', item.tags.join(', ')],
            ['Status', 'Sample / Demo Data'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/40">{k}</span>
              <span className="text-white/80 font-medium text-right">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/25 text-center">
          ⓘ This record contains sample data for demonstration purposes.
        </p>
      </div>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar({ activeNav, setActiveNav }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['Dashboard', 'Evidence', 'Sources', 'About']

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(8,8,15,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActiveNav('Dashboard')}
          className="flex items-center gap-2.5 focus:outline-none"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.5" />
            <circle cx="14" cy="14" r="5" fill="#8b5cf6" />
            <line x1="14" y1="9"  x2="14" y2="3"  stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="19" x2="14" y2="25" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9"  y1="14" x2="3"  y2="14" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="19" y1="14" x2="25" y2="14" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span
            className="font-display font-semibold tracking-widest text-sm"
            style={{ color: '#e8e8f0', letterSpacing: '0.18em' }}
          >
            PROVENANCE
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l}
              onClick={() => setActiveNav(l)}
              className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                color: activeNav === l ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                background: activeNav === l ? 'rgba(139,92,246,0.1)' : 'transparent',
                fontWeight: activeNav === l ? '500' : '400',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="pill">Beta</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="7"  x2="19" y2="7"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {links.map(l => (
            <button
              key={l}
              onClick={() => { setActiveNav(l); setMenuOpen(false) }}
              className="text-left px-4 py-2.5 rounded-lg text-sm transition-all"
              style={{
                color: activeNav === l ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                background: activeNav === l ? 'rgba(139,92,246,0.08)' : 'transparent',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Dashboard View ────────────────────────────────────────────────────────
function DashboardView({ onExplore, onViewItem, onViewDemo }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="hero-orb" style={{ width: 600, height: 600, background: 'rgba(139,92,246,0.1)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="hero-orb" style={{ width: 300, height: 300, background: 'rgba(6,182,212,0.07)', top: 120, right: 80 }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center stagger">
          <div className="pill mx-auto mb-6" style={{ width: 'fit-content' }}>
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#10b981"/></svg>
            Evidence Intelligence Platform — Demo
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
            <span className="text-white">Trace Every</span>
            <br />
            <span className="text-gradient-violet">Conclusion.</span>
          </h1>

          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            PROVENANCE connects conclusions to their underlying evidence and source records —
            mapping the full chain of reasoning in a single, navigable view.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary" onClick={onExplore}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 8L8 14M2 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Explore Evidence
            </button>
            <button className="btn-secondary" onClick={onViewDemo}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/>
              </svg>
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-3 text-center">Sample metrics — fictional demonstration data</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
          {STATS.map(s => <StatCard key={s.label} stat={s} />)}
        </div>
      </section>

      {/* Evidence network visual */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div
          className="glass-card rounded-2xl p-6 md:p-10"
          style={{ border: '1px solid rgba(139,92,246,0.15)' }}
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-1">Live View</p>
              <h2 className="text-xl font-display font-semibold text-white">Evidence Provenance Network</h2>
            </div>
            <span className="pill">6 nodes · Sample data</span>
          </div>
          <EvidenceNetwork />
          <p className="text-center text-xs text-white/25 mt-4">
            Hover over nodes to highlight connections. All data shown is for demonstration purposes.
          </p>
        </div>
      </section>

      {/* Recent evidence */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-1">Sample Records</p>
            <h2 className="text-xl font-display font-semibold text-white">Recent Evidence</h2>
          </div>
          <button
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            onClick={onExplore}
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {EVIDENCE_ITEMS.map(item => (
            <EvidenceCard key={item.id} item={item} onClick={onViewItem} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Evidence View ──────────────────────────────────────────────────────────
function EvidenceView({ onViewItem }) {
  const [filter, setFilter] = useState('All')
  const types = ['All', ...new Set(EVIDENCE_ITEMS.map(i => i.type))]
  const filtered = filter === 'All' ? EVIDENCE_ITEMS : EVIDENCE_ITEMS.filter(i => i.type === filter)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-8 stagger">
        <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-1">Repository</p>
        <h1 className="text-3xl font-display font-semibold text-white mb-6">Evidence Library</h1>
        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: filter === t ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === t ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: filter === t ? '#a78bfa' : 'rgba(255,255,255,0.45)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {filtered.map(item => (
          <EvidenceCard key={item.id} item={item} onClick={onViewItem} />
        ))}
      </div>
      <p className="mt-8 text-xs text-white/20 text-center">
        Showing {filtered.length} sample {filtered.length === 1 ? 'record' : 'records'} for demonstration purposes only.
      </p>
    </div>
  )
}

// ─── Source data ─────────────────────────────────────────────────────────────
const SOURCE_ITEMS = [
  {
    id: 'SRC-001',
    name: 'Fictional Climate Data Institute (SAMPLE)',
    type: 'Research Institute',
    color: '#06b6d4',
    count: 1,
    confidence: 90,
    date: '2024-03-15',
    relatedEvidence: ['Urban Temperature Dataset — SAMPLE'],
    description: 'Fictional organisation — invented for demonstration purposes only.',
  },
  {
    id: 'SRC-002',
    name: 'Invented Urban Studies Group (SAMPLE)',
    type: 'Academic Group',
    color: '#f59e0b',
    count: 1,
    confidence: 82,
    date: '2024-01-20',
    relatedEvidence: ['Climate Research Report — SAMPLE'],
    description: 'Fictional organisation — invented for demonstration purposes only.',
  },
  {
    id: 'SRC-003',
    name: 'Fictional Analytics Lab (SAMPLE)',
    type: 'Analytics Lab',
    color: '#f43f5e',
    count: 1,
    confidence: 85,
    date: '2024-04-02',
    relatedEvidence: ['Urban Temperature Trend Chart — SAMPLE'],
    description: 'Fictional organisation — invented for demonstration purposes only.',
  },
  {
    id: 'SRC-004',
    name: 'Imaginary IoT Sensor Network (SAMPLE)',
    type: 'Sensor Network',
    color: '#a78bfa',
    count: 1,
    confidence: 78,
    date: '2023-11-08',
    relatedEvidence: ['Sensor Source Record — SAMPLE'],
    description: 'Fictional organisation — invented for demonstration purposes only.',
  },
]

// ─── Source Detail Modal ─────────────────────────────────────────────────────
function SourceModal({ source, onClose }) {
  if (!source) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,4,12,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl p-7 max-w-md w-full relative"
        style={{ border: `1px solid ${source.color}40`, boxShadow: `0 0 60px ${source.color}25` }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display font-bold shrink-0"
            style={{ background: `${source.color}18`, border: `1px solid ${source.color}40`, color: source.color }}
          >
            {source.name[0]}
          </div>
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: source.color }}>
              {source.type}
            </p>
            <h3 className="text-white font-semibold leading-snug text-sm">{source.name}</h3>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          {[
            ['Source ID', source.id],
            ['Category', source.type],
            ['Related Evidence', source.relatedEvidence.join(', ')],
            ['Sample Date', source.date],
            ['Record Count', `${source.count} (sample)`],
            ['Confidence', `${source.confidence}%`],
            ['Status', 'Sample / Demo Data'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
              <span className="text-white/40 shrink-0">{k}</span>
              <span className="text-white/80 font-medium text-right text-xs">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/25 text-center">
          ⓘ This source is fictional demonstration data and does not represent a real organisation.
        </p>
      </div>
    </div>
  )
}

// ─── Sources View ───────────────────────────────────────────────────────────
function SourcesView({ onViewSource }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-8 stagger">
        <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-1">Index · Sample Data</p>
        <h1 className="text-3xl font-display font-semibold text-white">Source Registry</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
        {SOURCE_ITEMS.map(s => (
          <button
            key={s.id}
            className="glass-card glass-card-hover rounded-xl p-5 flex items-center gap-5 text-left w-full"
            onClick={() => onViewSource(s)}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 font-display font-bold"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color }}
            >
              {s.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/85 font-medium text-sm leading-snug truncate">{s.name}</p>
              <p className="text-xs text-white/35 mt-0.5">{s.count} record · {s.type}</p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full shrink-0"
              style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
            >
              {s.type}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-8 text-xs text-white/20 text-center">
        All sources shown are fictional sample data for demonstration purposes only.
      </p>
    </div>
  )
}

// ─── About View ─────────────────────────────────────────────────────────────
function AboutView() {
  const principles = [
    { icon: '🔍', title: 'Trace', desc: 'Follow every conclusion back through its chain of evidence to original source records.' },
    { icon: '🔗', title: 'Connect', desc: 'Map relationships between disparate evidence items into a coherent provenance graph.' },
    { icon: '✦', title: 'Verify', desc: 'Assess confidence levels and traceability scores across the full evidence network.' },
    { icon: '📐', title: 'Explain', desc: 'Surface the reasoning behind any conclusion in a human-readable, auditable format.' },
  ]
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <div className="text-center mb-16 stagger">
        <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">About the Platform</p>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6">
          What is <span className="text-gradient-violet">PROVENANCE?</span>
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto leading-relaxed text-base">
          PROVENANCE is an evidence intelligence platform designed to make the origins of
          conclusions transparent, traceable, and auditable. It maps the provenance chain
          from source records through evidence to the conclusions they support.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger">
        {principles.map(p => (
          <div key={p.title} className="glass-card glass-card-hover rounded-xl p-6">
            <div className="text-2xl mb-3">{p.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
      <div
        className="mt-10 glass-card rounded-2xl p-6 text-center"
        style={{ border: '1px solid rgba(139,92,246,0.15)' }}
      >
        <p className="text-white/30 text-sm">
          This application is a hackathon prototype. All data, records, and scores
          shown are sample / demonstration content and do not represent real-world verified information.
        </p>
      </div>
    </div>
  )
}

// ─── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null)
  const [demoOpen, setDemoOpen] = useState(false)

  const handleExplore = () => setActiveNav('Evidence')

  return (
    <div style={{ minHeight: '100vh', background: '#08080f' }}>
      <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />

      <main>
        {activeNav === 'Dashboard' && (
          <DashboardView onExplore={handleExplore} onViewItem={setSelectedItem} onViewDemo={() => setDemoOpen(true)} />
        )}
        {activeNav === 'Evidence' && (
          <EvidenceView onViewItem={setSelectedItem} />
        )}
        {activeNav === 'Sources' && <SourcesView onViewSource={setSelectedSource} />}
        {activeNav === 'About' && <AboutView />}
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(8,8,15,0.9)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="5" fill="#8b5cf6" fillOpacity="0.6"/>
              <line x1="14" y1="9" x2="14" y2="3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
              <line x1="14" y1="19" x2="14" y2="25" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
              <line x1="9" y1="14" x2="3" y2="14" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
              <line x1="19" y1="14" x2="25" y2="14" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
            </svg>
            <span className="font-mono tracking-widest" style={{ letterSpacing: '0.15em' }}>PROVENANCE</span>
          </div>
          <span>Evidence Intelligence Platform · Hackathon Prototype · Demo Data Only</span>
          <span>© 2026 PROVENANCE</span>
        </div>
      </footer>

      {/* Evidence detail modal */}
      {selectedItem && (
        <EvidenceModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Source detail modal */}
      {selectedSource && (
        <SourceModal source={selectedSource} onClose={() => setSelectedSource(null)} />
      )}

      {/* Demo modal */}
      {demoOpen && (
        <DemoModal onClose={() => setDemoOpen(false)} />
      )}
    </div>
  )
}
