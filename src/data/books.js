// Genre-tagged reading lists. Keys match the `slug` of an entry in posts.js.
//
// NOTE: the full lists (with favorites) are still hand-written in
// public/books-<year>.html. When you add a book there, add it here too so the
// genre chart on the landing page stays in sync.

// Order here is the slice order in the pie chart and the legend. Colors are the
// dark-mode categorical slots from the dataviz palette, validated against the
// site's #1A1B26 background.
export const genres = [
  { id: 'fiction', label: 'Fiction', color: '#3987e5' },
  { id: 'philosophy', label: 'Philosophy', color: '#d95926' },
  { id: 'psychology', label: 'Psychology', color: '#199e70' },
  { id: 'social-science', label: 'Social Science', color: '#c98500' },
  { id: 'science', label: 'Science', color: '#d55181' },
  { id: 'history', label: 'History', color: '#9085e9' },
];

export const books = {
  'books-2026': [
    { title: 'Violence and the Sacred', author: 'Rene Girard', genre: 'social-science' },
    { title: 'Generative Energy', author: 'Ray Peat', genre: 'science' },
    { title: 'Science and the Modern World', author: 'Alfred North Whitehead', genre: 'philosophy' },
    { title: 'Modes of Thought', author: 'Alfred North Whitehead', genre: 'philosophy' },
    { title: 'The Count of Monte Cristo', author: 'Alexander Dumas', genre: 'fiction' },
    { title: 'Amusing Ourselves to Death', author: 'Neil Postman', genre: 'social-science' },
    { title: 'Civilization and Its Discontents', author: 'Sigmund Freud', genre: 'psychology' },
    { title: 'Memories, Dreams, Reflections', author: 'Carl Jung', genre: 'psychology' },
    { title: 'The Culture of Cities', author: 'Lewis Mumford', genre: 'social-science' },
    { title: 'The Concept of Anxiety', author: 'Soren Kierkegaard', genre: 'philosophy' },
    { title: 'The Fall', author: 'Albert Camus', genre: 'fiction' },
    { title: 'Things Hidden Since the Foundation of the World', author: 'Rene Girard', genre: 'social-science' },
    { title: 'The Plague', author: 'Albert Camus', genre: 'fiction' },
    { title: 'Man and his Symbols', author: 'Carl Jung', genre: 'psychology' },
    { title: 'The Righteous Mind', author: 'Jonathan Haidt', genre: 'psychology' },
    { title: 'Bronze Age Mindset', author: 'Bronze Age Pervert', genre: 'philosophy' },
    { title: 'The Lonely Crowd', author: 'David Riesman', genre: 'social-science' },
    { title: 'Twilight of the Idols: or How to Philosophize with a Hammer', author: 'Friedrich Nietzsche', genre: 'philosophy' },
    { title: 'The Anti-Christ', author: 'Friedrich Nietzsche', genre: 'philosophy' },
    { title: 'The First Man', author: 'Albert Camus', genre: 'fiction' },
    { title: 'Natural Rights and History', author: 'Leo Strauss', genre: 'philosophy' },
    { title: 'The Vegetarian', author: 'Han Kang', genre: 'fiction' },
    { title: 'The Edge of Objectivity', author: 'Charles Coulston Gillispie', genre: 'science' },
    { title: 'A Culture of Growth', author: 'Joel Mokyr', genre: 'history' },
    { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', genre: 'philosophy' },
    { title: 'The Free World: Art and Thought in the Cold War', author: 'Louis Menand', genre: 'history' },
  ],
  'books-2025': [
    { title: 'The Lessons of History', author: 'Will and Ariel Durant', genre: 'history' },
    { title: 'The Three-Body Problem', author: 'Liu Cixin', genre: 'fiction' },
    { title: 'The Dark Forest', author: 'Liu Cixin', genre: 'fiction' },
    { title: "Death's End", author: 'Liu Cixin', genre: 'fiction' },
    { title: 'The True Believer', author: 'Eric Hoffer', genre: 'social-science' },
    { title: 'Atlas Shrugged', author: 'Ayn Rand', genre: 'fiction' },
    { title: 'Anthem', author: 'Ayn Rand', genre: 'fiction' },
    { title: 'We the Living', author: 'Ayn Rand', genre: 'fiction' },
    { title: 'The Fountainhead', author: 'Ayn Rand', genre: 'fiction' },
    { title: 'The Protestant Ethic and the Spirit of Capitalism', author: 'Max Weber', genre: 'social-science' },
    { title: 'From Max Weber: Essays in Sociology', author: 'Max Weber', genre: 'social-science' },
    { title: 'On the Origin of Species', author: 'Charles Darwin', genre: 'science' },
    { title: 'The Diversity of Life', author: 'Edward O. Wilson', genre: 'science' },
    { title: 'Consilience', author: 'Edward O. Wilson', genre: 'science' },
    { title: 'The Social Function of Science', author: 'J. D. Bernal', genre: 'science' },
    { title: 'Structures of Everyday Life', author: 'Fernand Braudel', genre: 'history' },
    { title: 'The Wheels of Commerce', author: 'Fernand Braudel', genre: 'history' },
    { title: 'Rebels Against the Future', author: 'Kirkpatrick Sale', genre: 'history' },
    { title: 'I Who Have Never Known Men', author: 'Jacqueline Harpman', genre: 'fiction' },
    { title: 'Skin in the Game', author: 'Nassim Nicholas Taleb', genre: 'social-science' },
    { title: 'Science: The Glorious Entertainment', author: 'Jacques Barzun', genre: 'science' },
    { title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', genre: 'science' },
    { title: 'The Survival of Western Culture', author: 'Ralph Tyler Flewelling', genre: 'philosophy' },
    { title: 'Burmese Days', author: 'George Orwell', genre: 'fiction' },
    { title: 'I, Robot', author: 'Isaac Asimov', genre: 'fiction' },
  ],
};
