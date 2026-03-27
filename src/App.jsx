import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Snackbar, ThemeProvider, Typography } from '@mui/material';
import theme from './theme';
import * as styles from './styles/appStyles';
import { getHomeViewModel } from './controllers/homeController';
import { CURRENT_USERNAME } from './constants/homeContent';
import AppHeader from './components/AppHeader';
import ReviewDialog from './components/ReviewDialog';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import GameProfilePage from './pages/GameProfilePage';
import LibraryPage from './pages/LibraryPage';

function formatToday() {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}

export default function App() {
  const [page, setPage] = useState('home');
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [libraryGameIds, setLibraryGameIds] = useState([1, 4]);
  const [loading, setLoading] = useState(true);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      try {
        const viewModel = await getHomeViewModel();

        if (!isMounted) {
          return;
        }

        setFeaturedGames(viewModel.featuredGames || []);
        setFeaturedReviews(viewModel.featuredReviews || []);
        setGames(viewModel.allGames || []);
        setReviews(viewModel.allReviews || []);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedGameId) || null,
    [games, selectedGameId],
  );

  const selectedGameReviews = useMemo(
    () => reviews.filter((review) => review.gameId === selectedGameId),
    [reviews, selectedGameId],
  );

  const libraryGames = useMemo(
    () => games.filter((game) => libraryGameIds.includes(game.id)),
    [games, libraryGameIds],
  );

  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    if (nextPage !== 'game') {
      setReviewDialogOpen(false);
    }
  };

  const handleOpenGame = (gameId) => {
    setSelectedGameId(gameId);
    setPage('game');
  };

  const handleBackFromGame = () => {
    setReviewDialogOpen(false);
    setPage('discover');
  };

  const handleAddToLibrary = async () => {
    if (!selectedGameId) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          gameId: selectedGame.id,
          gameName: selectedGame.title
        }),
      });

      if (response.status === 409) {
        setSnackbarMessage('This game is already in your library.');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setSnackbarMessage('Game added to My Game Library.');
      setLibraryGameIds((currentIds) => {
        if (!currentIds.includes(selectedGameId)) {
          return [...currentIds, selectedGameId];
        }
        return currentIds;
      });

    } catch (error) {
      console.error('Failed to add game to library:', error);
      setSnackbarMessage('Error: Could not add game to library.');
    }
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    if (!selectedGame) {
      return;
    }

    const reviewDataToSend = {
      gameId: selectedGame.id,
      title: selectedGame.title,
      posterUrl: selectedGame.posterUrl,
      reviewText: comment || 'No written comment provided.',
      username: CURRENT_USERNAME,
      rating: rating,
      isFeatured: false,
    };

    try {
      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewDataToSend),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const savedReview = await response.json();

      setReviews((currentReviews) => [savedReview, ...currentReviews]);
      setReviewDialogOpen(false);
      setSnackbarMessage('Review posted successfully.');
      console.log('Successfully saved to backend:', savedReview);

    } catch (error) {
      console.error('Failed to post review:', error);
      setSnackbarMessage('Error: Could not save review.');
    }
  };

  let pageContent = null;

  if (loading) {
    pageContent = (
      <Box sx={{ minHeight: '55vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (page === 'discover') {
    pageContent = <DiscoverPage games={games} onOpenGame={handleOpenGame} />;
  } else if (page === 'game') {
    pageContent = (
      <GameProfilePage
        game={selectedGame}
        reviews={selectedGameReviews}
        inLibrary={libraryGameIds.includes(selectedGameId)}
        onBack={handleBackFromGame}
        onAddToLibrary={handleAddToLibrary}
        onOpenReview={() => setReviewDialogOpen(true)}
      />
    );
  } else if (page === 'library') {
    pageContent = <LibraryPage libraryGames={libraryGames} onOpenGame={handleOpenGame} />;
  } else {
    pageContent = (
      <HomePage
        featuredGames={featuredGames}
        featuredReviews={featuredReviews}
        onNavigate={handleNavigate}
        onOpenGame={handleOpenGame}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.appShellSx}>
        <AppHeader currentPage={page} onNavigate={handleNavigate} />
        {pageContent}

        <Box component="footer" sx={styles.footerSx}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2026 GameShelf. All rights reserved.
            </Typography>
          </Container>
        </Box>

        <ReviewDialog
          open={reviewDialogOpen}
          gameTitle={selectedGame?.title || 'this game'}
          onClose={() => setReviewDialogOpen(false)}
          onSubmit={handleSubmitReview}
        />

        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={2800}
          message={snackbarMessage}
          onClose={() => setSnackbarMessage('')}
        />
      </Box>
    </ThemeProvider>
  );
}
