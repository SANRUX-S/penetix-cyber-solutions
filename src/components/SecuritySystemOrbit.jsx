import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Mail, Globe, Database, HardDrive, Smartphone, Key } from 'lucide-react';

const layers=[
  {label:'Identity',icon:Key,desc:'Strengthen identity controls and protect privileged access.'},
  {label:'Website',icon:Globe,desc:'Reduce exposure across public websites and web applications.'},
  {label:'Email',icon:Mail,desc:'Protect your communication and prevent unauthorized access.'},
  {label:'Data',icon:Database,desc:'Keep important information protected and recoverable.'},
  {label:'Backups',icon:HardDrive,desc:'Maintain tested backups for practical recovery.'},
  {label:'Devices',icon:Smartphone,desc:'Improve endpoint hygiene and device security.'},
  {label:'Access',icon:Shield,desc:'Apply least privilege and safer access controls.'},
];
const positions=[
  {left:'27%',top:'6%'},{left:'73%',top:'6%'},{left:'86%',top:'42%'},{left:'79%',top:'79%'},{left:'50%',top:'95%'},{left:'18%',top:'78%'},{left:'11%',top:'43%'}
];

export function SecuritySystemOrbit({onExploreApproach}){
  const [active,setActive]=useState(2);
  const item=layers[active];
  const Icon=item.icon;
  const move=(d)=>setActive(v=>(v+d+layers.length)%layers.length);
  return <section id="approach" className="px-system">
    <div className="container px-system-grid">
      <div className="px-system-copy">
        <div className="px-kicker" style={{color:'#d6e6df',marginBottom:0}}>SECURITY IN MOTION</div>
        <h2>Security is a system.</h2>
        <p>Strong security comes from multiple layers working together.</p>
        <button className="btn-outline" onClick={onExploreApproach}>Explore Our Approach <ArrowRight size={13}/></button>
      </div>
      <div className="px-orbit-wrap">
        <div className="px-orbit">
          <div className="px-orbit-ring"/>
          <div className="px-orbit-ring r2"/>
          <div className="px-orbit-ring r3"/>
          <div className="px-core"><span className="px-core-mark">P</span></div>
          {layers.map((l,i)=><div className="px-node" style={positions[i]} key={l.label} onClick={()=>setActive(i)}>
            {i<2 || i===6 || i===5 ? <span>{l.label}</span> : null}
            <span className="px-node-dot" style={i===active?{background:'#a6ffc6',boxShadow:'0 0 12px #73ffac'}:{}}/>
            {i>=2 && i!==5 && i!==6 ? <span>{l.label}</span> : null}
          </div>)}
        </div>
      </div>
      <div className="px-system-card">
        <div className="px-inspector-label">A STRONGER, MORE RESILIENT BUSINESS</div>
        <div className="px-inspector">
          <div className="px-inspector-icon"><Icon size={22}/></div>
          <div style={{flex:1}}>
            <h3>{item.label}</h3>
            <p>{item.desc}</p>
            <div className="px-system-controls">
              <button className="px-control" onClick={()=>move(-1)}><ChevronLeft size={12}/></button>
              <button className="px-control" onClick={()=>move(1)}><ChevronRight size={12}/></button>
              <span className="px-system-count">{String(active+1).padStart(2,'0')} / 07</span>
            </div>
          </div>
        </div>
        <div className="px-system-caption">Each layer matters. Stronger together.</div>
      </div>
    </div>
  </section>
}
