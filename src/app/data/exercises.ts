// src/app/data/exercises.ts

export const exercisesData = [
  {
    id: '1',
    title: 'Huruf Hijaiyah Terputus',
    progress: 2,
    totalParts: 3,
    status: 'in-progress',
    description: 'Ulangi huruf yang sesuai dengan suara yang Anda dengar.',
    letters: [
      { letter: 'ف', audioUrl: '/audio/fa.mp3' },
      { letter: 'م', audioUrl: '/audio/mim.mp3' },
      { letter: 'ب', audioUrl: '/audio/ba.mp3' },
      { letter: 'م', audioUrl: '/audio/mim.mp3' },
    ],
  },
  {
    id: '2',
    title: 'Huruf Hijaiyah Bersambung',
    progress: 5,
    totalParts: 5,
    status: 'not-started',
    description: 'Latihan menyambung huruf hijaiyah dalam kata.',
    letters: [
      { letter: 'كتاب', audioUrl: '/audio/kitab.mp3' },
      { letter: 'رسول', audioUrl: '/audio/rasul.mp3' },
      { letter: 'رحمن', audioUrl: '/audio/rahman.mp3' },
    ],
  },
  {
    id: '3',
    title: 'Tajwid Dasar',
    progress: 0,
    totalParts: 4,
    status: 'not-started',
    description: 'Latihan dasar untuk memahami hukum nun mati dan tanwin.',
    letters: [
      { letter: 'إظهار', audioUrl: '/audio/idzhar.mp3' },
      { letter: 'إدغام', audioUrl: '/audio/idgham.mp3' },
      { letter: 'إقلاب', audioUrl: '/audio/iqlab.mp3' },
    ],
  },
  {
    id: '4',
    title: 'Tajwid Menengah',
    progress: 0,
    totalParts: 4,
    status: 'not-started',
    description: 'Latihan untuk memahami hukum mad dan waqaf.',
    letters: [
      { letter: 'مد', audioUrl: '/audio/mad.mp3' },
      { letter: 'وقف', audioUrl: '/audio/waqaf.mp3' },
    ],
  },
    {
    id: '5',
    title: 'Tajwid ahli',
    progress: 0,
    totalParts: 4,
    status: 'not-started',
    description: 'Latihan untuk memahami hukum mad dan waqaf.',
    letters: [
      { letter: 'مد', audioUrl: '/audio/mad.mp3' },
      { letter: 'وقف', audioUrl: '/audio/waqaf.mp3' },
      { letter: 'إظهار', audioUrl: '/audio/idzhar.mp3' },
      { letter: 'إدغام', audioUrl: '/audio/idgham.mp3' },
      { letter: 'إقلاب', audioUrl: '/audio/iqlab.mp3' },
    ],
  },
];