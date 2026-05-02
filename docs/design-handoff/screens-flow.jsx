// Additional screens: full onboarding flow, privacy, sign-out confirmation, flow diagram

// Reused mini components (must mirror screens.jsx)
const Screen2 = ({ children, style = {}, bg = 'var(--cream)' }) => (
  <div style={{
    width: 390, height: 844, background: bg, position: 'relative',
    fontFamily: '"Inter", system-ui, sans-serif',
    color: 'var(--ink)', overflow: 'hidden', ...style,
  }}>{children}</div>
);

const StatusBar2 = ({ dark = false }) => {
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

const Header2 = ({ title, dark = false, step }) => (
  <div style={{
    height: 56, padding: '0 20px', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 4,
  }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : 'var(--ink)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
    </div>
    <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 17, color: dark ? '#fff' : 'var(--ink)' }}>{title}</div>
    <div style={{ width: 40, fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', textAlign: 'right' }}>{step}</div>
  </div>
);

// Mini Falko for header use
const FalkoMini = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <ellipse cx="60" cy="78" rx="32" ry="30" fill="var(--cream-2)"/>
    <ellipse cx="60" cy="84" rx="22" ry="22" fill="#fff"/>
    <path d="M 32 70 Q 22 78 28 96 Q 38 92 42 80 Z" fill="var(--sand)"/>
    <circle cx="60" cy="42" r="28" fill="var(--cream-2)"/>
    <path d="M 38 38 Q 60 30 82 38 Q 80 50 60 52 Q 40 50 38 38 Z" fill="var(--red)"/>
    <path d="M 55 50 L 65 50 L 60 60 Z" fill="var(--ochre)"/>
    <path d="M 48 40 Q 51 37 54 40" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M 66 40 Q 69 37 72 40" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="42" cy="46" r="3" fill="var(--red)" opacity="0.3"/>
    <circle cx="78" cy="46" r="3" fill="var(--red)" opacity="0.3"/>
  </svg>
);

// ═════════════════════════════════════════════════════════════
// ONBOARDING 02 — Carousel feature slide
// ═════════════════════════════════════════════════════════════
const OnboardingSlide2 = () => (
  <Screen2>
    <StatusBar2/>
    <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px' }}>
      <span style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 600 }}>Skip</span>
    </div>
    {/* illustration: stacked cards */}
    <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', width: 200, height: 260, borderRadius: 22, background: 'var(--sage)', transform: 'rotate(-8deg) translateX(-30px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontSize: 80, fontWeight: 600, color: 'var(--sage-deep)' }}>Ġ</div>
      <div style={{ position: 'absolute', width: 200, height: 260, borderRadius: 22, background: 'var(--ochre-tint)', transform: 'rotate(6deg) translateX(40px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontSize: 80, fontWeight: 600, color: 'var(--ochre)' }}>5</div>
      <div style={{ position: 'absolute', width: 220, height: 280, borderRadius: 24, background: 'var(--red)', boxShadow: '0 12px 30px rgba(207,20,43,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontSize: 110, fontWeight: 600, color: '#fff' }}>Ħ</div>
    </div>
    <div style={{ padding: '20px 36px 0', textAlign: 'center' }}>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 30, fontWeight: 600, margin: '0 0 12px', letterSpacing: -0.8, lineHeight: 1.1 }}>Bite-sized cards, real progress</h1>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>Swipe through letters, numbers, and phrases. 5 minutes a day is all it takes.</p>
    </div>
    <div style={{ position: 'absolute', bottom: 56, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button style={{ height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Continue →</button>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.15)' }}/>
        <div style={{ width: 24, height: 6, borderRadius: 3, background: 'var(--red)' }}/>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.15)' }}/>
      </div>
    </div>
  </Screen2>
);

// ═════════════════════════════════════════════════════════════
// AUTH GATE — Sign up vs sign in
// ═════════════════════════════════════════════════════════════
const AuthGateScreen = () => (
  <Screen2>
    <StatusBar2/>
    <div style={{ padding: '40px 28px 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <FalkoMini size={88}/>
      </div>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 30, fontWeight: 600, margin: '0 0 10px', letterSpacing: -0.6 }}>Save your progress</h1>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>Create an account so streaks, badges and lessons sync across your devices.</p>
    </div>

    <div style={{ position: 'absolute', bottom: 48, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button style={{ height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Sign up with email</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }}/>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }}/>
      </div>

      {[
        { label: 'Continue with Apple', dark: true, icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="#fff"><path d="M11 0c.1 1-.3 2-1 3-.7 1-1.7 1.7-2.7 1.6-.1-1 .3-2 1-2.8.7-.9 1.8-1.6 2.7-1.8zM14 13.5c-.4 1-.8 2-1.5 3-.9 1.2-1.8 2.3-3 2.3-1.2 0-1.6-.7-3-.7-1.4 0-1.8.7-3 .7-1.2 0-2.2-1.2-3.1-2.4C-.4 13.7-.5 9.7 1.6 7.6c.9-.9 2.2-1.5 3.4-1.5 1.2 0 2 .7 3 .7 1 0 1.6-.7 3-.7 1 0 2.2.5 3.1 1.5-2.7 1.5-2.3 5.5-.1 5.9z"/></svg> },
        { label: 'Continue with Google', dark: false, icon: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8c-.2 1.1-.8 2-1.8 2.6v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.4z" fill="#4285F4"/><path d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" fill="#34A853"/><path d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H.9C.3 6.2 0 7.5 0 9s.3 2.8.9 4l3-2.3z" fill="#FBBC04"/><path d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" fill="#EA4335"/></svg> },
      ].map(b => (
        <button key={b.label} style={{ height: 52, borderRadius: 26, border: b.dark ? 'none' : '1.5px solid rgba(0,0,0,0.1)', background: b.dark ? 'var(--ink)' : '#fff', color: b.dark ? '#fff' : 'var(--ink)', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          {b.icon}{b.label}
        </button>
      ))}

      <div style={{ textAlign: 'center', marginTop: 6, fontSize: 14, color: 'var(--ink-2)' }}>
        Already have an account? <span style={{ color: 'var(--red)', fontWeight: 700 }}>Sign in</span>
      </div>
    </div>
  </Screen2>
);

// ═════════════════════════════════════════════════════════════
// SIGN UP — Email & password
// ═════════════════════════════════════════════════════════════
const SignUpScreen = () => (
  <Screen2>
    <StatusBar2/>
    <Header2 title="Create account" step="1 of 3"/>
    <div style={{ padding: '12px 24px 0' }}>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.5 }}>What's your email?</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>We'll use this to save your progress.</p>

      <div style={{ marginTop: 28 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>EMAIL</label>
        <div style={{ marginTop: 6, height: 56, borderRadius: 16, background: '#fff', border: '2px solid var(--red)', display: 'flex', alignItems: 'center', padding: '0 16px', boxShadow: '0 0 0 4px rgba(207,20,43,0.08)' }}>
          <span style={{ fontSize: 16, color: 'var(--ink)' }}>sarah.borg@gmail.com</span>
          <span style={{ width: 1, height: 22, background: 'var(--red)', marginLeft: 1, animation: 'blink 1s infinite' }}/>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>PASSWORD</label>
        <div style={{ marginTop: 6, height: 56, borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 16, color: 'var(--ink-3)' }}>At least 8 characters</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round"><path d="M2 12 c3 -5 7 -7 10 -7 c3 0 7 2 10 7 c-3 5 -7 7 -10 7 c-3 0 -7 -2 -10 -7 z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      </div>

      {/* checkbox */}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
          I agree to the <span style={{ color: 'var(--red)', fontWeight: 600 }}>Terms</span> and <span style={{ color: 'var(--red)', fontWeight: 600 }}>Privacy Policy</span>.
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: '#fff', border: '1.5px solid rgba(0,0,0,0.15)', flexShrink: 0, marginTop: 1 }}/>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>Send me weekly Maltese tips and culture stories.</div>
      </div>
    </div>

    <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Continue →</button>
  </Screen2>
);

// ═════════════════════════════════════════════════════════════
// LEVEL SELECTION
// ═════════════════════════════════════════════════════════════
const LevelScreen = () => {
  const levels = [
    { id: 'beginner', mt: 'Beġinner', en: 'Beginner', sub: "I'm new to Maltese", phrase: 'Bonġu! · Hello!', selected: true, n: 0 },
    { id: 'intermediate', mt: 'Medju', en: 'Intermediate', sub: 'I know some basics', phrase: 'Kif inti llum?', selected: false, n: 1 },
    { id: 'advanced', mt: 'Avvanzat', en: 'Advanced', sub: 'I can hold a conversation', phrase: 'Imma għaliex le?', selected: false, n: 2 },
  ];
  return (
    <Screen2>
      <StatusBar2/>
      <Header2 title="Your level" step="2 of 3"/>
      <div style={{ padding: '12px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.5 }}>Where are you starting?</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>We'll pick a path that feels right — you can change this anytime.</p>
      </div>

      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {levels.map(l => (
          <div key={l.id} style={{
            padding: 18, borderRadius: 20, background: '#fff',
            border: l.selected ? '2px solid var(--red)' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: l.selected ? '0 0 0 4px rgba(207,20,43,0.1)' : 'none',
            display: 'flex', alignItems: 'center', gap: 16, position: 'relative',
          }}>
            {/* level dots */}
            <div style={{ width: 56, height: 56, borderRadius: 16, background: l.selected ? 'var(--red)' : 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, flexShrink: 0 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 8, height: i <= l.n ? 22 : 10, borderRadius: 4,
                  background: i <= l.n
                    ? (l.selected ? '#fff' : 'var(--red)')
                    : (l.selected ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.12)'),
                }}/>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: '"Bricolage Grotesque", serif', fontWeight: 600, fontSize: 18 }}>{l.mt}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>· {l.en}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{l.sub}</div>
              <div style={{ marginTop: 8, fontSize: 12, fontStyle: 'italic', color: 'var(--ink-3)' }}>"{l.phrase}"</div>
            </div>
            {l.selected && (
              <div style={{ position: 'absolute', top: 14, right: 14, width: 22, height: 22, borderRadius: 11, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* placement test option */}
      <div style={{ margin: '18px 20px 0', padding: 14, borderRadius: 16, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9 a3 3 0 0 1 6 0 c0 2 -3 2 -3 4 M12 17 v.01"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Not sure? Take a 2-min placement test</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 L15 12 L9 18"/></svg>
      </div>

      <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Continue →</button>
    </Screen2>
  );
};

// ═════════════════════════════════════════════════════════════
// GOAL — Daily commitment
// ═════════════════════════════════════════════════════════════
const GoalScreen = () => {
  const goals = [
    { mins: 5, label: 'Casual', sub: '5 min / day' },
    { mins: 10, label: 'Regular', sub: '10 min / day', selected: true },
    { mins: 15, label: 'Serious', sub: '15 min / day' },
    { mins: 20, label: 'Intense', sub: '20 min / day' },
  ];
  return (
    <Screen2>
      <StatusBar2/>
      <Header2 title="Daily goal" step="3 of 3"/>
      <div style={{ padding: '12px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '8px 0 4px', letterSpacing: -0.5 }}>How much time per day?</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Small, steady is better than big and brittle.</p>
      </div>

      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {goals.map(g => (
          <div key={g.mins} style={{
            padding: '16px 18px', borderRadius: 18, background: '#fff',
            border: g.selected ? '2px solid var(--red)' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: g.selected ? '0 0 0 4px rgba(207,20,43,0.1)' : 'none',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: g.selected ? 'var(--red)' : 'var(--cream-2)', color: g.selected ? '#fff' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 16 }}>{g.mins}m</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{g.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 1 }}>{g.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: '20px 20px 0', padding: 14, borderRadius: 16, background: 'var(--red-tint)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <FalkoMini size={48}/>
        <div style={{ flex: 1, fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--red)' }}>Falko says:</strong> daily reminders make a 4× difference. Want one?
        </div>
      </div>

      <button style={{ position: 'absolute', bottom: 40, left: 24, right: 24, height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Start learning →</button>
    </Screen2>
  );
};

// ═════════════════════════════════════════════════════════════
// SIGN IN
// ═════════════════════════════════════════════════════════════
const SignInScreen = () => (
  <Screen2>
    <StatusBar2/>
    <Header2 title="Sign in"/>
    <div style={{ padding: '20px 24px 0', textAlign: 'center' }}>
      <FalkoMini size={72}/>
      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '12px 0 4px', letterSpacing: -0.5 }}>Welcome back</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Pick up where you left off.</p>
    </div>

    <div style={{ padding: '32px 24px 0' }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1 }}>EMAIL</label>
      <div style={{ marginTop: 6, height: 56, borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <span style={{ fontSize: 16, color: 'var(--ink)' }}>sarah.borg@gmail.com</span>
      </div>
      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, display: 'block', marginTop: 18 }}>PASSWORD</label>
      <div style={{ marginTop: 6, height: 56, borderRadius: 16, background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, color: 'var(--ink)', letterSpacing: 4 }}>••••••••••</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round"><path d="M2 12 c3 -5 7 -7 10 -7 c3 0 7 2 10 7 c-3 5 -7 7 -10 7 c-3 0 -7 -2 -10 -7 z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
      <div style={{ textAlign: 'right', marginTop: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>Forgot password?</span>
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button style={{ height: 56, borderRadius: 28, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(207,20,43,0.3)' }}>Sign in</button>
      <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-2)' }}>
        New here? <span style={{ color: 'var(--red)', fontWeight: 700 }}>Create an account</span>
      </div>
    </div>
  </Screen2>
);

// ═════════════════════════════════════════════════════════════
// PRIVACY
// ═════════════════════════════════════════════════════════════
const PrivacyScreen = () => {
  const Toggle = ({ on }) => (
    <div style={{ width: 46, height: 28, borderRadius: 14, background: on ? 'var(--red)' : 'rgba(0,0,0,0.18)', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 24, height: 24, borderRadius: 12, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
    </div>
  );
  const ToggleRow = ({ icon, title, sub, on }) => (
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.35 }}>{sub}</div>
      </div>
      <Toggle on={on}/>
    </div>
  );
  return (
    <Screen2>
      <StatusBar2/>
      <Header2 title="Privacy"/>
      <div style={{ padding: '8px 24px 0' }}>
        <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 26, fontWeight: 600, margin: '4px 0', letterSpacing: -0.5 }}>Your data, your call</h1>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, padding: '0 4px 8px' }}>USAGE</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <ToggleRow on={true} title="Personalised lessons" sub="Use my activity to suggest topics I'll like." icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"><path d="M12 2 v3 M12 19 v3 M4 12 H1 M23 12 h-3"/><circle cx="12" cy="12" r="6"/></svg>}/>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }}/>
          <ToggleRow on={false} title="Anonymous analytics" sub="Help us improve the app — never sold or shared." icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"><path d="M4 20 V12 M10 20 V8 M16 20 V14 M22 20 V4"/></svg>}/>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }}/>
          <ToggleRow on={true} title="Show me on leaderboards" sub="Only your display name appears." icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4 H18 V10 a6 6 0 0 1 -12 0 Z M6 7 H3 V9 a3 3 0 0 0 3 3 M18 7 H21 V9 a3 3 0 0 1 -3 3 M9 20 H15 M12 14 V20"/></svg>}/>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, padding: '20px 4px 8px' }}>COMMUNICATION</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <ToggleRow on={true} title="Streak reminders" sub="A gentle ping if you're about to lose a streak." icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"><path d="M6 8 a6 6 0 0 1 12 0 c0 5 2 7 2 7 H4 s2 -2 2 -7 z M10 19 a2 2 0 0 0 4 0"/></svg>}/>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }}/>
          <ToggleRow on={false} title="Marketing emails" sub="Tips, culture stories, occasional offers." icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 8 L12 14 L21 8"/></svg>}/>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: 1, padding: '20px 4px 8px' }}>YOUR DATA</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 V15 M7 11 L12 16 L17 11 M5 21 H19"/></svg>
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>Download my data</div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 L15 12 L9 18"/></svg>
          </div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', marginLeft: 66 }}/>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--red-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6 H21 M8 6 V4 a2 2 0 0 1 2 -2 h4 a2 2 0 0 1 2 2 v2 M5 6 V20 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2 -2 V6"/></svg>
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--red)' }}>Delete my account</div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 L15 12 L9 18"/></svg>
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, padding: '0 4px' }}>
          We follow GDPR. Read our full <span style={{ color: 'var(--red)', fontWeight: 600 }}>Privacy Policy</span>.
        </div>
      </div>
    </Screen2>
  );
};

// ═════════════════════════════════════════════════════════════
// SIGN OUT CONFIRMATION
// ═════════════════════════════════════════════════════════════
const SignOutScreen = () => (
  <Screen2 bg="rgba(42,31,26,0.55)">
    {/* dim background showing profile underneath */}
    <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)', opacity: 0.4, zIndex: 0 }}/>
    <StatusBar2 dark/>

    {/* sheet */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'var(--cream)', borderTopLeftRadius: 28, borderTopRightRadius: 28,
      padding: '12px 24px 36px', boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
    }}>
      {/* drag handle */}
      <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.15)', margin: '0 auto 18px' }}/>

      {/* icon */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--red-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 H9 M16 17 L21 12 L16 7 M21 12 H9"/></svg>
        </div>
      </div>

      <h1 style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 24, fontWeight: 600, margin: '20px 0 8px', textAlign: 'center', letterSpacing: -0.4 }}>Sign out of Tgħallem?</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0, textAlign: 'center', lineHeight: 1.5, padding: '0 12px' }}>
        Your progress is saved to <strong style={{ color: 'var(--ink)' }}>sarah.borg@gmail.com</strong>. You can sign back in anytime.
      </p>

      {/* progress reassurance */}
      <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sage-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--ink)' }}>7-day streak</strong> and <strong style={{ color: 'var(--ink)' }}>142 words</strong> safe in the cloud.
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ height: 54, borderRadius: 27, border: 'none', background: 'var(--red)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit' }}>Sign out</button>
        <button style={{ height: 54, borderRadius: 27, border: 'none', background: 'transparent', color: 'var(--ink)', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Cancel</button>
      </div>
    </div>
  </Screen2>
);

// ═════════════════════════════════════════════════════════════
// FLOW DIAGRAM — visual map of onboarding
// ═════════════════════════════════════════════════════════════
const FlowDiagram = () => {
  // 1180×680 board; each node is a thumbnail with label
  const node = (x, y, label, n, color = 'var(--red)') => ({ x, y, label, n, color });
  const nodes = [
    node(40, 60, 'App launch', '○', 'var(--ink-2)'),
    node(220, 60, 'Welcome', '01'),
    node(400, 60, 'Carousel', '02'),
    node(580, 60, 'Auth gate', '03'),
    node(760, 60, 'Sign up', '04a'),
    node(760, 260, 'Sign in', '04b', 'var(--ochre)'),
    node(940, 60, 'Level select', '05'),
    node(940, 260, 'Home (returning)', '✓', 'var(--sage-deep)'),
    node(940, 460, 'Forgot password', '!', 'var(--ink-2)'),
    node(760, 460, 'Reset email sent', '✉', 'var(--ink-2)'),
    node(220, 260, 'Daily goal', '06'),
    node(220, 460, 'Permissions', '07', 'var(--ochre)'),
    node(40, 460, 'Home (new)', '✓', 'var(--sage-deep)'),
  ];

  // edges: array of [fromIdx, toIdx, optional label]
  const edges = [
    [0, 1], [1, 2], [2, 3],
    [3, 4, 'New'], [3, 5, 'Returning'],
    [4, 6], [5, 7],
    [5, 8, 'forgot?'], [8, 9], [9, 5],
    [6, 10], [10, 11], [11, 12],
  ];

  return (
    <div style={{
      width: 1180, height: 680, background: 'var(--cream)',
      position: 'relative', borderRadius: 18, overflow: 'hidden',
      fontFamily: '"Inter", system-ui, sans-serif',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    }}>
      {/* title */}
      <div style={{ position: 'absolute', top: 20, left: 24 }}>
        <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Onboarding flow</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>From first launch to first lesson · sign-up &amp; sign-in branches</div>
      </div>

      {/* legend */}
      <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--red)' }}/>New user</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--ochre)' }}/>Returning</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--sage-deep)' }}/>Done</div>
      </div>

      {/* edges */}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1180" height="680">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-2)"/>
          </marker>
        </defs>
        {edges.map(([a, b, lbl], i) => {
          const A = nodes[a], B = nodes[b];
          const ax = A.x + 70, ay = A.y + 90; // bottom of card
          const bx = B.x + 70, by = B.y; // top of card

          // route: if same row, side-to-side; else use elbow
          const sameRow = A.y === B.y;
          let path;
          if (sameRow) {
            const x1 = A.x + 140, y1 = A.y + 60;
            const x2 = B.x, y2 = B.y + 60;
            path = `M ${x1} ${y1} L ${x2} ${y2}`;
          } else {
            // bend
            path = `M ${ax} ${ay} C ${ax} ${ay + 50}, ${bx} ${by - 50}, ${bx} ${by}`;
          }
          // label midpoint
          const mx = (sameRow ? (A.x + 140 + B.x) / 2 : (ax + bx) / 2);
          const my = (sameRow ? A.y + 60 : (ay + by) / 2);
          return (
            <g key={i}>
              <path d={path} stroke="rgba(0,0,0,0.25)" strokeWidth="1.6" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow)"/>
              {lbl && (
                <g>
                  <rect x={mx - 26} y={my - 9} width="52" height="18" rx="9" fill="#fff" stroke="rgba(0,0,0,0.1)"/>
                  <text x={mx} y={my + 4} fontSize="10" fontWeight="600" textAnchor="middle" fill="var(--ink-2)">{lbl}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n, i) => (
        <div key={i} style={{
          position: 'absolute', left: n.x, top: n.y,
          width: 140, height: 90, borderRadius: 14, background: '#fff',
          border: '1.5px solid rgba(0,0,0,0.08)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          padding: 12, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: n.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Bricolage Grotesque", serif', fontWeight: 700, fontSize: 11,
            }}>{n.n}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{n.label}</div>
          </div>
          {/* pseudo-screen preview */}
          <div style={{ marginTop: 8, flex: 1, borderRadius: 6, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--ink-3)' }}>
            screen preview
          </div>
        </div>
      ))}
    </div>
  );
};

Object.assign(window, {
  OnboardingSlide2, AuthGateScreen, SignUpScreen, LevelScreen, GoalScreen,
  SignInScreen, PrivacyScreen, SignOutScreen, FlowDiagram,
});
