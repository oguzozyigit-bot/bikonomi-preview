import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, TrendingDown, TrendingUp, Star, AlertTriangle, CheckCircle, History } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const mockDrops = [
  { id: 'p1', name: 'Dyson V12 Detect Slim', old: 21999, price: 18999, drop: 13, img: 'https://via.placeholder.com/640x400?text=Dyson+V12' },
  { id: 'p2', name: 'iPhone 14 128GB', old: 39999, price: 34999, drop: 12, img: 'https://via.placeholder.com/640x400?text=iPhone+14' },
  { id: 'p3', name: 'Beko 9kg Çamaşır Mak.', old: 17999, price: 15999, drop: 11, img: 'https://via.placeholder.com/640x400?text=Beko+9kg' },
]

const mockHistory = [
  { date: '01 Eyl', price: 41999 },
  { date: '10 Eyl', price: 40999 },
  { date: '20 Eyl', price: 38999 },
  { date: '30 Eyl', price: 36999 },
  { date: '10 Eki', price: 35999 },
  { date: '20 Eki', price: 34999 },
]

const sellers = [
  { name: 'Trendyol', price: 35299, ship: '2 gün', score: 4.7 },
  { name: 'Hepsiburada', price: 34999, ship: '1-3 gün', score: 4.6 },
  { name: 'Amazon', price: 35490, ship: '1 gün', score: 4.9 },
  { name: 'n11', price: 35790, ship: '3-5 gün', score: 4.3 },
]

function Header({ onSearch }){
  const [q, setQ] = useState('')
  return (
    <div className='header'>
      <div className='container row' style={{justifyContent:'space-between', padding:'12px 16px'}}>
        <div className='logo'>
          <svg width='28' height='28' viewBox='0 0 64 64'>
            <defs>
              <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#007AFF'/>
                <stop offset='100%' stopColor='#00C853'/>
              </linearGradient>
            </defs>
            <rect x='8' y='8' width='48' height='48' rx='12' fill='url(#g)'/>
            <path d='M28 20c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h2c5.5 0 10-4.5 10-10s-4.5-10-10-10h-2zm2 6a6 6 0 1 1 0 12h-2V26h2z' fill='#fff'/>
          </svg>
          <span>bikonomi</span>
          <span className='badge'>beta</span>
        </div>
        <div className='row grow' style={{maxWidth:560, gap:8}}>
          <div className='row grow' style={{position:'relative'}}>
            <Search size={16} color='#9ca3af' style={{position:'absolute', left:10, top:12}}/>
            <input className='input' style={{paddingLeft:30}} placeholder='Ne arıyorsun? Ürün, marka ya da barkod...' value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <button className='btn' onClick={()=>onSearch(q)}><Search size={16} style={{marginRight:6}}/>Ara</button>
          <button className='btn outline'><Bell size={16}/></button>
        </div>
      </div>
    </div>
  )
}

function Drops({ onOpen }){
  return (
    <div className='container' style={{marginTop:20}}>
      <div className='row' style={{justifyContent:'space-between', marginBottom:8}}>
        <div className='h2'>Son 7 Günde En Çok Düşenler</div>
        <span className='chip'><TrendingDown size={14} style={{marginRight:6}}/> fiyat-nabzı</span>
      </div>
      <div className='grid cards'>
        {mockDrops.map(p => (
          <div className='card' key={p.id}>
            <img src={p.img} style={{width:'100%', height:160, objectFit:'cover'}}/>
            <div className='pad'>
              <div className='row' style={{justifyContent:'space-between'}}>
                <div style={{fontWeight:700}}>{p.name}</div>
                <span className='pill'>-{p.drop}%</span>
              </div>
              <div className='muted' style={{fontSize:13}}>Eski: <s>{p.old.toLocaleString()} TL</s></div>
              <div style={{color:'#047857', fontWeight:800, fontSize:18}}>{p.price.toLocaleString()} TL</div>
              <button onClick={()=>onOpen(p.id)} className='btn outline' style={{width:'100%', marginTop:8}}>Detaya Git</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIPulse({ history }){
  const current = history[history.length-1].price
  const prev = history[history.length-2].price
  const minPast = Math.min(...history.slice(0,-1).map(h=>h.price))
  const downTrend = current <= prev
  const fakeSale = current > minPast

  let verdict = { label:'İzle', icon:<History size={16} color='#1d4ed8'/>, color:'#1d4ed8', desc:'Belirsiz – alarm kurmak mantıklı.' }
  if(fakeSale) verdict = { label:'Bekle', icon:<AlertTriangle size={16} color:'#b45309'/>, color:'#b45309', desc:'Sahte indirim şüphesi: geçmişte daha düşük.' }
  else if(downTrend) verdict = { label:'Şimdi Al', icon:<CheckCircle size={16} color:'#047857'/>, color:'#047857', desc:'Düşüş trendi sürüyor, dip seviyeye yakın.' }

  return (
    <div className='card' style={{marginTop:16}}>
      <div className='pad'>
        <div className='h2' style={{marginBottom:8, fontSize:16}}><span style={{marginRight:6}}>ℹ️</span>Bikonomi Zekâsı</div>
        <div className='grid' style={{gridTemplateColumns:'1fr 1fr', gap:16, alignItems:'center'}}>
          <div style={{height:200}}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={history}>
                <XAxis dataKey='date' stroke='#94a3b8'/>
                <YAxis stroke='#94a3b8' tickFormatter={v=>v.toLocaleString()}/>
                <Tooltip formatter={(v)=>`${Number(v).toLocaleString()} TL`}/>
                <ReferenceLine y={minPast} stroke='#94a3b8' strokeDasharray='4 4'/>
                <Line type='monotone' dataKey='price' stroke='#00C853' strokeWidth={3} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className='muted' style={{fontSize:13}}>12 haftalık eğilim</div>
            <div className='row' style={{gap:8, marginTop:4, color:verdict.color, fontWeight:800}}>
              {verdict.icon} {verdict.label}
            </div>
            <div className='muted' style={{marginTop:6}}>{verdict.desc}</div>
            <div className='row' style={{gap:8, marginTop:10}}>
              <button className='btn'>Satıcıya Git</button>
              <button className='btn outline'><Bell size={16} style={{marginRight:6}}/>Fiyat Düşünce Haber Ver</button>
            </div>
            {fakeSale && <div style={{marginTop:8, fontSize:12, color:'#b45309'}}>Mevcut fiyat, önceki en düşük {minPast.toLocaleString()} TL seviyesinin üzerinde.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function SellersTable(){
  const best = Math.min(...sellers.map(s=>s.price))
  return (
    <div className='card' style={{marginTop:16}}>
      <div className='pad'>
        <div className='row' style={{justifyContent:'space-between'}}>
          <div className='h2' style={{fontSize:16}}>Satıcı Karşılaştırma</div>
          <span className='chip'><TrendingUp size={14} style={{marginRight:6}}/> rekabet</span>
        </div>
        <table className='table'>
          <thead className='muted'>
            <tr><th>Satıcı</th><th>Fiyat</th><th>Kargo</th><th>Güven</th><th/></tr>
          </thead>
          <tbody>
            {sellers.map(s=>(
              <tr key={s.name}>
                <td style={{fontWeight:600}}>{s.name}</td>
                <td style={{fontWeight:700, color: s.price===best ? '#047857' : undefined}}>
                  {s.price.toLocaleString()} TL {s.price===best && <span className='pill' style={{marginLeft:6}}>En Uygun</span>}
                </td>
                <td>{s.ship}</td>
                <td>{s.score} <Star size={14} color='#f59e0b' style={{marginLeft:4}}/></td>
                <td style={{textAlign:'right'}}><button className='btn outline'>Git</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductPage({ onBack }){
  return (
    <div className='container'>
      <div className='grid' style={{gridTemplateColumns:'1fr 1fr', gap:20, marginTop:20}}>
        <div>
          <div className='card'>
            <img src='https://via.placeholder.com/960x640?text=%C3%9Cr%C3%BCn+G%C3%B6rseli' style={{width:'100%',height:260,objectFit:'cover'}}/>
            <div className='pad'>
              <div className='h1' style={{fontSize:22}}>iPhone 14 128GB (TR Garantili)</div>
              <div className='muted'>Model: A2882 • Renk: Midnight</div>
              <div className='row' style={{gap:8, marginTop:8}}>
                <span className='chip'>Fiyat geçmişi: 41.999 → 34.999 TL</span>
                <span className='pill'>-%16</span>
              </div>
              <div className='row' style={{gap:8, marginTop:10}}>
                <button className='btn'>En Ucuza Git</button>
                <button className='btn outline' onClick={onBack}>Geri</button>
              </div>
            </div>
          </div>
          <AIPulse history={mockHistory}/>
        </div>
        <div>
          <div className='tabs'>
            <div className='tab active'>Satıcılar</div>
            <div className='tab'>Özellikler</div>
            <div className='tab'>Topluluk</div>
          </div>
          <SellersTable/>
        </div>
      </div>
    </div>
  )
}

function Home({ onOpen }){
  return (
    <div>
      <section style={{background:'#f8fafc'}}>
        <div className='container' style={{textAlign:'center', padding:'40px 16px'}}>
          <motion.h1 initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className='h1'>
            Akıllı Alışverişin <span className='gradient'>Zekâsı</span>
          </motion.h1>
          <div className='muted'>Binlerce mağazada fiyatları anında karşılaştır, en doğru zamanı öğren.</div>
          <div className='row-center' style={{marginTop:12}}>
            <input className='input' style={{maxWidth:520}} placeholder='Örn: iPhone 14, Dyson V12, Beko 9kg…'/>
            <button className='btn'><Search size={16} style={{marginRight:6}}/>Ara</button>
          </div>
          <div style={{marginTop:6, fontSize:12}} className='muted'>Gizlilik önceliğimizdir • KVKK uyumlu</div>
        </div>
      </section>
      <Drops onOpen={onOpen}/>
      <div className='container' style={{marginTop:20}}>
        <div className='card'>
          <div className='pad'>
            <div className='row' style={{gap:6, alignItems:'center'}}><TrendingUp size={16}/><b>Fiyat Nabzı (Haftalık Trend)</b></div>
            <div className='grid' style={{gridTemplateColumns:'1fr 1fr 1fr', marginTop:8}}>
              <div>Telefonlarda ortalama fiyat <b>%2.4 arttı</b>.</div>
              <div>Robot süpürgelerde <b>%1.8 düşüş</b> var.</div>
              <div>Beyaz eşyada kampanya olasılığı <b>yüksek</b>.</div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>© 2025 Bikonomi.com • Akıllı alışverişin zekâsı.</div>
    </div>
  )
}

export default function App(){
  const [route, setRoute] = useState('home')
  return (
    <div>
      <Header onSearch={()=>setRoute('product')}/>
      {route==='home' ? <Home onOpen={()=>setRoute('product')}/> : <ProductPage onBack={()=>setRoute('home')}/>}
    </div>
  )
}
