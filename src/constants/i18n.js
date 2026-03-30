// MODIFIED: new bilingual dictionary for English and French UI text.

export const SUPPORTED_LANGUAGES = [
  { key: 'en', label: 'EN' },
  { key: 'fr', label: 'FR' },
];

const STRINGS = {
  en: {
    'nav.home': 'Home',
    'nav.discover': 'Discover',
    'nav.library': 'My Game Library',
    'nav.profile': 'Profile',

    'hero.title': 'Your home for video game discovery',
    'hero.subtitle': "Track what you play. Share what you think. Discover what's next.",
    'hero.discover': 'Discover',
    'hero.library': 'My Game Library',

    'sections.featuredGames': 'Featured Games',
    'sections.featuredReviews': 'Featured Reviews',
    'sections.featuredSubtitle': 'Top picks from the community this week.',

    'discover.title': 'Discover',
    'discover.subtitle': 'Search by title, developer, or platform.',
    'discover.searchPlaceholder': 'Quick search for a game',
    'discover.platformFilter': 'Platform',
    'discover.allPlatforms': 'All platforms',
    'discover.sortBy': 'Sort by',
    'discover.sort.popular': 'Popular',
    'discover.sort.newest': 'Newest',
    'discover.sort.rating': 'Highest rated',
    'discover.empty': 'No games match your search.',

    'profile.notFound': 'Game not found',
    'profile.back': 'Back',
    'profile.developer': 'Developer',
    'profile.averageRating': 'Average rating',
    'profile.reviewCount': '{count} reviews',
    'profile.leaveReview': 'Leave a Review',
    'profile.addToLibrary': 'Add to My Game Library',
    'profile.libraryStatus': 'Library status',
    'profile.reviews': 'Reviews',
    'profile.readReviewsHelp':
      "Read other players' opinions and compare impressions before adding your own.",
    'profile.noReviews': 'No reviews yet. Be the first to write one.',

    'library.title': 'My Game Library',
    'library.subtitle':
      'Track the games you want to try, are currently playing, or have completed.',
    'library.empty': 'Your library is empty. Add a title from a game profile page.',
    'library.changeStatus': 'Change status',
    'library.status.want_to_play': 'Want to Play',
    'library.status.playing': 'Playing',
    'library.status.completed': 'Completed',

    'review.title': 'Leave a Review',
    'review.comment': 'Comment',
    'review.placeholder': 'Share your thoughts about {title}',
    'review.post': 'Post',
    'review.errorMissingRating': 'Error: review must contain star rating',

    'userProfile.title': 'My Profile',
    'userProfile.subtitle': 'A summary of your public activity on GameShelf.',
    'userProfile.username': 'Username',
    'userProfile.email': 'Email',
    'userProfile.bio': 'Bio',
    'userProfile.joined': 'Joined',
    'userProfile.stats.reviews': 'Reviews written',
    'userProfile.stats.library': 'Games in library',
    'userProfile.stats.followers': 'Followers',
    'userProfile.stats.following': 'Following',
    'userProfile.recentReviews': 'Recent Reviews',
    'userProfile.noReviews': 'You have not written any reviews yet.',

    'snackbar.reviewPosted': 'Review posted successfully.',
    'snackbar.libraryAdded': 'Game added to My Game Library.',
    'snackbar.libraryExists': 'This game is already in your library.',
    'snackbar.libraryStatusUpdated': 'Library status updated.',

    'footer.copy': '© 2026 GameShelf. All rights reserved.',
  },

  fr: {
    'nav.home': 'Accueil',
    'nav.discover': 'Découvrir',
    'nav.library': 'Ma bibliothèque',
    'nav.profile': 'Profil',

    'hero.title': 'Votre espace pour découvrir les jeux vidéo',
    'hero.subtitle':
      'Suivez ce que vous jouez. Partagez votre avis. Découvrez la suite.',
    'hero.discover': 'Découvrir',
    'hero.library': 'Ma bibliothèque',

    'sections.featuredGames': 'Jeux en vedette',
    'sections.featuredReviews': 'Avis en vedette',
    'sections.featuredSubtitle':
      'Les choix les plus discutés par la communauté cette semaine.',

    'discover.title': 'Découvrir',
    'discover.subtitle': 'Recherchez par titre, développeur ou plateforme.',
    'discover.searchPlaceholder': 'Recherche rapide d’un jeu',
    'discover.platformFilter': 'Plateforme',
    'discover.allPlatforms': 'Toutes les plateformes',
    'discover.sortBy': 'Trier par',
    'discover.sort.popular': 'Populaires',
    'discover.sort.newest': 'Plus récents',
    'discover.sort.rating': 'Mieux notés',
    'discover.empty': 'Aucun jeu ne correspond à votre recherche.',

    'profile.notFound': 'Jeu introuvable',
    'profile.back': 'Retour',
    'profile.developer': 'Développeur',
    'profile.averageRating': 'Note moyenne',
    'profile.reviewCount': '{count} avis',
    'profile.leaveReview': 'Laisser un avis',
    'profile.addToLibrary': 'Ajouter à ma bibliothèque',
    'profile.libraryStatus': 'Statut dans la bibliothèque',
    'profile.reviews': 'Avis',
    'profile.readReviewsHelp':
      'Lisez les avis des autres joueurs avant d’ajouter le vôtre.',
    'profile.noReviews':
      'Aucun avis pour le moment. Soyez le premier à en écrire un.',

    'library.title': 'Ma bibliothèque',
    'library.subtitle':
      'Suivez les jeux que vous voulez essayer, que vous jouez actuellement, ou que vous avez terminés.',
    'library.empty':
      'Votre bibliothèque est vide. Ajoutez un jeu depuis sa page de profil.',
    'library.changeStatus': 'Changer le statut',
    'library.status.want_to_play': 'À essayer',
    'library.status.playing': 'En cours',
    'library.status.completed': 'Terminé',

    'review.title': 'Laisser un avis',
    'review.comment': 'Commentaire',
    'review.placeholder': 'Partagez votre avis sur {title}',
    'review.post': 'Publier',
    'review.errorMissingRating':
      'Erreur : un avis doit contenir une note en étoiles',

    'userProfile.title': 'Mon profil',
    'userProfile.subtitle': 'Un résumé de votre activité publique sur GameShelf.',
    'userProfile.username': "Nom d'utilisateur",
    'userProfile.email': 'Courriel',
    'userProfile.bio': 'Biographie',
    'userProfile.joined': 'Inscrit le',
    'userProfile.stats.reviews': 'Avis rédigés',
    'userProfile.stats.library': 'Jeux dans la bibliothèque',
    'userProfile.stats.followers': 'Abonnés',
    'userProfile.stats.following': 'Abonnements',
    'userProfile.recentReviews': 'Avis récents',
    'userProfile.noReviews': "Vous n'avez encore rédigé aucun avis.",

    'snackbar.reviewPosted': 'Avis publié avec succès.',
    'snackbar.libraryAdded': 'Jeu ajouté à votre bibliothèque.',
    'snackbar.libraryExists': 'Ce jeu est déjà dans votre bibliothèque.',
    'snackbar.libraryStatusUpdated': 'Statut de la bibliothèque mis à jour.',

    'footer.copy': '© 2026 GameShelf. Tous droits réservés.',
  },
};

export function t(language, key, params = {}) {
  const template = STRINGS[language]?.[key] ?? STRINGS.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? ''));
}