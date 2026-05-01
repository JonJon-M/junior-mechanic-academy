import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);

export interface LeaderboardEntry {
  id?: string;
  name: string;
  avatar: string;
  xp: number;
  badges: number;
  modules_done: number;
  updated_at?: string;
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('name, avatar, xp, badges, modules_done, updated_at')
    .order('xp', { ascending: false })
    .limit(20);
  if (error) { console.error('leaderboard fetch:', error.message); return []; }
  return data ?? [];
}

export async function upsertScore(entry: LeaderboardEntry): Promise<void> {
  const { error } = await supabase
    .from('leaderboard')
    .upsert(
      { ...entry },
      { onConflict: 'name' }
    );
  if (error) console.error('leaderboard upsert:', error.message);
}
