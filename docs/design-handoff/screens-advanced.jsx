// Advanced / Intermediate track screens — reading, writing, sentence building

const ScreenA = ({ children, style = {}, bg = 'var(--cream)' }) => (
  <div style={{
    width: 390, height: 844, background: bg, position: 'relative',
    fontFamily: '"Inter", system-ui, sans-serif',
    color: 'var(--ink)', overflow: 'hidden', ...style,
  }}>{children}</div>
);

const StatusBarA = ({ dark = false }) => {
  const c = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{
      height: 54, padding: '18px 28px 0', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 16, color: c,
      position: 'relative', zIndex: 5,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill={c}/><rect x="5" y="5" width="3" height="6" rx="0.6" fill={c}/><rect x="10" y="2" width="3" height="9" rx="0.6" fill={c}/><rect x="15" y="0" width="3" height="11" rx="0.6" fill={c}/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill={c}/></svg>
      </div>
    </div>
  );
};

const HeaderA = ({ title, dark = false, right }) => (
  <div style={{
    height: 56, padding: '0 20px', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 4,
  }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : 'var(--ink)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17, color: dark ? '#fff' : 'var(--ink)' }}>{title}</div>
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
  </div>
);

// ═════════════════════════════════════════════════════════════
// 1. TRACK SELECTION — Beginner / Intermediate / Advanced
// ═════════════════════════════════════════════════════════════
const TrackSelectScreen = () => {
  const tracks = [
    { id: 'beg', mt: 'Beġinner', en: 'Beginner', sub: 'Letters, numbers, greetings', skills: ['Listen', 'Speak'], color: 'var(--sage)', accent: 'var(--sage-deep)', done: true, n: 1 },
    { id: 'int', mt: 'Medju', en: 'Intermediate', sub: 'Reading, sentences, daily life', skills: ['Read', 'Write', 'Speak'], color: 'var(--ochre-tint)', accent: 'var(--ochre)', current: true, n: 2 },
    { id: 'adv', mt: 'Avvanzat', en: 'Advanced', sub: 'Essays, stories, fluency', skills: ['Read', 'Write', 'Speak', 'Compose'], color: 'var(--red-tint)', accent: 'var(--red)', n: 3 },
  ];
  return (
    <ScreenA>
      <StatusBarA/>
      <HeaderA title="Choose your path"/>
      <div style={{ padding: '8px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 28, fontWeight: 600, margin: '4px 0 4px', letterSpacing: -0.5 }}>Three tracks</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Switch any time — your progress carries over.</p>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tracks.map(t => (
          <div key={t.id} style={{
            position: 'relative', padding: 18, borderRadius: 22, background: t.color,
            border: t.current ? `2px solid ${t.accent}` : '1px solid rgba(0,0,0,0.04)',
            boxShadow: t.current ? `0 0 0 4px ${t.accent}22` : 'none',
          }}>
            {/* level dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 8, height: i < t.n ? 22 : 10, borderRadius: 4, background: i < t.n ? t.accent : 'rgba(0,0,0,0.12)' }}/>
                ))}
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 20, letterSpacing: -0.3 }}>{t.mt}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>· {t.en}</div>
              {t.done && (
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: '#fff', color: t.accent, letterSpacing: 0.5 }}>COMPLETE</div>
              )}
              {t.current && (
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: t.accent, color: '#fff', letterSpacing: 0.5 }}>CURRENT</div>
              )}
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-2)' }}>{t.sub}</div>
            {/* skill chips */}
            <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {t.skills.map(s => (
                <div key={s} style={{ fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 10, background: '#fff', color: t.accent }}>{s}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: 24, right: 24, fontSize: 12, color: 'var(--ink-2)', textAlign: 'center', lineHeight: 1.5 }}>
        Reading & writing unlock at <strong>Intermediate</strong>. Composition unlocks at <strong>Advanced</strong>.
      </div>
    </ScreenA>
  );
};

// ═════════════════════════════════════════════════════════════
// 2. READING — short story with translatable words
// ═════════════════════════════════════════════════════════════
const ReadingScreen = () => {
  // Words with translations on tap. A few highlighted.
  const W = (mt, en, hl) => ({ mt, en, hl });
  const sentence1 = [W('Marija', 'Maria'), W('tmur', 'goes', true), W('lejn', 'to'), W('is-suq', 'the market', true), W('kuljum', 'every day'), W('biex', 'to'), W('tixtri', 'buys', true), W('ħobż', 'bread', true), W('frisk', 'fresh'), W('.', '')];
  const sentence2 = [W('Iltaqgħet', 'Met'), W('ma\'', 'with'), W('Pawlu', 'Paul'), W('quddiem', 'in front of'), W('il-knisja', 'the church', true), W('.', '')];
  const sentence3 = [W('"Bonġu!"', '"Good morning!"', true), W('qaltlu', 'she said to him'), W(',', ''), W('"', ''), W('Kif', 'How'), W('inti', 'are you'), W('?"', ''), W('"', ''), W('Tajjeb', 'Well'), W('grazzi', 'thanks'), W('"', '')];

  const renderWord = (w, i) => (
    <span key={i} style={{
      color: w.hl ? 'var(--red)' : 'var(--ink)',
      fontWeight: w.hl ? 600 : 400,
      borderBottom: w.hl ? '1.5px dashed rgba(207,20,43,0.4)' : 'none',
      cursor: 'pointer', marginRight: 4,
    }}>{w.mt}</span>
  );

  return (
    <ScreenA bg="#fff">
      <StatusBarA/>
      <HeaderA title="Reading · Story 3"
        right={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"><path d="M5 4 a1 1 0 0 0 -1 1 v14 a1 1 0 0 0 1 1 h14 a1 1 0 0 0 1 -1 V11"/><path d="M19 3 V8 M16.5 5.5 H21.5"/></svg>}
      />
      {/* progress + meta */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-2)' }}>
          <span style={{ padding: '3px 8px', borderRadius: 6, background: 'var(--ochre-tint)', color: 'var(--ochre)', fontWeight: 700, letterSpacing: 0.5 }}>INTERMEDIATE</span>
          <span>· 4 min read · 38 words</span>
        </div>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '12px 0 4px', letterSpacing: -0.4 }}>Filgħodu fis-suq</h1>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0, fontStyle: 'italic' }}>"Morning at the market"</p>
      </div>

      {/* body */}
      <div style={{ padding: '20px 24px 0', fontFamily: '"Bricolage Grotesque", serif', fontSize: 19, lineHeight: 1.7, color: 'var(--ink)' }}>
        <p style={{ margin: '0 0 14px' }}>{sentence1.map(renderWord)}</p>
        <p style={{ margin: '0 0 14px' }}>{sentence2.map(renderWord)}</p>
        <p style={{ margin: 0 }}>{sentence3.map(renderWord)}</p>
      </div>

      {/* tap-to-translate popover */}
      <div style={{
        position: 'absolute', top: 380, left: 24, right: 24,
        background: 'var(--ink)', color: '#fff', borderRadius: 14, padding: '12px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 18 }}>is-suq</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>noun · masculine</div>
        </div>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 2 }}>the market · the marketplace</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>+ Save word</button>
          <button style={{ flex: 1, height: 32, borderRadius: 8, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>More examples</button>
        </div>
        {/* arrow up */}
        <div style={{ position: 'absolute', top: -8, left: 80, width: 16, height: 16, background: 'var(--ink)', transform: 'rotate(45deg)' }}/>
      </div>

      {/* bottom controls */}
      <div style={{ position: 'absolute', bottom: 32, left: 24, right: 24, display: 'flex', gap: 10 }}>
        <button style={{ width: 56, height: 56, borderRadius: 28, border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"><path d="M3 12 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M9 8 v8 l7 -4 z"/></svg>
        </button>
        <button style={{ flex: 1, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Comprehension quiz →</button>
      </div>
    </ScreenA>
  );
};

// ═════════════════════════════════════════════════════════════
// 3. SENTENCE BUILDER — drag/tap word tiles to form a sentence
// ═════════════════════════════════════════════════════════════
const SentenceBuilderScreen = () => {
  // Selected (in answer slot)
  const selected = ['Jien', 'irrid'];
  // Available pool
  const pool = ['ngħix', 'f\'Malta', 'kafè', 'iltaqgħet', 'magħhom', 'mhux'];
  // Translation slot (English prompt)
  return (
    <ScreenA bg="var(--cream-2)">
      <StatusBarA/>
      {/* close + progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 20px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
        </div>
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.07)' }}>
          <div style={{ width: '55%', height: '100%', borderRadius: 4, background: 'var(--red)' }}/>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>6/12</div>
      </div>

      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'var(--red)' }}>BUILD THE SENTENCE</div>
        <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.4, lineHeight: 1.3 }}>"I want to live in Malta"</h2>
        <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Tap the words in order. Tap again to remove.</div>
      </div>

      {/* answer area: dotted lines you fill */}
      <div style={{ margin: '24px 24px 0', padding: '20px 18px', borderRadius: 18, background: '#fff', minHeight: 120, position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
          {selected.map((w, i) => (
            <div key={i} style={{
              padding: '10px 16px', borderRadius: 12, background: 'var(--red)', color: '#fff',
              fontFamily: '"Bricolage Grotesque", serif', fontSize: 17, fontWeight: 600,
              boxShadow: '0 3px 8px rgba(207,20,43,0.25)',
            }}>{w}</div>
          ))}
          {/* empty slots */}
          {[0,1,2].map(i => (
            <div key={'e'+i} style={{
              padding: '10px 16px', borderRadius: 12, border: '2px dashed rgba(0,0,0,0.15)',
              minWidth: 70, height: 42,
            }}/>
          ))}
        </div>
        {/* helper line */}
        <div style={{ position: 'absolute', bottom: 8, right: 14, fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>2 of 5</div>
      </div>

      {/* hint chip */}
      <div style={{ margin: '14px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600, padding: '6px 12px', borderRadius: 14, background: 'var(--red-tint)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--red)"><path d="M12 2 a7 7 0 0 0 -4 13 v3 h8 v-3 a7 7 0 0 0 -4 -13 z M10 21 h4"/></svg>
          Use a hint (-2 XP)
        </div>
      </div>

      {/* word pool */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 10 }}>WORD BANK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {pool.map((w, i) => (
            <div key={i} style={{
              padding: '10px 16px', borderRadius: 12, background: '#fff',
              border: '1.5px solid rgba(0,0,0,0.06)',
              fontFamily: '"Bricolage Grotesque", serif', fontSize: 17, fontWeight: 600, color: 'var(--ink)',
              boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
            }}>{w}</div>
          ))}
        </div>
      </div>

      <button style={{
        position: 'absolute', bottom: 40, left: 24, right: 24, height: 56,
        borderRadius: 28, border: 'none',
        background: 'var(--red)', color: '#fff',
        fontSize: 17, fontWeight: 700, fontFamily: 'inherit',
        boxShadow: '0 6px 18px rgba(207,20,43,0.3)',
      }}>Check sentence</button>
    </ScreenA>
  );
};

// ═════════════════════════════════════════════════════════════
// 4. WRITING PRACTICE — trace + free type
// ═════════════════════════════════════════════════════════════
const WritingScreen = () => (
  <ScreenA>
    <StatusBarA/>
    <HeaderA title="Writing practice"
      right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>ADVANCED</div>}
    />
    <div style={{ padding: '4px 24px 0' }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'var(--red)' }}>WRITE THE SENTENCE</div>
      <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.4, lineHeight: 1.3 }}>"My name is Sarah and I live in Valletta"</h2>
      <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Spelling and accents count — Falko will check.</div>
    </div>

    {/* hint card with target */}
    <div style={{ margin: '20px 20px 0', padding: 16, borderRadius: 18, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="var(--red)"/></svg>
      </div>
      <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>
        Target: <strong style={{ color: 'var(--ink)' }}>Jisimni Sarah u ngħix il-Belt Valletta.</strong>
      </div>
    </div>

    {/* writing canvas — lined paper */}
    <div style={{ margin: '18px 20px 0', borderRadius: 18, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', padding: '20px 18px', minHeight: 200, position: 'relative' }}>
      {/* baseline ruled lines */}
      {[0,1,2].map(i => (
        <div key={i} style={{ height: 56, borderBottom: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }}>
          {i === 0 && (
            <span style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)' }}>
              Jisimni Sarah u ngħix
              <span style={{ display: 'inline-block', width: 2, height: 22, background: 'var(--red)', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s infinite' }}/>
            </span>
          )}
          {i === 1 && (
            <span style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 14, color: 'var(--ink-3)', fontStyle: 'italic' }}>il-Belt Valletta.</span>
          )}
        </div>
      ))}
      {/* live feedback */}
      <div style={{ position: 'absolute', top: 12, right: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--sage-deep)' }}/>
        <span style={{ fontSize: 11, color: 'var(--sage-deep)', fontWeight: 600 }}>Spelling OK</span>
      </div>
    </div>

    {/* special characters quick row */}
    <div style={{ padding: '18px 20px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, marginBottom: 8 }}>MALTESE LETTERS</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Ċ','ċ','Ġ','ġ','Ħ','ħ','Ż','ż','Għ','għ','Ie','ie'].map(l => (
          <div key={l} style={{
            minWidth: 40, height: 40, padding: '0 10px', borderRadius: 10,
            background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 16, color: 'var(--ink)',
          }}>{l}</div>
        ))}
      </div>
    </div>

    <button style={{
      position: 'absolute', bottom: 40, left: 24, right: 24, height: 56,
      borderRadius: 28, border: 'none',
      background: 'var(--red)', color: '#fff',
      fontSize: 17, fontWeight: 700, fontFamily: 'inherit',
      boxShadow: '0 6px 18px rgba(207,20,43,0.3)',
    }}>Submit answer</button>
  </ScreenA>
);

// ═════════════════════════════════════════════════════════════
// 5. COMPOSITION — open writing prompt with rubric (Advanced)
// ═════════════════════════════════════════════════════════════
const CompositionScreen = () => (
  <ScreenA bg="#fff">
    <StatusBarA/>
    <HeaderA title="Composition"
      right={<div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--red-tint)', color: 'var(--red)', letterSpacing: 0.5 }}>ADVANCED</div>}
    />

    {/* Prompt card */}
    <div style={{ margin: '4px 20px 0', padding: 18, borderRadius: 20, background: 'var(--red-tint)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', letterSpacing: 1.5 }}>PROMPT · 5 OF 8</div>
      <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 20, fontWeight: 600, margin: '6px 0 6px', letterSpacing: -0.3, lineHeight: 1.3 }}>
        Iddeskrivi ġurnata sajf f'Malta.
      </h2>
      <div style={{ fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic' }}>"Describe a summer day in Malta." · 60–100 words</div>
    </div>

    {/* user composition */}
    <div style={{ margin: '14px 20px 0', padding: '16px 18px', borderRadius: 18, background: 'var(--cream)', border: '1.5px solid rgba(0,0,0,0.06)', position: 'relative' }}>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 16, lineHeight: 1.7, color: 'var(--ink)' }}>
        Filgħodu nqum kmieni u mmur il-baħar ma' sħabi.{' '}
        <span style={{ background: 'rgba(110,140,114,0.2)', padding: '0 2px', borderRadius: 3 }}>Niekol</span>{' '}
        ħobż biż-żejt u tadam frisk għall-kolazzjon.{' '}
        <span style={{ background: 'rgba(200,146,74,0.2)', padding: '0 2px', borderRadius: 3, borderBottom: '1.5px wavy var(--ochre)' }}>Wara</span>,{' '}
        nogħmu fil-baħar safi.
        <span style={{ display: 'inline-block', width: 2, height: 18, background: 'var(--red)', verticalAlign: 'middle', marginLeft: 2 }}/>
      </div>
      {/* word counter */}
      <div style={{ position: 'absolute', bottom: 8, right: 14, fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>27 / 100 words</div>
    </div>

    {/* AI/teacher feedback */}
    <div style={{ margin: '14px 20px 0', padding: 14, borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>F</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Falko's notes</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? 'var(--red)' : 'rgba(0,0,0,0.15)'}><path d="M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z"/></svg>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>
        <div style={{ marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--sage-deep)', marginTop: 6, flexShrink: 0 }}/>
          <div><strong style={{ color: 'var(--ink)' }}>Vocabulary</strong> — nice use of "biż-żejt".</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--ochre)', marginTop: 6, flexShrink: 0 }}/>
          <div><strong style={{ color: 'var(--ink)' }}>Grammar</strong> — try "nieħu l-kolazzjon" instead of "Niekol kolazzjon".</div>
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', gap: 10 }}>
      <button style={{ flex: 1, height: 54, borderRadius: 27, border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', color: 'var(--ink)' }}>Save draft</button>
      <button style={{ flex: 1.4, height: 54, borderRadius: 27, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Submit</button>
    </div>
  </ScreenA>
);

// ═════════════════════════════════════════════════════════════
// 6. GRAMMAR LESSON — read-and-learn (Intermediate concept screen)
// ═════════════════════════════════════════════════════════════
const GrammarScreen = () => (
  <ScreenA>
    <StatusBarA/>
    <HeaderA title="Grammar · 2 of 6"/>
    <div style={{ padding: '4px 24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-2)' }}>
        <span style={{ padding: '3px 8px', borderRadius: 6, background: 'var(--ochre-tint)', color: 'var(--ochre)', fontWeight: 700, letterSpacing: 0.5 }}>INTERMEDIATE</span>
        <span>· concept lesson</span>
      </div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '12px 0 6px', letterSpacing: -0.5 }}>The article il- / l-</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>
        Maltese has one definite article that shape-shifts based on the next sound.
      </p>
    </div>

    {/* rule box */}
    <div style={{ margin: '20px 20px 0', padding: 16, borderRadius: 18, background: 'var(--cream-2)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', letterSpacing: 1.5 }}>THE RULE</div>
      <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
        Use <strong style={{ fontFamily: '"Bricolage Grotesque", serif' }}>il-</strong> before consonants and <strong style={{ fontFamily: '"Bricolage Grotesque", serif' }}>l-</strong> before vowels. With "sun letters" (ċ, d, n, r, s, t, x, ż, z), the <strong>l</strong> assimilates.
      </div>
    </div>

    {/* 3 examples */}
    <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { mt: 'il-ktieb', en: 'the book', tag: 'consonant' },
        { mt: 'l-omm', en: 'the mother', tag: 'vowel' },
        { mt: 'ix-xemx', en: 'the sun', tag: 'sun letter ·  l→x' },
      ].map((e, i) => (
        <div key={i} style={{ padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 18, color: 'var(--red)', minWidth: 90 }}>{e.mt}</div>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{e.en}</div>
          <div style={{ fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--cream-2)', color: 'var(--ink-2)', letterSpacing: 0.4 }}>{e.tag}</div>
        </div>
      ))}
    </div>

    {/* "try it" */}
    <div style={{ margin: '20px 20px 0', padding: 16, borderRadius: 18, background: 'var(--red)', color: '#fff' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>YOUR TURN</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 16, fontWeight: 600, marginTop: 4 }}>Add the article: ___ tifel (boy)</div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {['il-', 'l-', 'it-'].map((o, i) => (
          <div key={i} style={{
            flex: 1, height: 44, borderRadius: 12,
            background: i === 2 ? '#fff' : 'rgba(255,255,255,0.18)',
            color: i === 2 ? 'var(--red)' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 16,
            border: i === 2 ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
          }}>{o}</div>
        ))}
      </div>
    </div>

    <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Continue →</button>
  </ScreenA>
);

Object.assign(window, {
  TrackSelectScreen, ReadingScreen, SentenceBuilderScreen,
  WritingScreen, CompositionScreen, GrammarScreen,
});
