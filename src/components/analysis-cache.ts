import { Demographics } from '@/types/Demographics';

export interface CachedAnalysis {
  data: Demographics;
  timestamp: number;
}

/**
 * In-memory cache to store demographics associated with generated IDs.
 * Note: This is a temporary server-side cache and will reset on redeploy or restart.
 */
export const analysisCache = new Map<string, CachedAnalysis>();