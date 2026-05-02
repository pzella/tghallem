// Advanced translation practice screens — EN -> MT

const ScreenT = ({ children, style = {}, bg = 'var(--cream)' }) => (
  <div style={{
    width: 390, height: 844, background: bg, position: 'relative',
    fontFamily: '"Inter", system-ui, sans-serif',
    color: 'var(--ink)', overflow: 'hidden', ...style,
  }}>{children}</div>
);

const StatusBarT = ({ dark = false }) => {
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

const HeaderT = ({ title, right }) => (
  <div style={{ height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17 }}>{title}</div>
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
  </div>
);

// ═════════════════════════════════════════════════════════════
// 1. TRANSLATION HUB — pick a difficulty / topic
// ═════════════════════════════════════════════════════════════
const TranslationHubScreen = () => {
  const sets = [
    { title: 'Everyday phrases', sub: '12 sentences · short', tier: 'Warm-up', stars: 3, color: 'var(--sage)', accent: 'var(--sage-deep)' },
    { title: 'A letter to a friend', sub: '8 sentences · idioms', tier: 'Standard', stars: 2, color: 'var(--ochre-tint)', accent: 'var(--ochre)' },
    { title: 'News headline rewrite', sub: '6 sentences · formal', tier: 'Hard', stars: 1, color: 'var(--red-tint)', accent: 'var(--red)' },
    { title: 'Folk tale paragraph', sub: 'long-form · cultural', tier: 'Expert', stars: 0, color: 'var(--cream-2)', accent: 'var(--ink)' },
  ];
  return (
    <ScreenT>
      <StatusBarT/>
      <HeaderT title="Translate"
        right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>ADVANCED</div>}
      />
      <div style={{ padding: '4px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>English → Maltese</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Translate sentences yourself. Falko grades structure, word choice, and feel.</p>
      </div>

      {/* progress strip */}
      <div style={{ margin: '16px 20px 0', padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>THIS WEEK</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 600, marginTop: 2 }}>14 sentences · avg 87%</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,1,1,1,1,0,0].map((d, i) => (
            <div key={i} style={{ width: 6, height: 22, borderRadius: 3, background: d ? 'var(--red)' : 'rgba(0,0,0,0.08)' }}/>
          ))}
        </div>
      </div>

      {/* sets */}
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sets.map((s, i) => (
          <div key={i} style={{ padding: 16, borderRadius: 18, background: s.color, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: '#fff', color: s.accent, letterSpacing: 0.5 }}>{s.tier.toUpperCase()}</div>
              <div style={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
                {[1,2,3].map(n => (
                  <svg key={n} width="14" height="14" viewBox="0 0 24 24" fill={n <= s.stars ? s.accent : 'rgba(0,0,0,0.12)'}><path d="M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z"/></svg>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 19, fontWeight: 600, marginTop: 8, letterSpacing: -0.3 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </ScreenT>
  );
};

// ═════════════════════════════════════════════════════════════
// 2. TRANSLATION COMPOSER — typing your translation
// ═════════════════════════════════════════════════════════════
const TranslationComposeScreen = () => (
  <ScreenT bg="var(--cream-2)">
    <StatusBarT/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 20px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
      </div>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.07)' }}>
        <div style={{ width: '40%', height: '100%', borderRadius: 4, background: 'var(--red)' }}/>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>4/10</div>
    </div>

    <div style={{ padding: '20px 24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>EN → MT</span>
        <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>· A letter to a friend · 4 of 8</span>
      </div>
    </div>

    {/* Source sentence */}
    <div style={{ margin: '16px 20px 0', padding: '20px 18px', borderRadius: 20, background: '#fff', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 1 }}>ENGLISH</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, lineHeight: 1.35, letterSpacing: -0.3, paddingRight: 70 }}>
        I haven't seen you in ages — let's grab a coffee in Valletta this weekend.
      </div>
      {/* hint pill: idiom flag */}
      <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 11, fontWeight: 600, padding: '5px 9px', borderRadius: 10, background: 'var(--ochre-tint)', color: 'var(--ochre)' }}>idiom: "in ages"</div>
        <div style={{ fontSize: 11, fontWeight: 600, padding: '5px 9px', borderRadius: 10, background: 'var(--cream-2)', color: 'var(--ink-2)' }}>casual register</div>
      </div>
    </div>

    {/* Target / answer */}
    <div style={{ margin: '14px 20px 0', padding: '18px', borderRadius: 20, background: 'var(--red)', color: '#fff', minHeight: 130, position: 'relative' }}>
      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 1 }}>YOUR TRANSLATION</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 20, fontWeight: 500, lineHeight: 1.4, marginTop: 8 }}>
        Ilni ma narak żmien twil — ejja nieħdu kafè
        <span style={{ display: 'inline-block', width: 2, height: 22, background: '#fff', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s infinite' }}/>
      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: '#fff' }}/>
        <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>Spelling OK</span>
      </div>
    </div>

    {/* Toolbar: hint, alt, dictionary */}
    <div style={{ margin: '14px 20px 0', display: 'flex', gap: 8 }}>
      {[
        { label: 'Hint', icon: 'M12 2 a7 7 0 0 0 -4 13 v3 h8 v-3 a7 7 0 0 0 -4 -13 z M10 21 h4', cost: '-2 XP' },
        { label: 'Word', icon: 'M4 5 a2 2 0 0 1 2 -2 h12 a2 2 0 0 1 2 2 v14 l-4 -3 H6 a2 2 0 0 1 -2 -2 z', cost: 'free' },
        { label: 'Skip', icon: 'M6 4 L18 12 L6 20 Z', cost: '-1 ❤' },
      ].map((b, i) => (
        <div key={i} style={{ flex: 1, padding: '10px 8px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{b.label}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>{b.cost}</div>
        </div>
      ))}
    </div>

    {/* Maltese letter row */}
    <div style={{ position: 'absolute', bottom: 110, left: 20, right: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 6 }}>MALTESE LETTERS</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Ċ','ċ','Ġ','ġ','Ħ','ħ','Ż','ż','Għ','għ'].map(l => (
          <div key={l} style={{ minWidth: 36, height: 36, padding: '0 8px', borderRadius: 10, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 15 }}>{l}</div>
        ))}
      </div>
    </div>

    <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Submit translation</button>
  </ScreenT>
);

// ═════════════════════════════════════════════════════════════
// 3. TRANSLATION FEEDBACK — diff against accepted answer(s)
// ═════════════════════════════════════════════════════════════
const TranslationFeedbackScreen = () => {
  // user answer with inline annotations
  const userTokens = [
    { t: 'Ilni', s: 'ok' },
    { t: 'ma', s: 'ok' },
    { t: 'narak', s: 'ok' },
    { t: 'żmien', s: 'minor', note: 'try "ħafna"' },
    { t: 'twil', s: 'minor' },
    { t: '—', s: 'ok' },
    { t: 'ejja', s: 'ok' },
    { t: 'nieħdu', s: 'ok' },
    { t: 'kafè', s: 'ok' },
    { t: 'fil-Belt', s: 'great', note: 'native phrasing' },
    { t: 'dan', s: 'wrong', note: 'use "dan il-"' },
    { t: 'weekend', s: 'wrong', note: 'tmiem il-ġimgħa' },
  ];
  const colorFor = s => s === 'ok' ? 'var(--ink)' : s === 'minor' ? 'var(--ochre)' : s === 'wrong' ? 'var(--red)' : 'var(--sage-deep)';
  const bgFor = s => s === 'great' ? 'rgba(110,140,114,0.18)' : s === 'minor' ? 'rgba(200,146,74,0.18)' : s === 'wrong' ? 'rgba(207,20,43,0.12)' : 'transparent';

  return (
    <ScreenT bg="#fff">
      <StatusBarT/>
      <HeaderT title="Feedback"
        right={<div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 700, color: 'var(--sage-deep)' }}>82</div>}
      />

      <div style={{ padding: '4px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? 'var(--red)' : 'rgba(0,0,0,0.15)'}><path d="M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z"/></svg>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Solid translation</div>
        </div>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 24, fontWeight: 600, margin: '12px 0 4px', letterSpacing: -0.4 }}>Almost there</h1>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0 }}>Two phrasing issues. Tap any highlighted word for the fix.</p>
      </div>

      {/* user attempt diff */}
      <div style={{ margin: '16px 20px 0', padding: 16, borderRadius: 18, background: 'var(--cream)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>YOUR ATTEMPT</div>
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 500, lineHeight: 1.7 }}>
          {userTokens.map((tok, i) => (
            <span key={i} style={{
              color: colorFor(tok.s),
              background: bgFor(tok.s),
              padding: tok.s !== 'ok' ? '1px 4px' : 0,
              borderRadius: 4, marginRight: 4,
              borderBottom: tok.s === 'wrong' ? '2px wavy var(--red)' : tok.s === 'minor' ? '1.5px dashed var(--ochre)' : 'none',
            }}>{tok.t}</span>
          ))}
        </div>
      </div>

      {/* accepted answer */}
      <div style={{ margin: '12px 20px 0', padding: 16, borderRadius: 18, background: 'var(--sage)', border: '1.5px solid var(--sage-deep)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sage-deep)', letterSpacing: 1, marginBottom: 8 }}>ACCEPTED · NATIVE</div>
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: 'var(--ink)' }}>
          Ilni ma narak ħafna — ejja nieħdu kafè fil-Belt dan it-tmiem il-ġimgħa.
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round"><path d="M12 5 v6 l4 2 M3 12 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0"/></svg>
          Also accepted: <em style={{ marginLeft: 4 }}>"…tmiem il-ġimgħa li ġej."</em>
        </div>
      </div>

      {/* breakdown chips */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 8 }}>WHAT TO REVIEW</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { tag: 'GRAMMAR', txt: 'Definite article in time expressions: dan it-tmiem il-ġimgħa', c: 'var(--red)' },
            { tag: 'VOCAB', txt: 'Use ħafna ("a lot/long") for "ages" — żmien twil is literal', c: 'var(--ochre)' },
            { tag: 'REGISTER', txt: 'fil-Belt instead of f\'Valletta — locals always say "the City"', c: 'var(--sage-deep)' },
          ].map((r, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: 12, background: 'var(--cream)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 5, background: '#fff', color: r.c, letterSpacing: 0.5, flexShrink: 0 }}>{r.tag}</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{r.txt}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', gap: 10 }}>
        <button style={{ flex: 1, height: 54, borderRadius: 27, border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', color: 'var(--ink)' }}>Try again</button>
        <button style={{ flex: 1.4, height: 54, borderRadius: 27, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Next sentence →</button>
      </div>
    </ScreenT>
  );
};

// ═════════════════════════════════════════════════════════════
// 4. PARALLEL READER — translate paragraph-by-paragraph
// ═════════════════════════════════════════════════════════════
const ParallelTranslationScreen = () => (
  <ScreenT bg="var(--cream)">
    <StatusBarT/>
    <HeaderT title="Parallel translate"
      right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>EXPERT</div>}
    />
    <div style={{ padding: '4px 24px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1.5 }}>FOLK TALE · IL-ĠGANTIJA</div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, margin: '6px 0 4px', letterSpacing: -0.4 }}>Paragraph 2 of 6</h1>
      <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0 }}>Translate one paragraph at a time. Compare with the literary version.</p>
    </div>

    {/* English source */}
    <div style={{ margin: '16px 20px 0', padding: '16px 18px', borderRadius: 18, background: '#fff', borderLeft: '4px solid var(--ink)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 6 }}>EN · SOURCE</div>
      <div style={{ fontSize: 15, lineHeight: 1.6 }}>
        The giantess carried the great stones on her head, one by one, from the shore up to the hilltop, where she built a temple older than memory.
      </div>
    </div>

    {/* user maltese */}
    <div style={{ margin: '12px 20px 0', padding: '16px 18px', borderRadius: 18, background: '#fff', borderLeft: '4px solid var(--red)', minHeight: 130 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', letterSpacing: 1 }}>MT · YOUR VERSION</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>32 words</div>
      </div>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 16, lineHeight: 1.6, color: 'var(--ink)' }}>
        Il-ġganta ġarret il-ġebel kbir fuq rasha, waħda waħda, mix-xatt sa fuq l-għolja, fejn bniet
        <span style={{ background: 'rgba(207,20,43,0.12)', padding: '0 3px', borderRadius: 3, color: 'var(--red)' }}> tempju </span>
        eqdem mill-memorja.
        <span style={{ display: 'inline-block', width: 2, height: 18, background: 'var(--red)', verticalAlign: 'middle', marginLeft: 2 }}/>
      </div>
    </div>

    {/* reveal literary version button */}
    <div style={{ margin: '12px 20px 0', padding: '14px 16px', borderRadius: 16, background: 'var(--ochre-tint)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ochre)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M12 8 v5 M12 16 h0.01"/></svg>
      <div style={{ flex: 1, fontSize: 12, color: 'var(--ink)', lineHeight: 1.4 }}>
        Compare your version with the published literary translation when you're done.
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ochre)' }}>Reveal</div>
    </div>

    {/* glossary chip row */}
    <div style={{ padding: '16px 20px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 8 }}>USEFUL FOR THIS PARAGRAPH</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          ['ġganta', 'giantess'],
          ['ġebel', 'stones'],
          ['xatt', 'shore'],
          ['għolja', 'hill'],
          ['tempju', 'temple'],
          ['memorja', 'memory'],
        ].map(([mt, en], i) => (
          <div key={i} style={{ padding: '6px 10px', borderRadius: 10, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)' }}>
            <span style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 13, color: 'var(--red)' }}>{mt}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-2)', marginLeft: 6 }}>{en}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', gap: 10 }}>
      <button style={{ width: 54, height: 54, borderRadius: 27, border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12 H5 M12 19 L5 12 L12 5"/></svg>
      </button>
      <button style={{ flex: 1, height: 54, borderRadius: 27, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Submit & continue</button>
    </div>
  </ScreenT>
);

Object.assign(window, {
  TranslationHubScreen, TranslationComposeScreen,
  TranslationFeedbackScreen, ParallelTranslationScreen,
});
