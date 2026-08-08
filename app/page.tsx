'use client';

import { useState } from 'react';

const campaigns = [
  { brand: 'StudyFetch', title: 'Back to School Campaign', type: 'UGC • High Volume', budget: '$1,000 / month', status: 'Active', icon: '📚' },
  { brand: 'LumaFit', title: '30-Day Fitness Challenge', type: 'UGC • TikTok', budget: '$750 / month', status: 'Draft', icon: '⚡' },
  { brand: 'NoteFlow', title: 'Student Productivity Push', type: 'UGC • Reels', budget: '$1,500 / month', status: 'Active', icon: '✦' },
];

export default function Home() {
  const [tab, setTab] = useState('Campaigns');
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true); setResult('');
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ prompt }) });
      const data = await r.json();
      setResult(data.text || data.error || 'No result generated.');
    } catch { setResult('Generation failed. Check your API configuration.'); }
    finally { setLoading(false); }
  }

  return <main>
    <header className="topbar">
      <div className="logo"><span className="logoMark">✦</span> AdForge <b>AI</b></div>
      <nav>{['Overview','Campaigns','Creators','Analytics'].map(x => <button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</nav>
      <div className="right"><span className="credits">✦ 120 credits</span><button className="avatar">WA</button></div>
    </header>

    <section className="hero">
      <div><div className="eyebrow">AI-POWERED CREATIVE STUDIO</div><h1>Turn a product into<br/><em>scroll-stopping ads.</em></h1><p>Generate UGC concepts, scripts, hooks and complete campaign briefs in seconds — then manage your creators in one place.</p><button className="primary" onClick={()=>setShowCreate(true)}>＋ Create campaign</button></div>
      <div className="heroCard"><div className="miniTop"><span>AI CAMPAIGN BRIEF</span><span>● LIVE</span></div><div className="adMock"><div className="adBadge">UGC</div><h3>“I wish I found this<br/>before my finals.”</h3><p>3 hooks · 5 concepts · 30 creators</p><div className="mockButtons"><span>Generate script</span><span>↗</span></div></div></div>
    </section>

    <section className="workspace">
      <div className="sectionHead"><div><h2>{tab === 'Campaigns' ? 'Your campaigns' : tab}</h2><p>Manage your creative campaigns and track performance.</p></div><button className="secondary" onClick={()=>setShowCreate(true)}>＋ New campaign</button></div>
      <div className="stats"><div><small>ACTIVE CAMPAIGNS</small><strong>04</strong><span>↗ 12% this month</span></div><div><small>CREATOR APPLICATIONS</small><strong>186</strong><span>↗ 28% this month</span></div><div><small>CONTENT GENERATED</small><strong>342</strong><span>↗ 19% this month</span></div><div><small>AVG. ROAS</small><strong>4.8×</strong><span>↗ 0.6× this month</span></div></div>
      <div className="cards">{campaigns.map((c,i)=><article className="campaign" key={c.title}><div className="brandIcon">{c.icon}</div><div className="campaignBody"><div className="campaignTitle"><div><small>{c.brand}</small><h3>{c.title}</h3></div><span className={c.status==='Active'?'live':'draft'}>{c.status}</span></div><p>{c.type}</p><div className="campaignBottom"><b>{c.budget}</b><button>View campaign →</button></div></div></article>)}</div>
    </section>

    <section className="generator"><div><div className="eyebrow">CREATIVE COPILOT</div><h2>Have an idea? <em>Let AI build it.</em></h2><p>Describe your product, audience and goal. AdForge will turn it into ready-to-film UGC concepts.</p></div><div className="generatorBox"><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. A study app for university students who want better grades..."/><button className="primary" onClick={generate} disabled={loading}>{loading?'Generating…':'Generate concepts ✦'}</button>{result && <pre>{result}</pre>}</div></section>

    {showCreate && <div className="modalShade" onClick={()=>setShowCreate(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowCreate(false)}>×</button><div className="eyebrow">NEW CAMPAIGN</div><h2>Create your next campaign</h2><p>Start with the basics. AI will help you build the creative brief.</p><label>Brand name<input placeholder="e.g. StudyFetch"/></label><label>Campaign goal<input placeholder="e.g. Drive app signups"/></label><label>Budget<input placeholder="$1,000 / month"/></label><button className="primary full" onClick={()=>{setCreated(true);setShowCreate(false)}}>{created?'Created!':'Create campaign ✦'}</button></div></div>}
  </main>
}
