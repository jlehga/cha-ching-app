// MOCK_FIXTURES.ts
export const MOCK_FIXTURES = [
    {
      id: '1',
      sport: { id: 'nba', name: 'NBA' },
      league: { id: 'nba', name: 'NBA' },
      fixture: {
        home_team_display: 'Lakers',
        away_team_display: 'Warriors',
      },
      odds: [
        {
          id: 'odd1',
          market: 'Point Spread',
          selection: 'Lakers -3.5',
          price: -110,
          is_main: true,
          points: 3.5,
        },
        {
          id: 'odd2',
          market: 'Point Spread',
          selection: 'Warriors +3.5',
          price: 102,
          is_main: false,
          points: -3.5,
        }
      ]
    },
    // More fixtures as needed...
  ];