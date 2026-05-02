// Level progression + social/sharing screens

const ScreenS = ({ children, style = {}, bg = 'var(--cream)' }) => (
  <div style={{
    width: 390, height: 844, background: bg, position: 'relative',
    fontFamily: '"Inter", system-ui, sans-serif',
    color: 'var(--ink)', overflow: 'hidden', ...style,
  }}>{children}</div>
);

const StatusBarS = ({ dark = false }) => {
  const c = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{
      height: 54, padding: '18px 28px 0', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 16, color: c,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill={c}/><rect x="5" y="5" width="3" height="6" rx="0.6" fill={c}/><rect x="10" y="2" width="3" height="9" rx="0.6" fill={c}/><rect x="15" y="0" width="3" height="11" rx="0.6" fill={c}/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill={c}/></svg>
      </div>
    </div>
  );
};

const HeaderS = ({ title, dark = false, right }) => (
  <div style={{ height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : 'var(--ink)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17, color: dark ? '#fff' : 'var(--ink)' }}>{title}</div>
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
  </div>
);

// ═════════════════════════════════════════════════════════════
// 1. LEVEL PROGRESSION DASHBOARD
//    Shows the user how close they are to ranking up
// ═════════════════════════════════════════════════════════════
const LevelProgressionScreen = () => {
  const criteria = [
    { label: 'Words mastered', current: 142, target: 200, hint: 'Recall in <3s, 3× in a row' },
    { label: 'Lessons completed', current: 23, target: 30, hint: 'Foundation + 2 themes' },
    { label: 'Quiz accuracy', current: 84, target: 80, suffix: '%', hint: 'Average over last 10 quizzes', met: true },
    { label: 'Reading comprehension', current: 6, target: 10, hint: '10 short stories with 80%+ score' },
    { label: 'Writing submissions', current: 3, target: 5, hint: '5 spelling drills passed' },
  ];
  return (
    <ScreenS>
      <StatusBarS/>
      <HeaderS title="Level up"/>
      <div style={{ padding: '4px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>Almost intermediate</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Hit each goal to unlock the next track.</p>
      </div>

      {/* Big visual progress */}
      <div style={{ margin: '16px 20px 0', padding: 18, borderRadius: 22, background: 'var(--red)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>OVERALL READINESS</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 700 }}>72%</div>
        </div>
        {/* horizontal track between levels */}
        <div style={{ marginTop: 18, position: 'relative' }}>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
            <div style={{ width: '72%', height: '100%', borderRadius: 3, background: '#fff' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {[
              { l: 'Beginner', done: true },
              { l: 'Intermediate', current: true },
              { l: 'Advanced', future: true },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: i === 0 ? 'flex-start' : i === 2 ? 'flex-end' : 'center' }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: s.done ? '#fff' : s.current ? '#fff' : 'rgba(255,255,255,0.3)', border: s.current ? '3px solid var(--red)' : 'none', boxShadow: s.current ? '0 0 0 3px #fff' : 'none', marginTop: -16 }}/>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, opacity: s.future ? 0.6 : 1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, opacity: 0.9, lineHeight: 1.4 }}>
          ~8 days at your current pace. Focus on <strong>writing</strong> to close the gap.
        </div>
      </div>

      {/* Criteria list */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>WHAT WE MEASURE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {criteria.map((c, i) => {
            const pct = Math.min(100, (c.current / c.target) * 100);
            return (
              <div key={i} style={{ padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                  {c.met && <div style={{ width: 20, height: 20, borderRadius: 10, background: 'var(--sage-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6"/></svg></div>}
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.met ? 'var(--sage-deep)' : 'var(--ink-2)' }}>{c.current}{c.suffix || ''} / {c.target}{c.suffix || ''}</div>
                </div>
                <div style={{ marginTop: 8, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }}>
                  <div style={{ width: pct + '%', height: '100%', borderRadius: 3, background: c.met ? 'var(--sage-deep)' : 'var(--red)' }}/>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>{c.hint}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button style={{ position: 'absolute', bottom: 32, left: 24, right: 24, height: 52, borderRadius: 26, border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', color: 'var(--ink)' }}>Take the placement test instead</button>
    </ScreenS>
  );
};

// ═════════════════════════════════════════════════════════════
// 2. PLACEMENT TEST SCREEN — quick check used at onboarding & ranking
// ═════════════════════════════════════════════════════════════
const PlacementTestScreen = () => (
  <ScreenS bg="var(--cream-2)">
    <StatusBarS/>
    {/* close + progress */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 20px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
      </div>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.07)' }}>
        <div style={{ width: '50%', height: '100%', borderRadius: 4, background: 'var(--red)' }}/>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>5/10</div>
    </div>

    <div style={{ padding: '20px 24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--ochre-tint)', color: 'var(--ochre)', letterSpacing: 0.5 }}>PLACEMENT</span>
        <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>· adapts to your level</span>
      </div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 24, fontWeight: 600, margin: '12px 0 4px', letterSpacing: -0.4, lineHeight: 1.3 }}>Pick the correct translation</h1>
      <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0 }}>The harder the question, the higher you can place.</p>
    </div>

    {/* prompt */}
    <div style={{ margin: '20px 24px 0', padding: '24px 22px', borderRadius: 20, background: '#fff', textAlign: 'center', boxShadow: '0 4px 18px rgba(0,0,0,0.04)' }}>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 24, fontWeight: 600, lineHeight: 1.3 }}>"Iltqajt ma' ħabib tiegħi quddiem il-knisja"</div>
    </div>

    <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        'I am going to church with my friend',
        'I met my friend in front of the church',
        'My friend lives near the church',
        'The church is next to my friend\'s house',
      ].map((o, i) => (
        <div key={i} style={{
          padding: '14px 16px', borderRadius: 16, background: '#fff',
          border: i === 1 ? '2px solid var(--red)' : '1.5px solid rgba(0,0,0,0.06)',
          boxShadow: i === 1 ? '0 0 0 4px rgba(207,20,43,0.1)' : 'none',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 1 ? 'var(--red)' : 'var(--cream-2)', color: i === 1 ? '#fff' : 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, fontFamily: '"Bricolage Grotesque", serif' }}>{['A','B','C','D'][i]}</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{o}</div>
        </div>
      ))}
    </div>

    {/* difficulty meter */}
    <div style={{ position: 'absolute', bottom: 110, left: 24, right: 24, padding: '10px 14px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>DIFFICULTY</div>
      <div style={{ flex: 1, display: 'flex', gap: 3 }}>
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= 5 ? 'var(--red)' : 'rgba(0,0,0,0.08)' }}/>
        ))}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>Intermediate</div>
    </div>

    <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Submit</button>
  </ScreenS>
);

// ═════════════════════════════════════════════════════════════
// 3. RANK-UP CELEBRATION
// ═════════════════════════════════════════════════════════════
const RankUpScreen = () => (
  <ScreenS bg="var(--red)" style={{ color: '#fff' }}>
    <StatusBarS dark/>
    {/* radial glow */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 390 844">
      <defs>
        <radialGradient id="glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="390" height="844" fill="url(#glow)"/>
      {/* confetti */}
      {[[60,120,'#fff'],[330,180,'#fff'],[80,300,'var(--ochre)'],[300,340,'var(--ochre)'],[40,200,'var(--ochre)'],[350,260,'#fff']].map(([x,y,c], i) => (
        <rect key={i} x={x} y={y} width="8" height="14" rx="2" fill={c} transform={`rotate(${i*40} ${x} ${y})`} opacity="0.9"/>
      ))}
    </svg>

    <div style={{ position: 'relative', textAlign: 'center', padding: '60px 28px 0' }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, opacity: 0.85 }}>YOU LEVELED UP</div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 38, fontWeight: 600, margin: '10px 0 6px', letterSpacing: -1, lineHeight: 1 }}>Intermediate!</h1>
      <div style={{ fontSize: 16, opacity: 0.9 }}>Medju · welcome to the next level</div>

      {/* badge */}
      <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 200, height: 200, borderRadius: 100, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* shield */}
            <path d="M80 14 L130 30 V80 Q130 120 80 146 Q30 120 30 80 V30 Z" fill="#fff"/>
            <path d="M80 24 L122 38 V80 Q122 113 80 136 Q38 113 38 80 V38 Z" fill="var(--red)"/>
            {/* "II" intermediate */}
            <text x="80" y="98" textAnchor="middle" fontFamily="'Bricolage Grotesque', serif" fontWeight="700" fontSize="56" fill="#fff">II</text>
          </svg>
          {/* sparkle */}
          <div style={{ position: 'absolute', top: 10, right: 22, color: '#fff', fontSize: 28, fontWeight: 700 }}>✦</div>
          <div style={{ position: 'absolute', bottom: 30, left: 14, color: '#fff', fontSize: 18, opacity: 0.7 }}>✦</div>
        </div>
      </div>

      <div style={{ marginTop: 32, fontSize: 14, lineHeight: 1.5, padding: '0 16px', opacity: 0.92 }}>
        Reading and writing are now unlocked. New stories, sentence drills, and grammar lessons are waiting.
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button style={{ height: 56, borderRadius: 28, border: 'none', background: '#fff', color: 'var(--red)', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 10.5 L15.5 7 M8.5 13.5 L15.5 17"/></svg>
        Share badge
      </button>
      <button style={{ height: 56, borderRadius: 28, border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Continue</button>
    </div>
  </ScreenS>
);

// ═════════════════════════════════════════════════════════════
// 4. SHARE BADGE — social share sheet
// ═════════════════════════════════════════════════════════════
const ShareBadgeScreen = () => (
  <ScreenS bg="rgba(42,31,26,0.55)">
    <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)', opacity: 0.4 }}/>
    <StatusBarS dark/>

    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'var(--cream)', borderTopLeftRadius: 28, borderTopRightRadius: 28,
      padding: '12px 20px 32px',
    }}>
      <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.15)', margin: '0 auto 18px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: -0.4 }}>Share your badge</h2>
        <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>Earn 50 XP</span>
      </div>

      {/* preview card — what the share asset looks like */}
      <div style={{ borderRadius: 18, background: 'var(--red)', padding: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="80" height="80" viewBox="0 0 160 160">
            <path d="M80 14 L130 30 V80 Q130 120 80 146 Q30 120 30 80 V30 Z" fill="#fff"/>
            <path d="M80 24 L122 38 V80 Q122 113 80 136 Q38 113 38 80 V38 Z" fill="var(--red)"/>
            <text x="80" y="98" textAnchor="middle" fontFamily="'Bricolage Grotesque', serif" fontWeight="700" fontSize="56" fill="#fff">II</text>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>I JUST UNLOCKED</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, marginTop: 2, lineHeight: 1.1 }}>Intermediate Maltese</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>142 words · 7-day streak · #TgħallemMalti</div>
          </div>
        </div>
        {/* watermark */}
        <div style={{ position: 'absolute', bottom: 8, right: 14, fontSize: 10, fontWeight: 700, letterSpacing: 1, opacity: 0.6 }}>TGĦALLEM</div>
      </div>

      {/* customize chips */}
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['Add streak', 'Add favourite phrase', 'Hide stats'].map((c, i) => (
          <div key={i} style={{ padding: '6px 12px', borderRadius: 14, background: i === 0 ? 'var(--red)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink)', fontSize: 12, fontWeight: 600, border: i === 0 ? 'none' : '1.5px solid rgba(0,0,0,0.08)' }}>{c}</div>
        ))}
      </div>

      {/* share targets */}
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { name: 'Story', bg: 'linear-gradient(135deg, #f09433, #dc2743 50%, #bc1888)', label: 'IG Story' },
          { name: 'Post', bg: '#1877F2', label: 'Facebook' },
          { name: 'X', bg: '#000', label: 'X / Twitter' },
          { name: 'WA', bg: '#25D366', label: 'WhatsApp' },
          { name: 'TT', bg: '#000', label: 'TikTok' },
          { name: 'IM', bg: 'var(--ink)', label: 'Messages' },
          { name: 'DL', bg: '#fff', label: 'Save image', dark: true },
          { name: '⋯', bg: '#fff', label: 'More', dark: true },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, background: s.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 16,
              color: s.dark ? 'var(--ink)' : '#fff',
              border: s.dark ? '1.5px solid rgba(0,0,0,0.08)' : 'none',
            }}>{s.name}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-2)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* copy link */}
      <div style={{ marginTop: 16, height: 48, padding: '0 14px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round"><path d="M10 13 a5 5 0 0 0 7 0 l3 -3 a5 5 0 0 0 -7 -7 l-1 1 M14 11 a5 5 0 0 0 -7 0 l-3 3 a5 5 0 0 0 7 7 l1 -1"/></svg>
        <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>tgħallem.app/sarah/intermediate</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>Copy</div>
      </div>
    </div>
  </ScreenS>
);

// ═════════════════════════════════════════════════════════════
// 5. INVITE FRIENDS / REFERRAL
// ═════════════════════════════════════════════════════════════
const InviteFriendsScreen = () => {
  const friends = [
    { name: 'Mark Ellul', sub: 'Joined via your invite', state: 'joined' },
    { name: 'Nina Cassar', sub: 'Day 3 streak', state: 'streak' },
    { name: 'Daniel Vella', sub: 'Invite sent · 2 days ago', state: 'pending' },
  ];
  return (
    <ScreenS>
      <StatusBarS/>
      <HeaderS title="Invite friends"/>
      {/* hero */}
      <div style={{ margin: '4px 20px 0', padding: 22, borderRadius: 22, background: 'var(--red)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', top: -30, right: -20, opacity: 0.18 }} width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="80" fill="#fff"/></svg>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>LEARN TOGETHER</div>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.4, lineHeight: 1.15 }}>Bring a friend, earn a week of Pro</h1>
        <p style={{ fontSize: 13, margin: 0, opacity: 0.9 }}>You both get 7 days free when they finish their first lesson.</p>
      </div>

      {/* invite code */}
      <div style={{ margin: '16px 20px 0', padding: 14, borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, color: 'var(--red)' }}>#</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>YOUR CODE</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginTop: 1, letterSpacing: 1 }}>SARAH-MALTI</div>
        </div>
        <div style={{ padding: '8px 14px', borderRadius: 12, background: 'var(--red)', color: '#fff', fontSize: 13, fontWeight: 700 }}>Copy</div>
      </div>

      {/* share row — quick targets */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>SHARE INVITE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {[
            { l: 'WA', bg: '#25D366' },
            { l: 'IG', bg: 'linear-gradient(135deg,#f09433,#dc2743 50%,#bc1888)' },
            { l: 'X', bg: '#000' },
            { l: '✉', bg: 'var(--ink)' },
            { l: '⋯', bg: '#fff', dark: true },
          ].map((s, i) => (
            <div key={i} style={{ height: 50, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.dark ? 'var(--ink)' : '#fff', fontWeight: 700, fontFamily: '"Bricolage Grotesque", serif', fontSize: 14, border: s.dark ? '1.5px solid rgba(0,0,0,0.08)' : 'none' }}>{s.l}</div>
          ))}
        </div>
      </div>

      {/* friends list */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>YOUR FRIENDS · 3</div>
          <div style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>+1 free week</div>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          {friends.map((f, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff' }}>
                <div style={{ width: 38, height: 38, borderRadius: 19, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, color: 'var(--red)' }}>{f.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{f.sub}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6,
                  background: f.state === 'joined' ? 'rgba(110,140,114,0.15)' : f.state === 'streak' ? 'var(--ochre-tint)' : 'var(--cream-2)',
                  color: f.state === 'joined' ? 'var(--sage-deep)' : f.state === 'streak' ? 'var(--ochre)' : 'var(--ink-2)',
                  letterSpacing: 0.4,
                }}>{f.state === 'joined' ? 'JOINED' : f.state === 'streak' ? '3 🔥' : 'PENDING'}</div>
              </div>
              {i < friends.length - 1 && <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 64 }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </ScreenS>
  );
};

Object.assign(window, {
  LevelProgressionScreen, PlacementTestScreen, RankUpScreen,
  ShareBadgeScreen, InviteFriendsScreen,
});
