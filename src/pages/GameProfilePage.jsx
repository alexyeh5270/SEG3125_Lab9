import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GamePosterCard from "../components/GamePosterCard";
import GameReviewCard from "../components/GameReviewCard";

export default function GameProfilePage({
  game,
  reviews,
  inLibrary,
  onBack,
  onAddToLibrary,
  onOpenReview,
}) {
  if (!game) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3">Game not found</Typography>
        <Button sx={{ mt: 2 }} onClick={onBack}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5, px: { xs: 3, md: 8 } }}>
      <Button onClick={onBack} sx={{ mb: 3, px: 0 }}>
        ← Back
      </Button>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e7eaf1",
          p: { xs: 3, md: 4 },
          borderRadius: 4,
        }}
      >
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          <Box sx={{ width: { xs: "100%", lg: 280 }, flexShrink: 0 }}>
            <GamePosterCard
              title={game.title}
              posterSrc={game.posterUrl}
              width="100%"
              height={420}
              showTitle={false}
            />
          </Box>

          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography variant="h2">
              {game.title} ({game.releaseYear})
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              flexWrap="wrap"
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                <b>Developer:</b> {game.developer}
              </Typography>
              {game.publishers && game.publishers.length > 0 && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>Publisher:</b> {game.publishers.join(", ")}
                </Typography>
              )}
              {game.genres && game.genres.length > 0 && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>Genre:</b> {game.genres.join(", ")}
                </Typography>
              )}
              {game.esrb && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>ESRB:</b> {game.esrb}
                </Typography>
              )}
              {game.coop && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>Co-op:</b> {game.coop}
                </Typography>
              )}
              {game.playerInfo && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>Players:</b> {game.playerInfo}
                </Typography>
              )}
              {game.releaseDate && (
                <Typography variant="subtitle1" sx={{ color: "#5f6778" }}>
                  <b>Release Date:</b> {game.releaseDate}
                </Typography>
              )}
            </Stack>

            <Typography
              variant="body1"
              sx={{ maxWidth: 900, color: "#20242d", mt: 1 }}
            >
              {game.description}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              <Button variant="contained" onClick={onOpenReview}>
                Leave a Review
              </Button>
              <Button variant="outlined" onClick={onAddToLibrary}>
                {inLibrary
                  ? "Already in My Game Library"
                  : "Add to My Game Library"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Divider sx={{ my: 5 }} />

      <Stack spacing={2}>
        <Typography variant="h3">Reviews</Typography>
        <Typography variant="body1" sx={{ color: "#666d7d" }}>
          Read other players&apos; opinions and compare impressions before
          adding your own.
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={4}
        sx={{ mt: 4, alignItems: "stretch" }}
      >
        {reviews.length ? (
          reviews.map((review) => (
            <GameReviewCard
              key={`game-review-${review.id}`}
              title={game.title}
              reviewText={review.reviewText}
              username={review.username}
              date={review.date}
              rating={review.rating}
              posterSrc={review.posterUrl}
            />
          ))
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px dashed #cdd3e1",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography variant="body1">
              No reviews yet. Be the first to write one.
            </Typography>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
