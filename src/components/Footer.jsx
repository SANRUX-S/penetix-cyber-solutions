import React from 'react';
import { PenetixLogo } from './BrandLogo';

export function Footer(){
  const groups=[
    ['Company',[['About','/about'],['Solutions','/solutions'],['Contact','/contact'],['Start a Project','/start-project']]],
    ['Services',[['Security Services','/services'],['Hosting','/hosting'],['Resources','/resources']]],
    ['Legal',[['Privacy Policy','/privacy'],['Terms of Service','/terms'],['Security Authorization','/security-authorization']]],
  ];
  return <footer style={{background:'#f7f4ee',borderTop:'1px solid rgba(12,40,35,.1)',padding:'28px 0 18px'}}>
    <div className="container footer-route-grid">
      <div><PenetixLogo variant="dark"/><p style={{fontSize:9,color:'#66736f',marginTop:10,maxWidth:250,lineHeight:1.5}}>Practical cybersecurity and technology solutions for growing businesses.</p></div>
      {groups.map(([title,items])=><div key={title}><h5 style={{fontSize:10,marginBottom:9}}>{title}</h5><div style={{display:'grid',gap:6}}>{items.map(([l,h])=><a key={h} href={h} style={{fontSize:9,color:'#56635f'}}>{l}</a>)}</div></div>)}
      <div><h5 style={{fontSize:10,marginBottom:9}}>Follow Us</h5><div style={{fontSize:9,color:'#56635f'}}>LinkedIn · X</div></div>
    </div>
    <div className="container" style={{marginTop:22,paddingTop:12,borderTop:'1px solid rgba(12,40,35,.08)',display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}>
      <span style={{fontSize:8,color:'#6a7672'}}>© 2026 PENETIX. All rights reserved.</span><span style={{fontSize:8,letterSpacing:'.15em',color:'#78837f'}}>A SAFER TOMORROW TOGETHER.</span>
    </div>
    <style>{`.footer-route-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.15fr .8fr;gap:30px}@media(max-width:800px){.footer-route-grid{grid-template-columns:1fr 1fr}}`}</style>
  </footer>
}
