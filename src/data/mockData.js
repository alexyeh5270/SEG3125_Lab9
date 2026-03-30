import arcRaidersPoster from '../assets/ARC Raiders.jpg';
import balatroPoster from '../assets/Balatro.jpg';
import eldenRingPoster from '../assets/Elden Ring.jpg';
import hadesIIPoster from '../assets/Hades II.webp';
import hollowKnightPoster from '../assets/Hollow Knight.webp';
import stardewValleyPoster from '../assets/Stardew Valley.png';
import residentEvilRequiemPoster from '../assets/Resident Evil Requiem.avif';

// MODIFIED: added current profile mock so the new Profile page has real content.
export const mockCurrentProfile = {
  userId: 1,
  username: 'PlayerOne',
  displayName: 'Player One',
  email: 'playerone@gameshelf.local',
  bio: 'I mostly play action games, roguelikes, and simulation titles. I use GameShelf to keep track of what I am playing and what I want to try next.',
  avatarUrl: '',
  followersCount: 26,
  followingCount: 14,
  joinedOn: 'January 12, 2026',
};

const descriptions = {
  1: 'ARC Raiders is a cooperative extraction shooter set in a hostile future where scavengers descend from underground shelters to search for supplies and survive encounters with mechanical enemies.',
  2: 'Hades II is a fast-paced action roguelike that follows Melinoë through mythic battles, magical upgrades, and repeated escape attempts shaped by player choice.',
  3: 'Balatro blends poker-inspired deckbuilding with score-chasing strategy, rewarding experimentation with synergies, multipliers, and unusual card combinations.',
  4: 'Stardew Valley is a farming and life simulation game in which players restore a run-down farm, build relationships, and gradually shape the rhythm of daily life.',
  5: 'Elden Ring is a large-scale action role-playing game focused on exploration, build customization, and difficult encounters across an open fantasy world.',
  6: 'Hollow Knight is a hand-drawn action adventure game featuring atmospheric exploration, precision combat, and interconnected world design.',
  7: 'Resident Evil Requiem is a survival horror experience built around tension, resource management, and a cinematic atmosphere of dread.',
};

export const mockGames = [
  {
    id: 1,
    title: 'ARC Raiders',
    releaseYear: 2025,
    developer: 'Embark Studios',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
    description: descriptions[1],
    posterUrl: arcRaidersPoster,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Hades II',
    releaseYear: 2024,
    developer: 'Supergiant Games',
    platforms: ['PC'],
    description: descriptions[2],
    posterUrl: hadesIIPoster,
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Balatro',
    releaseYear: 2024,
    developer: 'LocalThunk',
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X|S'],
    description: descriptions[3],
    posterUrl: balatroPoster,
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Stardew Valley',
    releaseYear: 2016,
    developer: 'ConcernedApe',
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One', 'Mobile'],
    description: descriptions[4],
    posterUrl: stardewValleyPoster,
    isFeatured: true,
  },
  {
    id: 5,
    title: 'Elden Ring',
    releaseYear: 2022,
    developer: 'FromSoftware',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
    description: descriptions[5],
    posterUrl: eldenRingPoster,
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Hollow Knight',
    releaseYear: 2017,
    developer: 'Team Cherry',
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One'],
    description: descriptions[6],
    posterUrl: hollowKnightPoster,
    isFeatured: false,
  },
  {
    id: 7,
    title: 'Resident Evil Requiem',
    releaseYear: 2026,
    developer: 'Capcom',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
    description: descriptions[7],
    posterUrl: residentEvilRequiemPoster,
    isFeatured: false,
  },
];

const gameById = Object.fromEntries(mockGames.map((game) => [game.id, game]));

function buildReview({
  id,
  gameId,
  username,
  date,
  rating,
  reviewTextEn,
  reviewTextFr,
  isFeatured = false,
}) {
  return {
    id,
    gameId,
    title: gameById[gameId].title,
    reviewText: reviewTextEn,
    reviewTextEn,
    reviewTextFr,
    username,
    date,
    rating,
    posterUrl: gameById[gameId].posterUrl,
    isFeatured,
  };
}

const baseReviews = [
  buildReview({
    id: 1,
    gameId: 1,
    username: 'Mina',
    date: 'March 20, 2026',
    rating: 4,
    reviewTextEn:
      'The world already has a strong mood, and the cooperative tension makes every run feel meaningful.',
    reviewTextFr:
      'Le monde possède déjà une forte atmosphère, et la tension coopérative donne du sens à chaque expédition.',
    isFeatured: true,
  }),
  buildReview({
    id: 2,
    gameId: 3,
    username: 'Rafael',
    date: 'March 18, 2026',
    rating: 5,
    reviewTextEn:
      'A brilliantly simple idea that keeps opening into deeper strategy the longer you play.',
    reviewTextFr:
      'Une idée brillamment simple qui révèle une stratégie de plus en plus riche à mesure que l’on joue.',
    isFeatured: true,
  }),
  buildReview({
    id: 3,
    gameId: 4,
    username: 'Aisha',
    date: 'March 16, 2026',
    rating: 5,
    reviewTextEn:
      'Still one of the easiest games to recommend when someone wants a calm but rewarding routine.',
    reviewTextFr:
      'C’est encore l’un des jeux les plus faciles à recommander à quelqu’un qui cherche une routine calme mais gratifiante.',
    isFeatured: true,
  }),
  buildReview({
    id: 4,
    gameId: 1,
    username: 'Theo',
    date: 'March 14, 2026',
    rating: 3,
    reviewTextEn:
      'I like the premise, but I want a little more feedback during early missions.',
    reviewTextFr:
      'J’aime bien le concept, mais je voudrais un peu plus de retours pendant les premières missions.',
  }),
  buildReview({
    id: 5,
    gameId: 2,
    username: 'Jun',
    date: 'March 13, 2026',
    rating: 5,
    reviewTextEn:
      'The combat feels sharp and the visual style is immediately recognizable.',
    reviewTextFr:
      'Les combats sont précis et le style visuel est immédiatement reconnaissable.',
  }),
  buildReview({
    id: 6,
    gameId: 5,
    username: 'Luca',
    date: 'March 11, 2026',
    rating: 5,
    reviewTextEn:
      'Massive world, memorable bosses, and an enormous amount of freedom in how you build your character.',
    reviewTextFr:
      'Un monde immense, des boss mémorables, et une liberté énorme dans la façon de construire son personnage.',
  }),
  buildReview({
    id: 7,
    gameId: 7,
    username: 'Noah',
    date: 'March 10, 2026',
    rating: 4,
    reviewTextEn:
      'The atmosphere is excellent, and the presentation makes even slower moments feel tense.',
    reviewTextFr:
      'L’atmosphère est excellente, et la mise en scène rend même les moments plus calmes très tendus.',
  }),
];

// MODIFIED: added 35 more reviews with paired English/French comments.
const extraReviewSeeds = [
  { gameId: 1, username: 'PlayerOne', date: 'March 9, 2026', rating: 4, reviewTextEn: 'The map design encourages teamwork without making solo moments feel useless.', reviewTextFr: 'La conception des cartes encourage le travail en équipe sans rendre les moments en solo inutiles.' },
  { gameId: 1, username: 'Selene', date: 'March 8, 2026', rating: 5, reviewTextEn: 'Every extraction feels tense in the best possible way.', reviewTextFr: 'Chaque extraction est tendue, dans le meilleur sens du terme.' },
  { gameId: 1, username: 'Marcus', date: 'March 7, 2026', rating: 4, reviewTextEn: 'I like the visual clarity of enemy silhouettes during chaotic fights.', reviewTextFr: 'J’aime la clarté visuelle des silhouettes ennemies pendant les combats chaotiques.' },
  { gameId: 1, username: 'Iris', date: 'March 6, 2026', rating: 3, reviewTextEn: 'Good atmosphere, but I still want more onboarding for first-time players.', reviewTextFr: 'Bonne atmosphère, mais je voudrais encore plus d’accompagnement pour les nouveaux joueurs.' },
  { gameId: 1, username: 'Damien', date: 'March 5, 2026', rating: 4, reviewTextEn: 'The sound design does a lot of work when the screen gets busy.', reviewTextFr: 'Le design sonore fait énormément de travail lorsque l’écran devient chargé.' },

  { gameId: 2, username: 'PlayerOne', date: 'March 4, 2026', rating: 5, reviewTextEn: 'Melinoë’s moveset is flexible enough to support very different play styles.', reviewTextFr: 'L’ensemble de mouvements de Melinoë est assez flexible pour soutenir des styles de jeu très différents.' },
  { gameId: 2, username: 'Camille', date: 'March 3, 2026', rating: 5, reviewTextEn: 'The art direction feels elegant even when the screen is crowded with effects.', reviewTextFr: 'La direction artistique reste élégante même lorsque l’écran est rempli d’effets.' },
  { gameId: 2, username: 'Evan', date: 'March 2, 2026', rating: 4, reviewTextEn: 'Runs stay readable because upgrades are presented clearly.', reviewTextFr: 'Les parties restent lisibles parce que les améliorations sont présentées clairement.' },
  { gameId: 2, username: 'Lina', date: 'March 1, 2026', rating: 5, reviewTextEn: 'Fast, stylish, and consistently satisfying to replay.', reviewTextFr: 'Rapide, stylé et constamment satisfaisant à rejouer.' },
  { gameId: 2, username: 'Quentin', date: 'February 28, 2026', rating: 4, reviewTextEn: 'I appreciate how quickly the game communicates what each boon changes.', reviewTextFr: 'J’apprécie la rapidité avec laquelle le jeu explique ce que chaque don modifie.' },

  { gameId: 3, username: 'PlayerOne', date: 'February 27, 2026', rating: 5, reviewTextEn: 'It is rare for a game this simple to generate so many strategic decisions.', reviewTextFr: 'Il est rare qu’un jeu aussi simple génère autant de décisions stratégiques.' },
  { gameId: 3, username: 'Nadia', date: 'February 26, 2026', rating: 5, reviewTextEn: 'The score multipliers make every round feel like a puzzle.', reviewTextFr: 'Les multiplicateurs de score font de chaque manche une sorte d’énigme.' },
  { gameId: 3, username: 'Victor', date: 'February 25, 2026', rating: 4, reviewTextEn: 'The rules are easy to learn, but the synergies are much deeper than expected.', reviewTextFr: 'Les règles sont faciles à apprendre, mais les synergies sont bien plus profondes qu’on ne l’attend.' },
  { gameId: 3, username: 'Aya', date: 'February 24, 2026', rating: 5, reviewTextEn: 'I keep saying one more run and then losing an hour.', reviewTextFr: 'Je me dis toujours “encore une partie”, puis je perds une heure.' },
  { gameId: 3, username: 'Jonas', date: 'February 23, 2026', rating: 4, reviewTextEn: 'The interface explains card effects surprisingly well for such a dense system.', reviewTextFr: 'L’interface explique étonnamment bien les effets des cartes pour un système aussi dense.' },

  { gameId: 4, username: 'PlayerOne', date: 'February 22, 2026', rating: 5, reviewTextEn: 'The daily rhythm is relaxing without feeling empty.', reviewTextFr: 'Le rythme quotidien est relaxant sans paraître vide.' },
  { gameId: 4, username: 'Helena', date: 'February 21, 2026', rating: 5, reviewTextEn: 'This is still one of the best comfort games on the market.', reviewTextFr: 'C’est toujours l’un des meilleurs jeux réconfortants du marché.' },
  { gameId: 4, username: 'Tariq', date: 'February 20, 2026', rating: 4, reviewTextEn: 'There is always something productive to do without too much pressure.', reviewTextFr: 'Il y a toujours quelque chose d’utile à faire sans trop de pression.' },
  { gameId: 4, username: 'Mei', date: 'February 19, 2026', rating: 5, reviewTextEn: 'The sense of progress is small but constant, which works beautifully.', reviewTextFr: 'Le sentiment de progression est modeste mais constant, et cela fonctionne à merveille.' },
  { gameId: 4, username: 'Oscar', date: 'February 18, 2026', rating: 4, reviewTextEn: 'Excellent when I want a slower pace after more intense games.', reviewTextFr: 'Excellent lorsque je veux un rythme plus lent après des jeux plus intenses.' },

  { gameId: 5, username: 'PlayerOne', date: 'February 17, 2026', rating: 5, reviewTextEn: 'Exploration stays rewarding because the world keeps hinting at hidden paths.', reviewTextFr: 'L’exploration reste gratifiante parce que le monde suggère sans cesse des chemins cachés.' },
  { gameId: 5, username: 'Rina', date: 'February 16, 2026', rating: 5, reviewTextEn: 'Some of the best environmental storytelling I have seen in a large RPG.', reviewTextFr: 'L’une des meilleures narrations environnementales que j’ai vues dans un grand jeu de rôle.' },
  { gameId: 5, username: 'Mateo', date: 'February 15, 2026', rating: 4, reviewTextEn: 'The freedom to approach fights differently makes builds feel personal.', reviewTextFr: 'La liberté d’aborder les combats de différentes manières rend les builds très personnels.' },
  { gameId: 5, username: 'Sofia', date: 'February 14, 2026', rating: 5, reviewTextEn: 'Huge scale, memorable encounters, and very strong art direction.', reviewTextFr: 'Une échelle immense, des rencontres mémorables et une direction artistique très forte.' },
  { gameId: 5, username: 'Leo', date: 'February 13, 2026', rating: 4, reviewTextEn: 'The game asks a lot, but it rewards patience and curiosity.', reviewTextFr: 'Le jeu demande beaucoup, mais il récompense la patience et la curiosité.' },

  { gameId: 6, username: 'PlayerOne', date: 'February 12, 2026', rating: 5, reviewTextEn: 'Movement and combat feel precise enough that failure almost always teaches something.', reviewTextFr: 'Les déplacements et les combats sont assez précis pour que l’échec apprenne presque toujours quelque chose.' },
  { gameId: 6, username: 'Elise', date: 'February 11, 2026', rating: 5, reviewTextEn: 'The world feels mysterious without becoming unreadable.', reviewTextFr: 'Le monde paraît mystérieux sans devenir illisible.' },
  { gameId: 6, username: 'Bruno', date: 'February 10, 2026', rating: 4, reviewTextEn: 'I admire how much atmosphere the game builds with so little dialogue.', reviewTextFr: 'J’admire la quantité d’atmosphère que le jeu crée avec si peu de dialogues.' },
  { gameId: 6, username: 'Nina', date: 'February 9, 2026', rating: 5, reviewTextEn: 'The map opens up gradually in a way that makes every discovery memorable.', reviewTextFr: 'La carte s’ouvre progressivement d’une manière qui rend chaque découverte mémorable.' },
  { gameId: 6, username: 'Samir', date: 'February 8, 2026', rating: 4, reviewTextEn: 'A great example of how visual style and mechanics can support each other.', reviewTextFr: 'Un excellent exemple de la manière dont le style visuel et les mécaniques peuvent se soutenir mutuellement.' },

  { gameId: 7, username: 'PlayerOne', date: 'February 7, 2026', rating: 4, reviewTextEn: 'The pacing is slower than some horror games, but that gives the dread more room to build.', reviewTextFr: 'Le rythme est plus lent que dans certains jeux d’horreur, mais cela laisse davantage de place à l’angoisse.' },
  { gameId: 7, username: 'Clara', date: 'February 6, 2026', rating: 4, reviewTextEn: 'Strong atmosphere and careful use of silence.', reviewTextFr: 'Une atmosphère forte et un usage soigneux du silence.' },
  { gameId: 7, username: 'Yann', date: 'February 5, 2026', rating: 5, reviewTextEn: 'The presentation keeps tension high even in quiet corridors.', reviewTextFr: 'La mise en scène maintient une forte tension même dans les couloirs silencieux.' },
  { gameId: 7, username: 'Mara', date: 'February 4, 2026', rating: 4, reviewTextEn: 'I like how the lighting directs attention without feeling too artificial.', reviewTextFr: 'J’aime la façon dont l’éclairage dirige l’attention sans paraître trop artificiel.' },
  { gameId: 7, username: 'Diego', date: 'February 3, 2026', rating: 4, reviewTextEn: 'Resource pressure and atmosphere work well together here.', reviewTextFr: 'La pression sur les ressources et l’atmosphère fonctionnent bien ensemble ici.' },
];

const extraReviews = extraReviewSeeds.map((seed, index) =>
  buildReview({
    id: baseReviews.length + index + 1,
    ...seed,
  }),
);

export const mockReviews = [...baseReviews, ...extraReviews];

export const mockFeaturedGames = mockGames.filter((game) => game.isFeatured);
export const mockFeaturedReviews = mockReviews.filter((review) => review.isFeatured);

export function getGameById(gameId) {
  return gameById[gameId] || null;
}

export function getReviewsByGameId(gameId) {
  return mockReviews.filter((review) => review.gameId === gameId);
}