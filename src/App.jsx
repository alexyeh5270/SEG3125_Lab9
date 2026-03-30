<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
=======
import { useEffect, useMemo, useState } from 'react';
>>>>>>> Macintosh
import {
  Box,
  CircularProgress,
  Container,
  Snackbar,
  ThemeProvider,
  Typography,
<<<<<<< HEAD
} from "@mui/material";
import theme from "./theme";
import * as styles from "./styles/appStyles";
import { getHomeViewModel } from "./controllers/homeController";
import { CURRENT_USERNAME } from "./constants/homeContent";
import AppHeader from "./components/AppHeader";
import ReviewDialog from "./components/ReviewDialog";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import GameProfilePage from "./pages/GameProfilePage";
import LibraryPage from "./pages/LibraryPage";

function formatToday() {
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
=======
} from '@mui/material';
import theme from './theme';
import * as styles from './styles/appStyles';
import { getHomeViewModel } from './controllers/homeController';
import { CURRENT_USER_ID, CURRENT_USERNAME } from './constants/homeContent';
import { t } from './constants/i18n';
import AppHeader from './components/AppHeader';
import ReviewDialog from './components/ReviewDialog';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import GameProfilePage from './pages/GameProfilePage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage'; // MODIFIED: new page
import { mockCurrentProfile } from './data/mockData'; // MODIFIED: profile data
import {
  addLibraryEntry,
  listLibraryEntries,
  updateLibraryStatus,
} from './services/libraryService';
import { createReview } from './services/reviewService';

function formatToday(language) {
  return new Intl.DateTimeFormat(language === 'fr' ? 'fr-CA' : 'en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
>>>>>>> Macintosh
  }).format(new Date());
}

function localizeReview(review, language) {
  // MODIFIED: switch displayed review comment by current mode
  const localizedText =
    language === 'fr'
      ? review.reviewTextFr ?? review.reviewText
      : review.reviewTextEn ?? review.reviewText;

  return {
    ...review,
    reviewText: localizedText,
  };
}

export default function App() {
<<<<<<< HEAD
  const [page, setPage] = useState("home");
=======
  const [page, setPage] = useState('home');
  const [language, setLanguage] = useState('en'); // MODIFIED: bilingual state

>>>>>>> Macintosh
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [libraryEntries, setLibraryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const tr = (key, params) => t(language, key, params);

  useEffect(() => {
    let isMounted = true;

    const loadAppData = async () => {
      try {
        const [viewModel, nextLibraryEntries] = await Promise.all([
          getHomeViewModel(),
          listLibraryEntries(CURRENT_USER_ID),
        ]);

        if (!isMounted) {
          return;
        }

        setFeaturedGames(viewModel.featuredGames || []);
        setFeaturedReviews(viewModel.featuredReviews || []);
        setGames(viewModel.allGames || []);
        setReviews(viewModel.allReviews || []);
        setLibraryEntries(nextLibraryEntries || []);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAppData();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedGameId) || null,
    [games, selectedGameId],
  );

  const selectedGameReviews = useMemo(
    () =>
      reviews
        .filter((review) => review.gameId === selectedGameId)
        .map((review) => localizeReview(review, language)),
    [reviews, selectedGameId, language],
  );

  const localizedFeaturedReviews = useMemo(
    () => featuredReviews.map((review) => localizeReview(review, language)),
    [featuredReviews, language],
  );

  const selectedLibraryStatus = useMemo(
    () =>
      libraryEntries.find((entry) => entry.gameId === selectedGameId)?.status || null,
    [libraryEntries, selectedGameId],
  );

  const hydratedLibraryEntries = useMemo(
    () =>
      libraryEntries
        .map((entry) => ({
          ...entry,
          game: games.find((game) => game.id === entry.gameId) || null,
        }))
        .filter((entry) => entry.game),
    [games, libraryEntries],
  );

  // MODIFIED: collect current user's reviews for the new profile page
  const currentUserReviews = useMemo(
    () =>
      reviews
        .filter((review) => review.username === CURRENT_USERNAME)
        .map((review) => localizeReview(review, language)),
    [reviews, language],
  );

  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    if (nextPage !== "game") {
      setReviewDialogOpen(false);
    }
  };

  const handleOpenGame = (gameId) => {
    setSelectedGameId(gameId);
    setPage("game");
  };

  const handleBackFromGame = () => {
    setReviewDialogOpen(false);
    setPage("discover");
  };

  const handleAddToLibrary = async () => {
    if (!selectedGameId) {
      return;
    }

<<<<<<< HEAD
    try {
      const response = await fetch("http://localhost:3000/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          gameId: selectedGame.id,
          gameName: selectedGame.title,
        }),
      });

      if (response.status === 409) {
        setSnackbarMessage("This game is already in your library.");
        return;
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setSnackbarMessage("Game added to My Game Library.");
      setLibraryGameIds((currentIds) => {
        if (!currentIds.includes(selectedGameId)) {
          return [...currentIds, selectedGameId];
        }
        return currentIds;
      });
    } catch (error) {
      // Error already handled by snackbar
      setSnackbarMessage("Error: Could not add game to library.");
    }
  };

=======
    const exists = libraryEntries.some((entry) => entry.gameId === selectedGameId);
    if (exists) {
      setSnackbarMessage(tr('snackbar.libraryExists'));
      return;
    }

    const nextEntry = {
      userId: CURRENT_USER_ID,
      gameId: selectedGameId,
      status: 'want_to_play',
    };

    await addLibraryEntry(nextEntry);
    setLibraryEntries((current) => [...current, nextEntry]);
    setSnackbarMessage(tr('snackbar.libraryAdded'));
  };

  const handleChangeLibraryStatus = async (gameId, status) => {
    await updateLibraryStatus(gameId, { userId: CURRENT_USER_ID, status });

    setLibraryEntries((current) =>
      current.map((entry) =>
        entry.gameId === gameId ? { ...entry, status } : entry,
      ),
    );

    setSnackbarMessage(tr('snackbar.libraryStatusUpdated'));
  };

>>>>>>> Macintosh
  const handleSubmitReview = async ({ rating, comment }) => {
    if (!selectedGame) {
      return;
    }

<<<<<<< HEAD
    const reviewDataToSend = {
      gameId: selectedGame.id,
      title: selectedGame.title,
=======
    await createReview({
      userId: CURRENT_USER_ID,
      gameId: selectedGame.id,
      rating,
      comment,
      status: 'published',
      // MODIFIED: backend-friendly bilingual fields if teammate DB supports them
      comment_en: language === 'en' ? comment : '',
      comment_fr: language === 'fr' ? comment : '',
    });

    const nextReview = {
      id: reviews.length + 1,
      gameId: selectedGame.id,
      title: selectedGame.title,
      reviewText: comment || 'No written comment provided.',
      // MODIFIED: preserve language-specific comment fields for mode switching
      reviewTextEn:
        language === 'en'
          ? comment || 'No written comment provided.'
          : comment || 'No written comment provided.',
      reviewTextFr:
        language === 'fr'
          ? comment || 'Aucun commentaire saisi.'
          : comment || 'No written comment provided.',
      username: CURRENT_USERNAME,
      date: formatToday(language),
      rating,
>>>>>>> Macintosh
      posterUrl: selectedGame.posterUrl,
      reviewText: comment || "No written comment provided.",
      username: CURRENT_USERNAME,
      rating: rating,
      isFeatured: false,
    };

<<<<<<< HEAD
    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewDataToSend),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const savedReview = await response.json();

      setReviews((currentReviews) => [savedReview, ...currentReviews]);
      setReviewDialogOpen(false);
      setSnackbarMessage("Review posted successfully.");
    } catch (error) {
      // Error already handled by snackbar
      setSnackbarMessage("Error: Could not save review.");
    }
=======
    setReviews((currentReviews) => [nextReview, ...currentReviews]);
    setReviewDialogOpen(false);
    setSnackbarMessage(tr('snackbar.reviewPosted'));
>>>>>>> Macintosh
  };

  let pageContent = null;

  if (loading) {
    pageContent = (
      <Box sx={{ minHeight: "55vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
<<<<<<< HEAD
  } else if (page === "discover") {
    pageContent = <DiscoverPage games={games} onOpenGame={handleOpenGame} />;
  } else if (page === "game") {
=======
  } else if (page === 'discover') {
    pageContent = (
      <DiscoverPage games={games} onOpenGame={handleOpenGame} tr={tr} />
    );
  } else if (page === 'game') {
>>>>>>> Macintosh
    pageContent = (
      <GameProfilePage
        game={selectedGame}
        reviews={selectedGameReviews}
        libraryStatus={selectedLibraryStatus}
        onBack={handleBackFromGame}
        onAddToLibrary={handleAddToLibrary}
        onChangeLibraryStatus={handleChangeLibraryStatus}
        onOpenReview={() => setReviewDialogOpen(true)}
        tr={tr}
      />
    );
<<<<<<< HEAD
  } else if (page === "library") {
    pageContent = (
      <LibraryPage libraryGames={libraryGames} onOpenGame={handleOpenGame} />
=======
  } else if (page === 'library') {
    pageContent = (
      <LibraryPage
        libraryEntries={hydratedLibraryEntries}
        onOpenGame={handleOpenGame}
        onChangeStatus={handleChangeLibraryStatus}
        tr={tr}
      />
    );
  } else if (page === 'profile') {
    // MODIFIED: new profile page route
    pageContent = (
      <ProfilePage
        profile={mockCurrentProfile}
        userReviews={currentUserReviews}
        libraryCount={hydratedLibraryEntries.length}
        tr={tr}
      />
>>>>>>> Macintosh
    );
  } else {
    pageContent = (
      <HomePage
        featuredGames={featuredGames}
        featuredReviews={localizedFeaturedReviews}
        onNavigate={handleNavigate}
        onOpenGame={handleOpenGame}
        tr={tr}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.appShellSx}>
        <AppHeader
          currentPage={page}
          onNavigate={handleNavigate}
          language={language}
          onChangeLanguage={setLanguage}
          tr={tr}
        />

        {pageContent}

        <Box component="footer" sx={styles.footerSx}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              {tr('footer.copy')}
            </Typography>
          </Container>
        </Box>

        <ReviewDialog
          open={reviewDialogOpen}
          gameTitle={selectedGame?.title || "this game"}
          onClose={() => setReviewDialogOpen(false)}
          onSubmit={handleSubmitReview}
          tr={tr}
        />

        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={2800}
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      </Box>
    </ThemeProvider>
  );
}