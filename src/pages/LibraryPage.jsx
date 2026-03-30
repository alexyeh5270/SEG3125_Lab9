import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import GamePosterCard from '../components/GamePosterCard';

const SECTION_ORDER = ['want_to_play', 'playing', 'completed'];

export default function LibraryPage({ libraryEntries, onOpenGame, onChangeStatus, tr }) {
  const groupedEntries = SECTION_ORDER.map((status) => ({
    status,
    items: libraryEntries.filter((entry) => entry.status === status),
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 5, px: { xs: 3, md: 8 } }}>
      <Typography variant="h2">{tr('library.title')}</Typography>
      <Typography variant="subtitle1" sx={{ color: '#5f6778', mt: 1, maxWidth: 760 }}>
        {tr('library.subtitle')}
      </Typography>

      {!libraryEntries.length ? (
        <Typography variant="body1" sx={{ mt: 5, color: '#666d7d' }}>
          {tr('library.empty')}
        </Typography>
      ) : (
        groupedEntries.map((group) => (
          <Box key={`library-section-${group.status}`} sx={{ mt: 5 }}>
            <Typography variant="h3" sx={{ mb: 2.5 }}>
              {tr(`library.status.${group.status}`)}
            </Typography>

            {!group.items.length ? (
              <Typography variant="body1" sx={{ color: '#7a8090' }}>
                —
              </Typography>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  // MODIFIED: fixed-width columns avoid stretched banner-like covers
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 240px))',
                  justifyContent: 'start',
                  gap: 4,
                }}
              >
                {group.items.map((entry) => (
                  <Stack
                    key={`library-game-${entry.game.id}`}
                    spacing={1.5}
                    sx={{
                      width: 240,
                    }}
                  >
                    <GamePosterCard
                      title={entry.game.title}
                      posterSrc={entry.game.posterUrl}
                      subtitle={`${entry.game.developer} · ${entry.game.releaseYear}`}
                      width={240}
                      height={360}
                      onClick={() => onOpenGame(entry.game.id)}
                    />

                    <FormControl fullWidth size="small">
                      <InputLabel>{tr('library.changeStatus')}</InputLabel>
                      <Select
                        value={entry.status}
                        label={tr('library.changeStatus')}
                        onChange={(event) =>
                          onChangeStatus(entry.game.id, event.target.value)
                        }
                      >
                        <MenuItem value="want_to_play">
                          {tr('library.status.want_to_play')}
                        </MenuItem>
                        <MenuItem value="playing">{tr('library.status.playing')}</MenuItem>
                        <MenuItem value="completed">{tr('library.status.completed')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
        ))
      )}
    </Container>
  );
}