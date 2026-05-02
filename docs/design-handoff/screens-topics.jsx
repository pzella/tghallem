// Specialised topics + progress screens for Intermediate and Advanced

const ScreenX = ({ children, style = {}, bg = 'var(--cream)' }) => (
  <div style={{
    width: 390, height: 844, background: bg, position: 'relative',
    fontFamily: '"Inter", system-ui, sans-serif',
    color: 'var(--ink)', overflow: 'hidden', ...style,
  }}>{children}</div>
);

const StatusBarX = ({ dark = false }) => {
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

const HeaderX = ({ title, right }) => (
  <div style={{ height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17 }}>{title}</div>
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
  </div>
);

// ═════════════════════════════════════════════════════════════
// 1. INTERMEDIATE TOPICS — themed packs + features list
// ═════════════════════════════════════════════════════════════
const IntermediateTopicsScreen = () => {
  const topics = [
    { mt: 'Fis-suq', en: 'At the market', n: 24, done: 18, color: 'var(--sage)', accent: 'var(--sage-deep)', tag: 'NEW' },
    { mt: 'Ix-xogħol', en: 'At work', n: 30, done: 12, color: 'var(--ochre-tint)', accent: 'var(--ochre)' },
    { mt: 'Il-familja', en: 'Family & home', n: 22, done: 22, color: 'var(--red-tint)', accent: 'var(--red)', tag: 'COMPLETE' },
    { mt: 'Vjaġġ', en: 'Travel & directions', n: 28, done: 0, color: 'var(--cream-2)', accent: 'var(--ink)' },
    { mt: 'Ikel u xorb', en: 'Food & drink', n: 26, done: 8, color: 'var(--sage)', accent: 'var(--sage-deep)' },
  ];
  const features = [
    { ic: 'M4 6 h16 M4 12 h16 M4 18 h10', t: 'Reading', s: '40+ short stories' },
    { ic: 'M3 17.5 L9 11.5 L13 15.5 L21 7.5 M14 7.5 H21 V14.5', t: 'Sentence builder', s: 'Drag & drop tiles' },
    { ic: 'M5 5 a2 2 0 0 1 2 -2 h10 a2 2 0 0 1 2 2 v14 l-4 -3 H7 a2 2 0 0 1 -2 -2 z', t: 'Conversations', s: 'Falko AI chat (text)' },
    { ic: 'M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 z', t: 'Grammar deep-dives', s: 'Articles, plurals, verbs' },
  ];
  return (
    <ScreenX>
      <StatusBarX/>
      <HeaderX title="Specialised topics"
        right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--ochre-tint)', color: 'var(--ochre)', letterSpacing: 0.5 }}>MEDJU</div>}
      />
      <div style={{ padding: '4px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>Intermediate</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Real-world themes with reading and writing built in.</p>
      </div>

      {/* feature strip */}
      <div style={{ margin: '14px 20px 0', padding: '12px 14px', borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>WHAT'S INCLUDED</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--ochre-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ochre)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.ic}/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{f.t}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>{f.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* topic list */}
      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>TOPIC PACKS</div>
        {topics.map((t, i) => {
          const pct = Math.round((t.done / t.n) * 100);
          return (
            <div key={i} style={{ padding: 14, borderRadius: 16, background: t.color, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{t.mt}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>· {t.en}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{t.done} / {t.n} lessons · {pct}%</div>
                </div>
                {t.tag && (
                  <div style={{ fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: t.tag === 'COMPLETE' ? t.accent : '#fff', color: t.tag === 'COMPLETE' ? '#fff' : t.accent, letterSpacing: 0.5 }}>{t.tag}</div>
                )}
              </div>
              <div style={{ marginTop: 10, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.08)' }}>
                <div style={{ width: pct + '%', height: '100%', borderRadius: 3, background: t.accent }}/>
              </div>
            </div>
          );
        })}
      </div>
    </ScreenX>
  );
};

// ═════════════════════════════════════════════════════════════
// 2. ADVANCED TOPICS — denser content + extra features
// ═════════════════════════════════════════════════════════════
const AdvancedTopicsScreen = () => {
  const topics = [
    { mt: 'Storja Maltija', en: 'Maltese history', n: 18, done: 6, color: 'var(--red-tint)', accent: 'var(--red)' },
    { mt: 'Letteratura', en: 'Literature & poetry', n: 14, done: 2, color: 'var(--cream-2)', accent: 'var(--ink)', tag: 'NEW' },
    { mt: 'Aħbarijiet', en: 'News & current affairs', n: 20, done: 9, color: 'var(--ochre-tint)', accent: 'var(--ochre)' },
    { mt: 'Negozju', en: 'Business & formal MT', n: 16, done: 0, color: 'var(--sage)', accent: 'var(--sage-deep)', locked: false },
    { mt: 'Idjomi u qwiel', en: 'Idioms & proverbs', n: 24, done: 11, color: 'var(--red-tint)', accent: 'var(--red)' },
    { mt: 'Lingwistika', en: 'Linguistics & roots', n: 12, done: 4, color: 'var(--cream-2)', accent: 'var(--ink)' },
  ];
  const features = [
    { ic: 'M4 4 h16 v16 H4 z M4 9 h16 M9 4 v16', t: 'Translation EN→MT', s: 'Graded by Falko' },
    { ic: 'M12 19 v3 M8 22 h8 M5 4 h14 v15 H5 z M9 10 h6 M9 14 h4', t: 'Composition', s: 'Open prompts · 100w+' },
    { ic: 'M12 2 a10 10 0 1 0 10 10 M12 2 v10 h10', t: 'Cultural deep-dives', s: 'Authentic texts' },
    { ic: 'M8 14 a4 4 0 0 1 8 0 v4 H8 z M9 8 a3 3 0 1 0 6 0 a3 3 0 0 0 -6 0', t: 'Native voice match', s: 'Pronunciation scoring' },
    { ic: 'M3 12 h4 l3 -8 l4 16 l3 -8 h4', t: 'Listening dictation', s: 'Type what you hear' },
    { ic: 'M21 11.5 a8.4 8.4 0 0 1 -0.9 3.8 a8.5 8.5 0 0 1 -7.6 4.7 a8.4 8.4 0 0 1 -3.8 -0.9 L3 21 l1.9 -5.7 a8.4 8.4 0 0 1 -0.9 -3.8 a8.5 8.5 0 0 1 4.7 -7.6 a8.4 8.4 0 0 1 3.8 -0.9 h0.5 a8.4 8.4 0 0 1 8 8 v0.5 z', t: 'Falko AI tutor', s: 'Voice + text · unlimited' },
  ];
  return (
    <ScreenX bg="#fff">
      <StatusBarX/>
      <HeaderX title="Specialised topics"
        right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>AVVANZAT</div>}
      />
      <div style={{ padding: '4px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>Advanced</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Cultural depth, formal registers, and full composition.</p>
      </div>

      {/* feature grid */}
      <div style={{ margin: '14px 20px 0', padding: '14px 14px 8px', borderRadius: 16, background: 'var(--red)', color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12, opacity: 0.85 }}>EVERYTHING IN INTERMEDIATE, PLUS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, paddingBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.ic}/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{f.t}</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>{f.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* topic grid */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 8 }}>TOPIC PACKS · 6</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {topics.map((t, i) => {
            const pct = Math.round((t.done / t.n) * 100);
            return (
              <div key={i} style={{ padding: 12, borderRadius: 14, background: t.color, position: 'relative', minHeight: 96 }}>
                {t.tag && <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: t.accent, color: '#fff', letterSpacing: 0.5 }}>{t.tag}</div>}
                <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 15, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.15 }}>{t.mt}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 2 }}>{t.en}</div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.accent, marginBottom: 4 }}>{t.done} / {t.n} · {pct}%</div>
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.08)' }}>
                    <div style={{ width: pct + '%', height: '100%', borderRadius: 2, background: t.accent }}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenX>
  );
};

// ═════════════════════════════════════════════════════════════
// 3. PROGRESS / STATS — overall stats with skill breakdown
// ═════════════════════════════════════════════════════════════
const ProgressStatsScreen = () => {
  const skills = [
    { name: 'Listening', score: 86, color: 'var(--sage-deep)' },
    { name: 'Speaking', score: 73, color: 'var(--ochre)' },
    { name: 'Reading', score: 81, color: 'var(--red)' },
    { name: 'Writing', score: 64, color: 'var(--ink)' },
    { name: 'Translation', score: 58, color: 'var(--red)' },
  ];
  return (
    <ScreenX bg="var(--cream)">
      <StatusBarX/>
      <HeaderX title="Your progress"
        right={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4 a1 1 0 0 0 -1 1 v14 a1 1 0 0 0 1 1 h14 a1 1 0 0 0 1 -1 V11 M19 3 V8 M16.5 5.5 H21.5"/></svg>}
      />

      {/* big stat row */}
      <div style={{ padding: '4px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { v: '142', l: 'Words mastered', sub: '+18 this week' },
          { v: '7', l: 'Day streak', sub: 'best: 23' },
          { v: '4,820', l: 'XP earned', sub: 'top 12% in MT' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '12px 10px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)' }}>
            <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{s.v}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)' }}>{s.l}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* skills radar-ish bars */}
      <div style={{ margin: '16px 20px 0', padding: 16, borderRadius: 18, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>SKILLS BREAKDOWN</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>last 30 days</div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {skills.map((s, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontWeight: 700, color: s.color }}>{s.score}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }}>
                <div style={{ width: s.score + '%', height: '100%', borderRadius: 3, background: s.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* activity heat strip — last 8 weeks */}
      <div style={{ margin: '14px 20px 0', padding: 16, borderRadius: 18, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>ACTIVITY · 8 WEEKS</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[2,3,1,4,4,3,4,2].map((wk, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[3,2,1,0].map(row => {
                const filled = wk > row;
                return <div key={row} style={{ height: 12, borderRadius: 3, background: filled ? `oklch(0.6 0.18 ${24 + row*4})` : 'rgba(0,0,0,0.05)' }}/>;
              })}
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', textAlign: 'center', marginTop: 2 }}>W{i+1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* level rank-up bar */}
      <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 16, background: 'var(--red)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.85 }}>NEXT: ADVANCED</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>72%</div>
        </div>
        <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: 3, background: '#fff' }}/>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.9 }}>Focus on writing & translation to break through.</div>
      </div>
    </ScreenX>
  );
};

Object.assign(window, {
  IntermediateTopicsScreen, AdvancedTopicsScreen, ProgressStatsScreen,
});
