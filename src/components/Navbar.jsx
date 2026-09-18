import React, { useState, useEffect } from 'react';
import { PenetixLogo } from './BrandLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Navbar({ onOpenAssessment }) {
  const [isScrolled,setIsScrolled]=useState(false);
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
  let path=(window.location.pathname.replace(/\/+$/,'')||'/').toLowerCase();
  if(path==='/about') path='/company';
  if(path==='/hosting') path='/services';
  if(path==='/solutions') path='/approach';

  useEffect(()=>{
    const f=()=>setIsScrolled(window.scrollY>20);
    f();
    window.addEventListener('scroll',f);
    return()=>window.removeEventListener('scroll',f);
  },[]);

  const links=[
    ['Home','/'],
    ['Services','/services'],
    ['Approach','/approach'],
    ['Company','/company'],
    ['Resources','/resources'],
    ['Contact','/contact'],
  ];

  return <header className="reference-navbar" style={{
      position:'sticky',top:0,zIndex:50,
      backgroundColor:isScrolled?'rgba(248,246,241,.95)':'rgba(248,246,241,.90)',
      backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',
      borderBottom:'1px solid rgba(12,40,35,.08)',transition:'all .3s',padding:'10px 0'
    }}>
    <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
      <a href="/" style={{display:'flex',alignItems:'center'}}><PenetixLogo variant="dark"/></a>
      <nav className="desktop-nav" style={{display:'none',alignItems:'center',gap:28}}>
        {links.map(([label,href])=><a key={href} href={href} style={{
          fontSize:'.76rem',fontWeight:path===href?700:500,color:path===href?'#0b312b':'#52605d',position:'relative'
        }}>
          {label}
          {path===href&&<span style={{position:'absolute',left:0,right:0,bottom:-9,height:2,background:'#0b5142'}}/>}
        </a>)}
      </nav>
      <div style={{display:'flex',alignItems:'center',gap:18}}>
        <div className="status-pill status-pill-desktop"><div className="status-dot-pulse"/><span style={{fontSize:'.68rem'}}>Available for Security Assessments</span></div>
        <button onClick={onOpenAssessment} className="btn-primary" style={{padding:'9px 17px',fontSize:'.72rem',borderRadius:8}}>Start an Assessment <ArrowRight size={13}/></button>
        <button className="mobile-toggle-btn" onClick={()=>setMobileMenuOpen(v=>!v)} style={{display:'none',border:0,background:'transparent',padding:5}} aria-label="Toggle navigation menu">
          {mobileMenuOpen?<X size={21}/>:<Menu size={21}/>}
        </button>
      </div>
    </div>
    {mobileMenuOpen&&<div className="mobile-nav-panel">
      {links.map(([label,href])=><a key={href} href={href}>{label}</a>)}
    </div>}
    <style>{`
      .mobile-nav-panel{position:absolute;top:100%;left:12px;right:12px;background:#f8f6f1;border:1px solid rgba(12,40,35,.1);box-shadow:0 15px 30px rgba(15,40,35,.12);padding:12px;display:grid;gap:4px}
      .mobile-nav-panel a{padding:11px 10px;border-bottom:1px solid rgba(12,40,35,.07);font-size:13px;font-weight:650}
      @media(min-width:900px){.desktop-nav{display:flex!important}.mobile-toggle-btn{display:none!important}}
      @media(max-width:899px){.status-pill-desktop{display:none!important}.mobile-toggle-btn{display:block!important}}
    `}</style>
  </header>;
}
