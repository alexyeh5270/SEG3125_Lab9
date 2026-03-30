import { CURRENT_USER_ID } from '../constants/homeContent';
import { getJson, hasApiBase, patchJson, postJson } from './apiClient';

const FALLBACK_LIBRARY = [
  { userId: CURRENT_USER_ID, gameId: 1, status: 'playing' },
  { userId: CURRENT_USER_ID, gameId: 4, status: 'want_to_play' },
];

export async function listLibraryEntries(userId = CURRENT_USER_ID) {
  if (!hasApiBase()) {
    return FALLBACK_LIBRARY;
  }

  try {
    return await getJson('/library', { query: { userId } });
  } catch {
    return FALLBACK_LIBRARY;
  }
}

export async function addLibraryEntry(payload) {
  if (!hasApiBase()) {
    return payload;
  }

  return postJson('/library', payload);
}

export async function updateLibraryStatus(gameId, payload) {
  if (!hasApiBase()) {
    return { gameId, ...payload };
  }

  return patchJson(`/library/${gameId}`, payload);
}