// Tgħallem — Maltese learning app screens
// All screens are 390×844 (iPhone 14 Pro logical), no frame
// Color tokens come from CSS variables on document root so the red-hue tweak can re-paint everything.

const Screen = ({ children, style = {}, bg = 'var(--cream)' }) =>
<div style={{
  width: 390, height: 844, background: bg, position: 'relative',
  fontFamily: '"Inter", system-ui, sans-serif',
  color: 'var(--ink)', overflow: 'hidden',
  ...style
}}>
    {children}
  </div>;


// ─────────────────────────────────────────────────────────────
// Status bar (light)
// ─────────────────────────────────────────────────────────────
const StatusBar = ({ dark = false, time = '9:41' }) => {
  const c = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{
      height: 54, padding: '18px 28px 0', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 16, color: c,
      position: 'relative', zIndex: 5
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill={c} /><rect x="5" y="5" width="3" height="6" rx="0.6" fill={c} /><rect x="10" y="2" width="3" height="9" rx="0.6" fill={c} /><rect x="15" y="0" width="3" height="11" rx="0.6" fill={c} /></svg>
        <svg width="24" height="12" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none" /><rect x="2" y="2" width="17" height="8" rx="1.5" fill={c} /></svg>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────────────
// Mascot — Falko, the Maltese falcon
// ─────────────────────────────────────────────────────────────
const Falko = ({ size = 120, mood = 'happy' }) =>
<svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
    {/* shadow */}
    <ellipse cx="60" cy="112" rx="32" ry="4" fill="rgba(0,0,0,0.08)" />
    {/* body */}
    <ellipse cx="60" cy="78" rx="32" ry="30" fill="var(--cream-2)" />
    {/* belly */}
    <ellipse cx="60" cy="84" rx="22" ry="22" fill="#fff" />
    {/* wing */}
    <path d="M 32 70 Q 22 78 28 96 Q 38 92 42 80 Z" fill="var(--sand)" />
    {/* head */}
    <circle cx="60" cy="42" r="28" fill="var(--cream-2)" />
    {/* face mask (warm red accent) */}
    <path d="M 38 38 Q 60 30 82 38 Q 80 50 60 52 Q 40 50 38 38 Z" fill="var(--red)" />
    {/* beak */}
    <path d="M 55 50 L 65 50 L 60 60 Z" fill="var(--ochre)" />
    {/* eyes */}
    {mood === 'happy' ?
  <>
        <path d="M 48 40 Q 51 37 54 40" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 66 40 Q 69 37 72 40" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </> :

  <>
        <circle cx="51" cy="40" r="3" fill="var(--ink)" />
        <circle cx="69" cy="40" r="3" fill="var(--ink)" />
        <circle cx="52" cy="39" r="1" fill="#fff" />
        <circle cx="70" cy="39" r="1" fill="#fff" />
      </>
  }
    {/* cheek blush */}
    <circle cx="42" cy="46" r="3" fill="var(--red)" opacity="0.3" />
    <circle cx="78" cy="46" r="3" fill="var(--red)" opacity="0.3" />
    {/* feet */}
    <rect x="50" y="105" width="6" height="6" rx="2" fill="var(--ochre)" />
    <rect x="64" y="105" width="6" height="6" rx="2" fill="var(--ochre)" />
  </svg>;


// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
const TabBar = ({ active = 'home' }) => {
  const tabs = [
  { id: 'home', label: 'Learn', icon: 'M3 11 L12 4 L21 11 L21 20 L14 20 L14 14 L10 14 L10 20 L3 20 Z' },
  { id: 'cats', label: 'Topics', icon: 'M4 4 L10 4 L10 10 L4 10 Z M14 4 L20 4 L20 10 L14 10 Z M4 14 L10 14 L10 20 L4 20 Z M14 14 L20 14 L20 20 L14 20 Z' },
  { id: 'progress', label: 'Progress', icon: 'M4 20 L4 12 M10 20 L10 8 M16 20 L16 14 M22 20 L22 4' },
  { id: 'profile', label: 'Profile', icon: 'M12 12 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M3 21 Q12 14 21 21' }];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 88, background: 'rgba(255,248,240,0.92)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      paddingTop: 12, zIndex: 10
    }}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        const color = isActive ? 'var(--red)' : 'var(--ink-2)';
        return (
          <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill={t.id === 'progress' ? 'none' : color} stroke={color} strokeWidth={t.id === 'progress' ? 2.5 : 1.5} strokeLinecap="round">
              <path d={t.icon} />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color, letterSpacing: -0.1 }}>{t.label}</span>
          </div>);

      })}
      {/* home indicator */}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: 'var(--ink)' }} />
    </div>);

};

// Generic header with back arrow + optional right action
const Header = ({ title, onBack = true, right, dark = false }) =>
<div style={{
  height: 56, padding: '0 20px', display: 'flex',
  alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 4
}}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {onBack && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : 'var(--ink)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6" /></svg>}
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17, color: dark ? '#fff' : 'var(--ink)' }}>{title}</div>
    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
  </div>;


// ═════════════════════════════════════════════════════════════
// 1. ONBOARDING
// ═════════════════════════════════════════════════════════════
const OnboardingScreen = () =>
<Screen bg="var(--red)" style={{ color: '#fff' }}>
    <StatusBar dark />
    {/* decorative shapes */}
    <svg style={{ position: 'absolute', top: -60, right: -60, opacity: 0.18 }} width="240" height="240" viewBox="0 0 240 240">
      <circle cx="120" cy="120" r="120" fill="#fff" />
    </svg>
    <svg style={{ position: 'absolute', bottom: 200, left: -40, opacity: 0.12 }} width="160" height="160" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="80" fill="#fff" />
    </svg>

    {/* mascot */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
      <div style={{ width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Falko size={170} />
      </div>
    </div>

    <div style={{ padding: '40px 32px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.8, marginBottom: 8 }}>MERĦBA · WELCOME</div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 40, fontWeight: 600, lineHeight: 1.05, margin: '0 0 14px', letterSpacing: -1 }}>Learn Maltese the easy way

    </h1>
      <p style={{ fontSize: 16, lineHeight: 1.5, opacity: 0.88, margin: 0, fontWeight: 400 }}>Fun bite-sized lessons

    </p>
    </div>

    {/* CTAs */}
    <div style={{ position: 'absolute', bottom: 56, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button style={{
      height: 56, borderRadius: 28, border: 'none',
      background: '#fff', color: 'var(--red)',
      fontSize: 17, fontWeight: 700, fontFamily: 'inherit',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
    }}>Start learning →</button>
      <button style={{
      height: 56, borderRadius: 28, border: '1.5px solid rgba(255,255,255,0.5)',
      background: 'transparent', color: '#fff',
      fontSize: 16, fontWeight: 600, fontFamily: 'inherit'
    }}>I already have an account</button>
      {/* dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
        <div style={{ width: 24, height: 6, borderRadius: 3, background: '#fff' }} />
        <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.4)' }} />
      </div>
    </div>
  </Screen>;


// ═════════════════════════════════════════════════════════════
// 2. HOME / DASHBOARD
// ═════════════════════════════════════════════════════════════
const HomeScreen = () =>
<Screen>
    <StatusBar />

    {/* top hero */}
    <div style={{ padding: '8px 24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>Bonġu, Sarah 👋</div>
          <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0 0', letterSpacing: -0.5 }}>Let's learn today</h1>
        </div>
        {/* streak */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, background: 'var(--red)', color: '#fff' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 2 C 14 6 18 8 18 14 A 6 6 0 1 1 6 14 C 6 11 8 9 8 6 C 10 8 11 9 12 2 Z" /></svg>
          <span style={{ fontSize: 14, fontWeight: 700 }}>7 days</span>
        </div>
      </div>
    </div>

    {/* daily goal card */}
    <div style={{ margin: '18px 20px 0', padding: 20, borderRadius: 22, background: 'var(--red)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, bottom: -10, opacity: 0.95 }}>
        <Falko size={120} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>DAILY GOAL</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 24, fontWeight: 600, marginTop: 4, lineHeight: 1.15, maxWidth: 200 }}>3 of 5 lessons done</div>
      {/* progress bar */}
      <div style={{ marginTop: 16, width: 200, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.25)' }}>
        <div style={{ width: '60%', height: '100%', borderRadius: 4, background: '#fff' }} />
      </div>
      <button style={{
      marginTop: 18, height: 40, padding: '0 18px', borderRadius: 20,
      border: 'none', background: '#fff', color: 'var(--red)',
      fontSize: 14, fontWeight: 700, fontFamily: 'inherit'
    }}>Continue →</button>
    </div>

    {/* Continue learning */}
    <div style={{ padding: '24px 20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 600, margin: 0 }}>Pick up where you left off</h2>
        <span style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>See all</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
      { emoji: 'A', title: 'The Alphabet', sub: 'Lesson 4 · Letters Ġ Ħ Ż', pct: 80, tone: 'var(--sand)' },
      { emoji: '5', title: 'Numbers 1–20', sub: 'Lesson 2 · Counting up', pct: 45, tone: 'var(--sage)' }].
      map((c, i) =>
      <div key={i} style={{
        padding: 14, borderRadius: 18, background: '#fff',
        border: '1px solid rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', gap: 14
      }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: c.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 22, color: 'var(--ink)' }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{c.sub}</div>
              <div style={{ marginTop: 8, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }}>
                <div style={{ width: c.pct + '%', height: '100%', borderRadius: 3, background: 'var(--red)' }} />
              </div>
            </div>
          </div>
      )}
      </div>
    </div>

    {/* phrase of the day */}
    <div style={{ margin: '20px 20px 0', padding: 16, borderRadius: 18, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>💬</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', letterSpacing: 1 }}>PHRASE OF THE DAY</div>
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 16, fontWeight: 600, marginTop: 2 }}>Kif int?</div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>“How are you?”</div>
      </div>
    </div>

    <TabBar active="home" />
  </Screen>;


// ═════════════════════════════════════════════════════════════
// 3. LESSON LIST
// ═════════════════════════════════════════════════════════════
const LessonListScreen = () => {
  const lessons = [
  { n: 1, title: 'The Alphabet', sub: '30 letters, sounds & tricks', state: 'done' },
  { n: 2, title: 'Greetings', sub: 'Hello, goodbye, please, thanks', state: 'done' },
  { n: 3, title: 'Numbers 1–10', sub: 'Counting basics', state: 'active' },
  { n: 4, title: 'Numbers 11–100', sub: 'Tens and combinations', state: 'locked' },
  { n: 5, title: 'Days & Months', sub: 'Calendar vocab', state: 'locked' },
  { n: 6, title: 'Common Verbs', sub: 'Be, have, go, do', state: 'locked' }];


  return (
    <Screen>
      <StatusBar />
      <Header title="Beginner Path" />
      <div style={{ padding: '4px 20px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 28, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.5 }}>Foundation</h1>
        <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>6 lessons · ~45 min total</div>
        {/* unit progress */}
        <div style={{ marginTop: 14, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ width: '33%', height: '100%', borderRadius: 4, background: 'var(--red)' }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 6 }}>2 of 6 complete</div>
      </div>

      {/* lesson rows w/ connector line */}
      <div style={{ padding: '20px 20px 100px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 46, top: 36, bottom: 110, width: 2, background: 'rgba(0,0,0,0.06)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lessons.map((l) => {
            const isDone = l.state === 'done';
            const isActive = l.state === 'active';
            const isLocked = l.state === 'locked';
            return (
              <div key={l.n} style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 26,
                  background: isDone ? 'var(--red)' : isActive ? '#fff' : 'var(--cream-2)',
                  border: isActive ? '3px solid var(--red)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDone ? '#fff' : isActive ? 'var(--red)' : 'var(--ink-3)',
                  fontWeight: 700, fontSize: 16, fontFamily: '"Bricolage Grotesque", serif',
                  boxShadow: isActive ? '0 0 0 6px rgba(207,20,43,0.15)' : 'none'
                }}>
                  {isDone ?
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg> :
                  isLocked ?
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--ink-3)"><path d="M6 10 V8 a6 6 0 0 1 12 0 v2 h1 a1 1 0 0 1 1 1 v9 a1 1 0 0 1 -1 1 H5 a1 1 0 0 1 -1 -1 v-9 a1 1 0 0 1 1 -1 z M8 10 h8 V8 a4 4 0 0 0 -8 0 z" /></svg> :
                  l.n}
                </div>
                <div style={{ flex: 1, padding: '14px 16px', background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)', opacity: isLocked ? 0.55 : 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{l.sub}</div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </Screen>);

};

// ═════════════════════════════════════════════════════════════
// 4. INSIDE LESSON — flashcard
// ═════════════════════════════════════════════════════════════
const FlashcardScreen = () =>
<Screen bg="var(--cream-2)">
    <StatusBar />
    {/* top: progress + close */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 20px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18" /></svg>
      </div>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.07)' }}>
        <div style={{ width: '40%', height: '100%', borderRadius: 4, background: 'var(--red)' }} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>4/10</div>
    </div>

    {/* prompt */}
    <div style={{ padding: '24px 28px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'var(--red)' }}>LEARN A LETTER</div>
    </div>

    {/* flashcard */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
      <div style={{
      width: 300, height: 380, borderRadius: 28, background: '#fff',
      boxShadow: '0 8px 32px rgba(207,20,43,0.12), 0 2px 6px rgba(0,0,0,0.05)',
      position: 'relative', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'hidden'
    }}>
        {/* corner decoration */}
        <div style={{ position: 'absolute', top: 14, left: 16, fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 1.5 }}>LETTER 5 / 30</div>
        <div style={{ position: 'absolute', top: 14, right: 16, width: 8, height: 8, borderRadius: 4, background: 'var(--red)' }} />

        {/* big letter */}
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 180, fontWeight: 600, color: 'var(--red)', lineHeight: 1, letterSpacing: -4 }}>Ġġ</div>
        <div style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-2)', fontWeight: 500 }}>Sounds like <strong style={{ color: 'var(--ink)' }}>“j”</strong> in <em>jam</em></div>

        {/* example */}
        <div style={{ marginTop: 20, padding: '10px 18px', borderRadius: 14, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 18 }}>ġelat</span>
          <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>· ice cream</span>
        </div>
      </div>
    </div>

    {/* swipe hint */}
    <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--ink-2)' }}>
      ← Swipe to learn more →
    </div>

    {/* action buttons */}
    <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', gap: 12 }}>
      <button style={{
      flex: 1, height: 56, borderRadius: 28,
      border: '1.5px solid rgba(0,0,0,0.08)', background: '#fff',
      fontSize: 15, fontWeight: 600, fontFamily: 'inherit', color: 'var(--ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
    }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M9 9 v6 M15 9 v6" /></svg>
        Practice
      </button>
      <button style={{
      flex: 1.4, height: 56, borderRadius: 28, border: 'none',
      background: 'var(--red)', color: '#fff',
      fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
      boxShadow: '0 6px 18px rgba(207,20,43,0.3)'
    }}>Got it →</button>
    </div>
  </Screen>;


// ═════════════════════════════════════════════════════════════
// 5. QUIZ — multiple choice
// ═════════════════════════════════════════════════════════════
const QuizScreen = () => {
  const opts = [
  { letter: 'A', text: 'Apple', correct: false },
  { letter: 'B', text: 'Bread', correct: true, selected: true },
  { letter: 'C', text: 'Cheese', correct: false },
  { letter: 'D', text: 'Water', correct: false }];

  return (
    <Screen bg="var(--cream-2)">
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 20px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18" /></svg>
        </div>
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.07)' }}>
          <div style={{ width: '70%', height: '100%', borderRadius: 4, background: 'var(--red)' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[1, 2, 3].map((i) =>
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 3 ? 'var(--red)' : 'rgba(0,0,0,0.15)'}>
              <path d="M12 21 C 6 16 2 12 2 8 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0 c 0 4 -4 8 -10 13 z" />
            </svg>
          )}
        </div>
      </div>

      <div style={{ padding: '28px 28px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'var(--red)' }}>WHAT DOES THIS MEAN?</div>
        <div style={{
          marginTop: 20, padding: '32px 28px', borderRadius: 24, background: '#fff',
          textAlign: 'center', boxShadow: '0 4px 18px rgba(0,0,0,0.04)'
        }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 48, fontWeight: 600, color: 'var(--ink)', letterSpacing: -1 }}>Ħobż</div>
          <div style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>noun · masculine</div>
        </div>
      </div>

      {/* options */}
      <div style={{ padding: '22px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map((o) =>
        <div key={o.letter} style={{
          padding: 14, borderRadius: 18, background: '#fff',
          border: o.selected ? '2px solid var(--red)' : '1.5px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: o.selected ? '0 0 0 4px rgba(207,20,43,0.1)' : 'none'
        }}>
            <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: o.selected ? 'var(--red)' : 'var(--cream-2)',
            color: o.selected ? '#fff' : 'var(--ink-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontFamily: '"Bricolage Grotesque", serif'
          }}>{o.letter}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{o.text}</div>
          </div>
        )}
      </div>

      <button style={{
        position: 'absolute', bottom: 40, left: 24, right: 24, height: 56,
        borderRadius: 28, border: 'none',
        background: 'var(--red)', color: '#fff',
        fontSize: 17, fontWeight: 700, fontFamily: 'inherit',
        boxShadow: '0 6px 18px rgba(207,20,43,0.3)'
      }}>Check answer</button>
    </Screen>);

};

// ═════════════════════════════════════════════════════════════
// 6. CATEGORIES
// ═════════════════════════════════════════════════════════════
// Category icon shapes — geometric, drawn from circles & rounded rects
const CatIcon = ({ kind, color }) => {
  const C = color;
  switch (kind) {
    case 'food': // bread loaf
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <ellipse cx="22" cy="26" rx="16" ry="10" fill={C} />
          <ellipse cx="22" cy="22" rx="13" ry="8" fill="#fff" opacity="0.35" />
          <line x1="14" y1="22" x2="30" y2="22" stroke={C} strokeWidth="1.5" opacity="0.5" />
        </svg>);

    case 'animals': // cat face
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M10 14 L14 8 L18 16 Z M34 14 L30 8 L26 16 Z" fill={C} />
          <circle cx="22" cy="24" r="14" fill={C} />
          <circle cx="17" cy="22" r="2" fill="#fff" />
          <circle cx="27" cy="22" r="2" fill="#fff" />
          <path d="M20 28 Q22 30 24 28" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>);

    case 'shop': // bag
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M10 16 L34 16 L32 36 L12 36 Z" fill={C} />
          <path d="M16 16 V12 a6 6 0 0 1 12 0 V16" stroke={C} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>);

    case 'doctor': // cross
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="16" fill={C} />
          <rect x="18" y="12" width="8" height="20" rx="2" fill="#fff" />
          <rect x="12" y="18" width="20" height="8" rx="2" fill="#fff" />
        </svg>);

    case 'travel': // boat
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M6 26 L38 26 L34 34 L10 34 Z" fill={C} />
          <rect x="20" y="10" width="2" height="16" fill={C} />
          <path d="M22 10 L32 22 L22 22 Z" fill={C} />
        </svg>);

    case 'family': // people
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="16" cy="16" r="5" fill={C} />
          <circle cx="28" cy="16" r="5" fill={C} />
          <path d="M6 34 Q6 24 16 24 Q26 24 26 34 Z" fill={C} />
          <path d="M18 34 Q18 24 28 24 Q38 24 38 34 Z" fill={C} opacity="0.7" />
        </svg>);

    case 'numbers': // 123
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="16" fill={C} />
          <text x="22" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="'Bricolage Grotesque', serif">123</text>
        </svg>);

    case 'home': // house
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M8 22 L22 8 L36 22 V36 H8 Z" fill={C} />
          <rect x="18" y="24" width="8" height="12" fill="#fff" />
        </svg>);

    default:return null;
  }
};

const CategoriesScreen = () => {
  const cats = [
  { id: 'numbers', mt: 'Numri', en: 'Numbers', n: 28, color: 'var(--red)', bg: 'var(--red-tint)' },
  { id: 'food', mt: 'Ikel', en: 'Food', n: 64, color: 'var(--ochre)', bg: 'var(--ochre-tint)' },
  { id: 'animals', mt: 'Annimali', en: 'Animals', n: 42, color: 'var(--sage-deep)', bg: 'var(--sage)' },
  { id: 'shop', mt: 'Tixrija', en: 'Shopping', n: 38, color: 'var(--terracotta)', bg: 'var(--cream-2)' },
  { id: 'doctor', mt: 'Tabib', en: 'Doctor', n: 30, color: 'var(--red)', bg: 'var(--red-tint)' },
  { id: 'family', mt: 'Familja', en: 'Family', n: 24, color: 'var(--ochre)', bg: 'var(--ochre-tint)' },
  { id: 'travel', mt: 'Vjaġġ', en: 'Travel', n: 36, color: 'var(--sage-deep)', bg: 'var(--sage)' },
  { id: 'home', mt: 'Dar', en: 'Home', n: 32, color: 'var(--terracotta)', bg: 'var(--cream-2)' }];

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 28, fontWeight: 600, margin: '4px 0 4px', letterSpacing: -0.5 }}>Topics</h1>
        <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>Pick a theme to explore</div>
      </div>

      {/* search */}
      <div style={{ margin: '14px 20px 0', height: 44, borderRadius: 14, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M16 16 L21 21" /></svg>
        <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>Search topics or words…</span>
      </div>

      {/* grid */}
      <div style={{ padding: '18px 20px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cats.map((c) =>
        <div key={c.id} style={{
          padding: 16, borderRadius: 22, background: c.bg, position: 'relative',
          minHeight: 132, border: '1px solid rgba(0,0,0,0.04)'
        }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CatIcon kind={c.id} color={c.color} />
            </div>
            <div style={{ marginTop: 14, fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: -0.3 }}>{c.mt}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 1 }}>{c.en} · {c.n} words</div>
          </div>
        )}
      </div>

      <TabBar active="cats" />
    </Screen>);

};

// ═════════════════════════════════════════════════════════════
// 7. PROGRESS
// ═════════════════════════════════════════════════════════════
const ProgressScreen = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const pattern = [1, 1, 1, 1, 1, 1, 1]; // all done
  const badges = [
  { name: 'First Word', mt: 'L-ewwel kelma', earned: true, icon: '★' },
  { name: 'Week Warrior', mt: '7-day streak', earned: true, icon: '🔥' },
  { name: 'Alphabet Ace', mt: 'Alfabett', earned: true, icon: 'A' },
  { name: 'Number Pro', mt: 'Numri', earned: false, icon: '5' },
  { name: 'Foodie', mt: 'Ikel master', earned: false, icon: '◐' },
  { name: 'Globetrotter', mt: 'Vjaġġatur', earned: false, icon: '◯' }];

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 28, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>Your progress</h1>
        <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>Keep the fire going 🔥</div>
      </div>

      {/* big streak card */}
      <div style={{ margin: '18px 20px 0', padding: 22, borderRadius: 22, background: 'var(--red)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 58, fontWeight: 600, lineHeight: 1, letterSpacing: -2 }}>7</div>
          <div style={{ fontSize: 14, opacity: 0.85, fontWeight: 500 }}>day streak</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
          {days.map((d, i) =>
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
              width: 30, height: 30, borderRadius: 15,
              background: pattern[i] ? '#fff' : 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {pattern[i] ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg> : null}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>{d}</div>
            </div>
          )}
        </div>
      </div>

      {/* stats row */}
      <div style={{ padding: '18px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
        { v: '142', l: 'Words' },
        { v: '23', l: 'Lessons' },
        { v: '6h', l: 'Practiced' }].
        map((s, i) =>
        <div key={i} style={{ padding: 14, borderRadius: 16, background: '#fff', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>{s.v}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 2, fontWeight: 500 }}>{s.l}</div>
          </div>
        )}
      </div>

      {/* badges */}
      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 18, fontWeight: 600, margin: 0 }}>Badges</h2>
          <span style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>3 of 12</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {badges.map((b, i) =>
          <div key={i} style={{
            padding: 12, borderRadius: 16, background: '#fff',
            border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center',
            opacity: b.earned ? 1 : 0.45
          }}>
              <div style={{
              width: 52, height: 52, borderRadius: 26, margin: '0 auto',
              background: b.earned ? 'var(--red-tint)' : 'rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 20,
              color: b.earned ? 'var(--red)' : 'var(--ink-3)'
            }}>{b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{b.name}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 1 }}>{b.mt}</div>
            </div>
          )}
        </div>
      </div>

      <TabBar active="progress" />
    </Screen>);

};

// ═════════════════════════════════════════════════════════════
// 8. PROFILE / SETTINGS
// ═════════════════════════════════════════════════════════════
const ProfileScreen = () => {
  const Row = ({ icon, label, right, danger }) =>
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#fff' }}>
      <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: danger ? 'var(--red-tint)' : 'var(--cream-2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: danger ? 'var(--red)' : 'var(--ink)'
    }}>{icon}</div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: danger ? 'var(--red)' : 'var(--ink)' }}>{label}</div>
      {right ?? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 L15 12 L9 18" /></svg>}
    </div>;

  return (
    <Screen>
      <StatusBar />
      {/* profile hero */}
      <div style={{ padding: '20px 24px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--red-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 38, color: 'var(--red)' }}>S</div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, background: 'var(--red)', border: '3px solid var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M3 17 V21 H7 L18 10 L14 6 L3 17 Z M21 7 L17 3 L14 6 L18 10 Z" /></svg>
          </div>
        </div>
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, marginTop: 12 }}>Sarah Borg</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Beginner · joined March 2026</div>
      </div>

      {/* level chip + Maltese flag */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, padding: 14, borderRadius: 16, background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>LEVEL</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
            <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600 }}>3</div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>Beginner</div>
          </div>
          <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }}>
            <div style={{ width: '40%', height: '100%', borderRadius: 3, background: 'var(--red)' }} />
          </div>
        </div>
        <div style={{ width: 96, padding: 14, borderRadius: 16, background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>LEARNING</div>
          {/* simple Maltese flag */}
          <div style={{ marginTop: 8, width: 44, height: 28, borderRadius: 4, overflow: 'hidden', display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ flex: 1, background: '#fff' }} />
            <div style={{ flex: 1, background: 'var(--red)' }} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>Malti</div>
        </div>
      </div>

      {/* settings group */}
      <div style={{ padding: '18px 20px 100px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, padding: '0 4px 8px' }}>PREFERENCES</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Row icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 v3 M12 19 v3 M4.2 4.2 l2 2 M17.8 17.8 l2 2 M2 12 h3 M19 12 h3 M4.2 19.8 l2 -2 M17.8 6.2 l2 -2" /><circle cx="12" cy="12" r="4" /></svg>} label="Daily reminder · 7:00 PM" />
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }} />
          <Row icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12 a9 9 0 0 0 18 0 a9 9 0 0 0 -18 0 M3 12 h18 M12 3 a14 14 0 0 1 0 18 a14 14 0 0 1 0 -18" /></svg>} label="App language · English" />
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }} />
          <Row icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11 V7 a5 5 0 0 1 10 0 v4" /></svg>} label="Privacy" />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, padding: '20px 4px 8px' }}>ABOUT</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Row icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M9 9 a3 3 0 0 1 6 0 c0 2 -3 2 -3 4 M12 17 v.01" /></svg>} label="Help & support" />
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }} />
          <Row icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18 L15 12 L9 6" /></svg>} label="Sign out" danger />
        </div>
      </div>

      <TabBar active="profile" />
    </Screen>);

};

Object.assign(window, {
  OnboardingScreen, HomeScreen, LessonListScreen, FlashcardScreen,
  QuizScreen, CategoriesScreen, ProgressScreen, ProfileScreen
});