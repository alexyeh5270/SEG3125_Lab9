<<<<<<< HEAD
import { getJson } from "./apiClient";

export async function listAllReviews() {
  return getJson("api/reviews");
=======
import { mockReviews } from '../data/mockData';
import { getJson, hasApiBase, postJson } from './apiClient';

function normalizeReview(review) {
  const fallbackText =
    review.reviewText ??
    review.review_text ??
    review.comment ??
    '';

  return {
    ...review,
    // MODIFIED: normalize bilingual review fields from either mock data or backend fields
    reviewTextEn:
      review.reviewTextEn ??
      review.review_text_en ??
      review.comment_en ??
      fallbackText,
    reviewTextFr:
      review.reviewTextFr ??
      review.review_text_fr ??
      review.comment_fr ??
      fallbackText,
    reviewText: fallbackText,
  };
}

export async function listAllReviews() {
  if (!hasApiBase()) {
    return mockReviews.map(normalizeReview);
  }

  try {
    const data = await getJson('/reviews');
    return data.map(normalizeReview);
  } catch {
    return mockReviews.map(normalizeReview);
  }
>>>>>>> Macintosh
}
export async function listFeaturedReviews() {
<<<<<<< HEAD
  const reviews = await getJson("api/reviews");
  return reviews.filter((review) => review.isFeatured);
=======
  if (!hasApiBase()) {
    return mockReviews.filter((review) => review.isFeatured).map(normalizeReview);
  }

  try {
    const data = await getJson('/reviews/featured');
    return data.map(normalizeReview);
  } catch {
    return mockReviews.filter((review) => review.isFeatured).map(normalizeReview);
  }
>>>>>>> Macintosh
}
export async function listReviewsByGameId(gameId) {
<<<<<<< HEAD
  const reviews = await getJson("api/reviews");
  return reviews.filter((review) => review.gameId === Number(gameId));
=======
  if (!hasApiBase()) {
    return mockReviews
      .filter((review) => review.gameId === Number(gameId))
      .map(normalizeReview);
  }

  try {
    const data = await getJson(`/games/${gameId}/reviews`);
    return data.map(normalizeReview);
  } catch {
    return mockReviews
      .filter((review) => review.gameId === Number(gameId))
      .map(normalizeReview);
  }
>>>>>>> Macintosh
}

export async function createReview(payload) {
  if (!hasApiBase()) {
    return { id: Date.now(), ...payload };
  }

  return postJson('/reviews', payload);
}