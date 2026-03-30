import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import StarRating from './StarRating';
import * as styles from '../styles/appStyles';

export default function ReviewDialog({ open, gameTitle, onClose, onSubmit, tr }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!open) {
      setRating(0);
      setComment('');
      setErrorMessage('');
    }
  }, [open]);

  const handleSubmit = () => {
    if (!rating) {
      // MODIFIED: bilingual validation message
      setErrorMessage(tr('review.errorMissingRating'));
      return;
    }

    onSubmit?.({
      rating,
      comment: comment.trim(),
    });

    setErrorMessage('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: styles.reviewDialogPaperSx }}
    >
      <DialogContent sx={styles.reviewDialogContentSx}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#14151a' }}>
            {tr('review.title')}
          </Typography>

          <IconButton
            onClick={onClose}
            sx={styles.reviewDialogCloseSx}
            aria-label="Close review dialog"
          >
            ×
          </IconButton>
        </Stack>

        <Box sx={{ mt: 2.4 }}>
          <StarRating value={rating} readOnly={false} onChange={setRating} size={34} />
        </Box>

        <Box sx={{ mt: 2.2 }}>
          <Typography variant="body2" sx={styles.reviewDialogLabelSx}>
            {tr('review.comment')}
          </Typography>

          <TextField
            multiline
            minRows={6}
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={tr('review.placeholder', { title: gameTitle })}
            InputProps={{ sx: styles.reviewDialogInputSx }}
          />
        </Box>

        {errorMessage ? (
          <Typography variant="body2" sx={styles.reviewDialogErrorSx}>
            {errorMessage}
          </Typography>
        ) : null}

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.6 }}>
          <Button variant="contained" onClick={handleSubmit} sx={styles.reviewDialogPostButtonSx}>
            {tr('review.post')}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}