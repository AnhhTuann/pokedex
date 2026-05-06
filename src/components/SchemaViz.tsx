import React from 'react';
import { motion } from 'motion/react';
import { Network, Database, Layers, Zap } from 'lucide-react';

const Node = ({ x, y, label, icon: Icon, active, secondary, ...props }: { x: number, y: number, label: string, icon: any, active?: boolean, secondary?: boolean, key?: string | number }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <circle
      cx={x}
      cy={y}
      r="28"
      className={`${active ? 'fill-indigo-600 ring-4 ring-indigo-100' : secondary ? 'fill-pink-500 ring-4 ring-pink-100' : 'fill-white'} stroke-slate-200`}
      style={{ strokeWidth: 2 }}
    />
    <foreignObject x={x - 12} y={y - 12} width="24" height="24">
      <Icon className={`w-6 h-6 ${active || secondary ? 'text-white' : 'text-slate-400'}`} />
    </foreignObject>
    <text
      x={x}
      y={y + 45}
      textAnchor="middle"
      className="text-[10px] font-sans uppercase tracking-widest font-bold fill-slate-500"
    >
      {label}
    </text>
  </motion.g>
);

const Connection = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2: number, y2: number }) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    className="stroke-indigo-400/20 graph-line"
    strokeWidth="2"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  />
);

export default function SchemaViz() {
  const nodes = [
    { id: 'query', label: 'Query', x: 100, y: 150, icon: SearchIcon },
    { id: 'pokemon', label: 'Pokemon', x: 250, y: 150, icon: Database, active: true },
    { id: 'types', label: 'Types', x: 400, y: 80, icon: Layers },
    { id: 'stats', label: 'Stats', x: 400, y: 150, icon: Zap },
    { id: 'evo', label: 'Evolutions', x: 400, y: 220, icon: Network, secondary: true },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden relative shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-bold tracking-tight">Efficient Data Fetching</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">VIA GRAPHQL SCHEMA</p>
      </div>

      <div className="flex-1 min-h-[300px] relative mt-4">
        <svg viewBox="0 0 500 300" className="w-full h-full">
          <Connection x1={100} y1={150} x2={250} y2={150} />
          <Connection x1={250} y1={150} x2={400} y2={80} />
          <Connection x1={250} y1={150} x2={400} y2={150} />
          <Connection x1={250} y1={150} x2={400} y2={220} />
          
          {nodes.map(node => (
            <Node 
              key={node.id} 
              x={node.x} 
              y={node.y} 
              label={node.label} 
              icon={node.icon} 
              active={node.active}
              secondary={node.secondary} 
            />
          ))}
        </svg>
      </div>

      <div className="pt-6 border-t border-slate-100 space-y-3">
        <div className="bg-slate-50 p-4 rounded-xl">
           <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-bold uppercase text-slate-600">API ONLINE (GQL V2.4)</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
             <span className="text-[10px] font-bold uppercase text-slate-600">REACT 18 CONCURRENT READY</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
