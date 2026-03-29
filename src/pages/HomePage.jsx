import { Box, Button, Container, Stack, Typography } from "@mui/material";
import homePageHero from "../assets/homePageHero.jpg";
import GamePosterCard from "../components/GamePosterCard";
import GameReviewCard from "../components/GameReviewCard";
import SectionHeader from "../components/SectionHeader";
import { FEATURED_SECTIONS } from "../constants/homeContent";
import * as styles from "../styles/appStyles";

export default function HomePage({
  featuredGames,
  featuredReviews,
  onNavigate,
  onOpenGame,
}) {
  return (
    <Box component="main" sx={styles.mainSx}>
      <Container maxWidth={false} disableGutters>
        <Box id="homePageHero" sx={styles.homeHeroWrapSx}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 5 }}
            sx={{ ...styles.heroRowSx, px: 0, py: 0, alignItems: "center" }}
          >
            <Stack
              direction="column"
              spacing={2.5}
              sx={{
                ...styles.heroTextColumnSx,
                width: { xs: "100%", md: "36%" },
              }}
            >
              <Typography variant="h1" sx={{ ...styles.heroTitleSx, mt: 0 }}>
                Your home for video game discovery
              </Typography>
              <Typography variant="h5" sx={styles.heroSubtitleSx}>
                Track what you play. Share what you think. Discover what&apos;s
                next.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={styles.heroActionsSx}
              >
                <Button
                  variant="contained"
                  sx={styles.heroPrimaryButtonSx}
                  onClick={() => onNavigate("discover")}
                >
                  <Typography
                    variant="subtitle1"
                    sx={styles.heroPrimaryButtonTextSx}
                  >
                    Discover
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={styles.heroSecondaryButtonSx}
                  onClick={() => onNavigate("library")}
                >
                  <Typography
                    variant="subtitle1"
                    sx={styles.heroSecondaryButtonTextSx}
                  >
                    My Game Library
                  </Typography>
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                ...styles.heroImageWrapSx,
                width: { xs: "100%", md: "58%" },
              }}
            >
              <Box
                component="img"
                src={homePageHero}
                alt="GameShelf hero"
                sx={styles.heroImageSx}
              />
            </Box>
          </Stack>
        </Box>
      </Container>

      <Container maxWidth={false} disableGutters>
        <Box id="featuredGames" sx={styles.homeSectionWrapSx}>
          <SectionHeader
            title={FEATURED_SECTIONS.games.title}
            subtitle={FEATURED_SECTIONS.games.subtitle}
          />
          <Box id="featuredGamesGrid" sx={styles.featuredGamesGridSx}>
            {featuredGames.map((game) => (
              <GamePosterCard
                key={`featured-game-${game.id}`}
                title={game.title}
                posterSrc={game.posterUrl}
                developer={game.developer}
                year={game.releaseYear}
                sx={styles.featuredGameCardSx}
                onClick={() => onOpenGame(game.id)}
              />
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth={false} disableGutters>
        <Box id="featuredReviews" sx={styles.homeSectionWrapSx}>
          <SectionHeader
            title={FEATURED_SECTIONS.reviews.title}
            subtitle={FEATURED_SECTIONS.reviews.subtitle}
          />
          <Stack direction="row" spacing={4} sx={styles.homeReviewsRowSx}>
            {featuredReviews.map((review) => (
              <Box
                key={`featured-review-${review.id}`}
                sx={{ flex: "0 0 auto" }}
              >
                <GameReviewCard
                  title={review.title}
                  reviewText={review.reviewText}
                  username={review.username}
                  date={review.date}
                  rating={review.rating}
                  posterSrc={review.posterUrl}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
