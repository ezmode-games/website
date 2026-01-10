import { describe, expect, it } from 'vitest';

/** Status from the CTD repo status.json */
interface GameStatus {
  name: string;
  game: string;
  status: 'scaffolding' | 'alpha' | 'beta' | 'stable';
  version: string | null;
  build_type: string;
  quality: 'scaffolding' | 'experimental' | 'good' | 'stable';
  features: string[];
  published: {
    github: string | null;
    nexus: string | null;
    ezmode: string | null;
  };
}

/** Transformed game data for display */
interface GameDisplayData {
  id: string;
  name: string;
  status: 'live' | 'alpha' | 'coming-soon';
  description: string;
  githubUrl: string | null;
}

/** Map status.json data to display format */
function transformGameStatus(id: string, game: GameStatus): GameDisplayData {
  const statusMap: Record<string, 'live' | 'alpha' | 'coming-soon'> = {
    beta: 'live',
    stable: 'live',
    alpha: 'alpha',
    scaffolding: 'coming-soon',
  };

  const descriptionMap: Record<string, string> = {
    live: `${game.version ? `v${game.version}` : 'Available'}. Go break things.`,
    alpha: `${game.version ? `v${game.version}` : 'Alpha'}. Experimental but functional.`,
    'coming-soon': 'Planned. Stay tuned.',
  };

  const displayStatus = statusMap[game.status] ?? 'coming-soon';

  return {
    id,
    name: game.game,
    status: displayStatus,
    description: descriptionMap[displayStatus],
    githubUrl: game.published.github,
  };
}

/** Sort games: live first, then alpha, then coming-soon */
function sortGames(games: GameDisplayData[]): GameDisplayData[] {
  const order = { live: 0, alpha: 1, 'coming-soon': 2 };
  return [...games].sort((a, b) => order[a.status] - order[b.status]);
}

describe('Game Status Transformation', () => {
  const createMockGame = (overrides: Partial<GameStatus> = {}): GameStatus => ({
    name: 'skyrimse',
    game: 'Skyrim SE',
    status: 'beta',
    version: '1.0.0',
    build_type: 'release',
    quality: 'good',
    features: ['stack_trace', 'load_order'],
    published: {
      github: 'https://github.com/ezmode-games/ctd/releases',
      nexus: null,
      ezmode: null,
    },
    ...overrides,
  });

  describe('transformGameStatus', () => {
    it('should transform beta status to live', () => {
      const game = createMockGame({ status: 'beta' });
      const result = transformGameStatus('skyrimse', game);

      expect(result.status).toBe('live');
      expect(result.description).toContain('v1.0.0');
      expect(result.description).toContain('Go break things');
    });

    it('should transform stable status to live', () => {
      const game = createMockGame({ status: 'stable' });
      const result = transformGameStatus('skyrimse', game);

      expect(result.status).toBe('live');
    });

    it('should transform alpha status to alpha', () => {
      const game = createMockGame({ status: 'alpha', version: '0.1.0' });
      const result = transformGameStatus('cp2077', game);

      expect(result.status).toBe('alpha');
      expect(result.description).toContain('v0.1.0');
      expect(result.description).toContain('Experimental but functional');
    });

    it('should transform scaffolding status to coming-soon', () => {
      const game = createMockGame({ status: 'scaffolding', version: null });
      const result = transformGameStatus('fallout4', game);

      expect(result.status).toBe('coming-soon');
      expect(result.description).toBe('Planned. Stay tuned.');
    });

    it('should handle null version for live status', () => {
      const game = createMockGame({ status: 'beta', version: null });
      const result = transformGameStatus('skyrimse', game);

      expect(result.description).toBe('Available. Go break things.');
    });

    it('should handle null version for alpha status', () => {
      const game = createMockGame({ status: 'alpha', version: null });
      const result = transformGameStatus('cp2077', game);

      expect(result.description).toBe('Alpha. Experimental but functional.');
    });

    it('should preserve game name and github url', () => {
      const game = createMockGame({
        game: 'Cyberpunk 2077',
        published: {
          github: 'https://github.com/test',
          nexus: null,
          ezmode: null,
        },
      });
      const result = transformGameStatus('cp2077', game);

      expect(result.id).toBe('cp2077');
      expect(result.name).toBe('Cyberpunk 2077');
      expect(result.githubUrl).toBe('https://github.com/test');
    });

    it('should handle null github url', () => {
      const game = createMockGame({
        published: { github: null, nexus: null, ezmode: null },
      });
      const result = transformGameStatus('skyrimse', game);

      expect(result.githubUrl).toBeNull();
    });
  });

  describe('sortGames', () => {
    it('should sort live games first', () => {
      const games: GameDisplayData[] = [
        { id: 'a', name: 'Alpha Game', status: 'alpha', description: '', githubUrl: null },
        { id: 'b', name: 'Live Game', status: 'live', description: '', githubUrl: null },
        { id: 'c', name: 'Coming Soon', status: 'coming-soon', description: '', githubUrl: null },
      ];

      const sorted = sortGames(games);

      expect(sorted[0].status).toBe('live');
      expect(sorted[1].status).toBe('alpha');
      expect(sorted[2].status).toBe('coming-soon');
    });

    it('should maintain order within same status', () => {
      const games: GameDisplayData[] = [
        { id: 'a', name: 'First Live', status: 'live', description: '', githubUrl: null },
        { id: 'b', name: 'Second Live', status: 'live', description: '', githubUrl: null },
      ];

      const sorted = sortGames(games);

      expect(sorted[0].id).toBe('a');
      expect(sorted[1].id).toBe('b');
    });

    it('should not mutate original array', () => {
      const games: GameDisplayData[] = [
        { id: 'a', name: 'Coming Soon', status: 'coming-soon', description: '', githubUrl: null },
        { id: 'b', name: 'Live Game', status: 'live', description: '', githubUrl: null },
      ];

      const sorted = sortGames(games);

      expect(games[0].id).toBe('a');
      expect(sorted[0].id).toBe('b');
    });
  });
});
