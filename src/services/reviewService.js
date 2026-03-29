import { getJson } from "./apiClient";

export async function listAllReviews() {
  return getJson("api/reviews");
}
export async function listFeaturedReviews() {
  const reviews = await getJson("api/reviews");
  return reviews.filter((review) => review.isFeatured);
}
export async function listReviewsByGameId(gameId) {
  const reviews = await getJson("api/reviews");
  return reviews.filter((review) => review.gameId === Number(gameId));
}
