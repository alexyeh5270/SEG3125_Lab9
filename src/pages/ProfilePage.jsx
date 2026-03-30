import {
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import StarRating from '../components/StarRating';
import * as styles from '../styles/appStyles';

function StatCard({ label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: 3,
        border: '1px solid #dfe4ef',
        backgroundColor: '#f8f9fc',
        minWidth: 170,
      }}
    >
      <Typography variant="body2" sx={{ color: '#667086' }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ mt: 0.8 }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function ProfilePage({
  profile,
  userReviews,
  libraryCount,
  tr,
}) {
  return (
    <Container maxWidth="xl" sx={{ py: 5, px: { xs: 3, md: 8 } }}>
      <Typography variant="h2">{tr('userProfile.title')}</Typography>
      <Typography variant="subtitle1" sx={{ color: '#5f6778', mt: 1, maxWidth: 760 }}>
        {tr('userProfile.subtitle')}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: { xs: 3, md: 4 },
          border: '1px solid #e7eaf1',
          borderRadius: 4,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Avatar
            src={profile.avatarUrl}
            sx={{
              width: 96,
              height: 96,
              fontSize: 34,
              bgcolor: '#40559A',
            }}
          >
            {profile.displayName?.[0] || 'P'}
          </Avatar>

          <Stack spacing={1.2} sx={{ flex: 1 }}>
            <Typography variant="h3">{profile.displayName}</Typography>

            <Typography variant="body1" sx={{ color: '#5f6778' }}>
              {tr('userProfile.username')}: {profile.username}
            </Typography>

            <Typography variant="body1" sx={{ color: '#5f6778' }}>
              {tr('userProfile.email')}: {profile.email}
            </Typography>

            <Typography variant="body1" sx={{ color: '#20242d', maxWidth: 860 }}>
              {tr('userProfile.bio')}: {profile.bio}
            </Typography>

            <Typography variant="body2" sx={{ color: '#7b8395' }}>
              {tr('userProfile.joined')}: {profile.joinedOn}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          sx={{ mt: 3.5 }}
        >
          <StatCard
            label={tr('userProfile.stats.reviews')}
            value={userReviews.length}
          />
          <StatCard
            label={tr('userProfile.stats.library')}
            value={libraryCount}
          />
          <StatCard
            label={tr('userProfile.stats.followers')}
            value={profile.followersCount}
          />
          <StatCard
            label={tr('userProfile.stats.following')}
            value={profile.followingCount}
          />
        </Stack>
      </Paper>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h3">{tr('userProfile.recentReviews')}</Typography>

        {!userReviews.length ? (
          <Typography variant="body1" sx={{ mt: 3, color: '#666d7d' }}>
            {tr('userProfile.noReviews')}
          </Typography>
        ) : (
          <Stack spacing={2.5} sx={{ mt: 3 }}>
            {userReviews.slice(0, 8).map((review) => (
              <Paper
                key={`profile-review-${review.id}`}
                elevation={0}
                sx={{
                  p: 2.5,
                  border: '1px solid #e2e6ef',
                  borderRadius: 3,
                  backgroundColor: '#fff',
                }}
              >
                <Stack spacing={1.2}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {review.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6a7282' }}>
                      {review.date}
                    </Typography>
                  </Stack>

                  <StarRating
                    value={review.rating}
                    max={5}
                    activeColor={styles.ratingActiveColor}
                    inactiveColor={styles.ratingInactiveColor}
                    size={26}
                  />

                  <Typography variant="body1" sx={{ color: '#22252c' }}>
                    {review.reviewText}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
}