// Seed lesson content — replace with API / CMS data in production

export interface Flashcard {
  id: string;
  maltese: string;
  english: string;
  pronunciation: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  state: 'done' | 'active' | 'locked';
  xpReward: number;
  cards: Flashcard[];
  questions: QuizQuestion[];
}

export const FOUNDATION_LESSONS: Lesson[] = [
  {
    id: 'alphabet',
    title: 'The Alphabet',
    subtitle: '30 letters, sounds & tricks',
    state: 'done',
    xpReward: 20,
    cards: [
      { id: 'a1', maltese: 'Ċ ċ', english: 'like "ch" in church', pronunciation: 'ch' },
      { id: 'a2', maltese: 'Ġ ġ', english: 'like "dj" in jeans', pronunciation: 'dj' },
      { id: 'a3', maltese: 'Ħ ħ', english: 'a breathy "h" (pharyngeal)', pronunciation: 'ħ' },
      { id: 'a4', maltese: 'Ż ż', english: 'like "z" in zebra', pronunciation: 'z' },
      { id: 'a5', maltese: 'Għ għ', english: 'silent vowel-lengthener or glottal stop', pronunciation: 'ʕ' },
    ],
    questions: [
      { id: 'aq1', prompt: 'Which letter sounds like "ch" in church?', options: ['Ħ', 'Ċ', 'Ġ', 'Ż'], correctIndex: 1 },
      { id: 'aq2', prompt: 'Ġ sounds like which English sound?', options: ['"sh"', '"th"', '"dj"', '"ng"'], correctIndex: 2 },
      { id: 'aq3', prompt: 'Ż sounds like?', options: ['"s"', '"ts"', '"z"', '"zh"'], correctIndex: 2 },
    ],
  },
  {
    id: 'greetings',
    title: 'Greetings',
    subtitle: 'Hello, goodbye, please, thanks',
    state: 'done',
    xpReward: 20,
    cards: [
      { id: 'g1', maltese: 'Bonġu', english: 'Good morning / Hello', pronunciation: 'bon-JU' },
      { id: 'g2', maltese: 'Bonswa', english: 'Good evening', pronunciation: 'bon-SWA' },
      { id: 'g3', maltese: 'Saħħa', english: 'Goodbye / Cheers', pronunciation: 'SAH-ha' },
      { id: 'g4', maltese: 'Jekk jogħġbok', english: 'Please', pronunciation: 'yek yo-JPOK' },
      { id: 'g5', maltese: 'Grazzi', english: 'Thank you', pronunciation: 'GRATS-ee' },
      { id: 'g6', maltese: 'Merħba', english: 'Welcome', pronunciation: 'MER-hba' },
    ],
    questions: [
      { id: 'gq1', prompt: 'How do you say "Thank you" in Maltese?', options: ['Bonġu', 'Merħba', 'Grazzi', 'Saħħa'], correctIndex: 2 },
      { id: 'gq2', prompt: '"Saħħa" means?', options: ['Please', 'Goodbye', 'Hello', 'Welcome'], correctIndex: 1 },
      { id: 'gq3', prompt: 'What does "Merħba" mean?', options: ['Good evening', 'Thank you', 'Welcome', 'Please'], correctIndex: 2 },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers 1–10',
    subtitle: 'Counting basics',
    state: 'active',
    xpReward: 20,
    cards: [
      { id: 'n1', maltese: 'Wieħed', english: 'One', pronunciation: 'WEE-hed' },
      { id: 'n2', maltese: 'Tnejn', english: 'Two', pronunciation: 'TNAYN' },
      { id: 'n3', maltese: 'Tlieta', english: 'Three', pronunciation: 'tlee-ETA' },
      { id: 'n4', maltese: 'Erbgħa', english: 'Four', pronunciation: 'er-BA' },
      { id: 'n5', maltese: 'Ħamsa', english: 'Five', pronunciation: 'HAM-sa' },
      { id: 'n6', maltese: 'Sitta', english: 'Six', pronunciation: 'SIT-ta' },
      { id: 'n7', maltese: 'Sebgħa', english: 'Seven', pronunciation: 'se-BA' },
      { id: 'n8', maltese: 'Tmienja', english: 'Eight', pronunciation: 'tmee-EN-ya' },
      { id: 'n9', maltese: 'Disgħa', english: 'Nine', pronunciation: 'dis-A' },
      { id: 'n10', maltese: 'Għaxra', english: 'Ten', pronunciation: 'ASH-ra' },
    ],
    questions: [
      { id: 'nq1', prompt: 'How do you say "Five" in Maltese?', options: ['Erbgħa', 'Ħamsa', 'Sitta', 'Tlieta'], correctIndex: 1 },
      { id: 'nq2', prompt: '"Tnejn" means?', options: ['One', 'Three', 'Two', 'Four'], correctIndex: 2 },
      { id: 'nq3', prompt: 'What is "Għaxra"?', options: ['Eight', 'Nine', 'Seven', 'Ten'], correctIndex: 3 },
      { id: 'nq4', prompt: '"Sebgħa" means?', options: ['Six', 'Seven', 'Eight', 'Nine'], correctIndex: 1 },
    ],
  },
  {
    id: 'numbers-20',
    title: 'Numbers 11–100',
    subtitle: 'Tens and combinations',
    state: 'locked',
    xpReward: 25,
    cards: [],
    questions: [],
  },
  {
    id: 'days-months',
    title: 'Days & Months',
    subtitle: 'Calendar vocab',
    state: 'locked',
    xpReward: 25,
    cards: [],
    questions: [],
  },
  {
    id: 'common-verbs',
    title: 'Common Verbs',
    subtitle: 'Be, have, go, do',
    state: 'locked',
    xpReward: 30,
    cards: [],
    questions: [],
  },
];
