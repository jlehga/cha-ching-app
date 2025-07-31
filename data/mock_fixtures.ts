// MOCK_FIXTURES.ts
export const MOCK_FIXTURES = [
  // NBA Games
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
  {
    id: '2',
    sport: { id: 'nba', name: 'NBA' },
    league: { id: 'nba', name: 'NBA' },
    fixture: {
      home_team_display: 'Celtics',
      away_team_display: 'Heat',
    },
    odds: [
      {
        id: 'odd3',
        market: 'Point Spread',
        selection: 'Celtics -2.5',
        price: -108,
        is_main: true,
        points: 2.5,
      },
      {
        id: 'odd4',
        market: 'Point Spread',
        selection: 'Heat +2.5',
        price: 104,
        is_main: false,
        points: -2.5,
      }
    ]
  },
  {
    id: '3',
    sport: { id: 'nba', name: 'NBA' },
    league: { id: 'nba', name: 'NBA' },
    fixture: {
      home_team_display: 'Nets',
      away_team_display: 'Knicks',
    },
    odds: [
      {
        id: 'odd5',
        market: 'Point Spread',
        selection: 'Nets -1.5',
        price: -105,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd6',
        market: 'Point Spread',
        selection: 'Knicks +1.5',
        price: 107,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '4',
    sport: { id: 'nba', name: 'NBA' },
    league: { id: 'nba', name: 'NBA' },
    fixture: {
      home_team_display: 'Bucks',
      away_team_display: 'Bulls',
    },
    odds: [
      {
        id: 'odd7',
        market: 'Point Spread',
        selection: 'Bucks -4.5',
        price: -112,
        is_main: true,
        points: 4.5,
      },
      {
        id: 'odd8',
        market: 'Point Spread',
        selection: 'Bulls +4.5',
        price: 100,
        is_main: false,
        points: -4.5,
      }
    ]
  },
  {
    id: '5',
    sport: { id: 'nba', name: 'NBA' },
    league: { id: 'nba', name: 'NBA' },
    fixture: {
      home_team_display: 'Suns',
      away_team_display: 'Clippers',
    },
    odds: [
      {
        id: 'odd9',
        market: 'Point Spread',
        selection: 'Suns -2.0',
        price: -106,
        is_main: true,
        points: 2.0,
      },
      {
        id: 'odd10',
        market: 'Point Spread',
        selection: 'Clippers +2.0',
        price: 106,
        is_main: false,
        points: -2.0,
      }
    ]
  },

  // NFL Games
  {
    id: '6',
    sport: { id: 'nfl', name: 'NFL' },
    league: { id: 'nfl', name: 'NFL' },
    fixture: {
      home_team_display: 'Chiefs',
      away_team_display: 'Bills',
    },
    odds: [
      {
        id: 'odd11',
        market: 'Point Spread',
        selection: 'Chiefs -3.0',
        price: -110,
        is_main: true,
        points: 3.0,
      },
      {
        id: 'odd12',
        market: 'Point Spread',
        selection: 'Bills +3.0',
        price: 102,
        is_main: false,
        points: -3.0,
      }
    ]
  },
  {
    id: '7',
    sport: { id: 'nfl', name: 'NFL' },
    league: { id: 'nfl', name: 'NFL' },
    fixture: {
      home_team_display: 'Eagles',
      away_team_display: 'Cowboys',
    },
    odds: [
      {
        id: 'odd13',
        market: 'Point Spread',
        selection: 'Eagles -1.5',
        price: -105,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd14',
        market: 'Point Spread',
        selection: 'Cowboys +1.5',
        price: 107,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '8',
    sport: { id: 'nfl', name: 'NFL' },
    league: { id: 'nfl', name: 'NFL' },
    fixture: {
      home_team_display: '49ers',
      away_team_display: 'Rams',
    },
    odds: [
      {
        id: 'odd15',
        market: 'Point Spread',
        selection: '49ers -2.5',
        price: -108,
        is_main: true,
        points: 2.5,
      },
      {
        id: 'odd16',
        market: 'Point Spread',
        selection: 'Rams +2.5',
        price: 104,
        is_main: false,
        points: -2.5,
      }
    ]
  },
  {
    id: '9',
    sport: { id: 'nfl', name: 'NFL' },
    league: { id: 'nfl', name: 'NFL' },
    fixture: {
      home_team_display: 'Bengals',
      away_team_display: 'Ravens',
    },
    odds: [
      {
        id: 'odd17',
        market: 'Point Spread',
        selection: 'Bengals -1.0',
        price: -103,
        is_main: true,
        points: 1.0,
      },
      {
        id: 'odd18',
        market: 'Point Spread',
        selection: 'Ravens +1.0',
        price: 109,
        is_main: false,
        points: -1.0,
      }
    ]
  },
  {
    id: '10',
    sport: { id: 'nfl', name: 'NFL' },
    league: { id: 'nfl', name: 'NFL' },
    fixture: {
      home_team_display: 'Packers',
      away_team_display: 'Vikings',
    },
    odds: [
      {
        id: 'odd19',
        market: 'Point Spread',
        selection: 'Packers -2.0',
        price: -106,
        is_main: true,
        points: 2.0,
      },
      {
        id: 'odd20',
        market: 'Point Spread',
        selection: 'Vikings +2.0',
        price: 106,
        is_main: false,
        points: -2.0,
      }
    ]
  },

  // MLB Games
  {
    id: '11',
    sport: { id: 'mlb', name: 'MLB' },
    league: { id: 'mlb', name: 'MLB' },
    fixture: {
      home_team_display: 'Yankees',
      away_team_display: 'Red Sox',
    },
    odds: [
      {
        id: 'odd21',
        market: 'Run Line',
        selection: 'Yankees -1.5',
        price: -115,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd22',
        market: 'Run Line',
        selection: 'Red Sox +1.5',
        price: 97,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '12',
    sport: { id: 'mlb', name: 'MLB' },
    league: { id: 'mlb', name: 'MLB' },
    fixture: {
      home_team_display: 'Dodgers',
      away_team_display: 'Giants',
    },
    odds: [
      {
        id: 'odd23',
        market: 'Run Line',
        selection: 'Dodgers -1.5',
        price: -110,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd24',
        market: 'Run Line',
        selection: 'Giants +1.5',
        price: 102,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '13',
    sport: { id: 'mlb', name: 'MLB' },
    league: { id: 'mlb', name: 'MLB' },
    fixture: {
      home_team_display: 'Astros',
      away_team_display: 'Rangers',
    },
    odds: [
      {
        id: 'odd25',
        market: 'Run Line',
        selection: 'Astros -1.0',
        price: -105,
        is_main: true,
        points: 1.0,
      },
      {
        id: 'odd26',
        market: 'Run Line',
        selection: 'Rangers +1.0',
        price: 107,
        is_main: false,
        points: -1.0,
      }
    ]
  },
  {
    id: '14',
    sport: { id: 'mlb', name: 'MLB' },
    league: { id: 'mlb', name: 'MLB' },
    fixture: {
      home_team_display: 'Braves',
      away_team_display: 'Mets',
    },
    odds: [
      {
        id: 'odd27',
        market: 'Run Line',
        selection: 'Braves -1.5',
        price: -112,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd28',
        market: 'Run Line',
        selection: 'Mets +1.5',
        price: 100,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '15',
    sport: { id: 'mlb', name: 'MLB' },
    league: { id: 'mlb', name: 'MLB' },
    fixture: {
      home_team_display: 'Cubs',
      away_team_display: 'Cardinals',
    },
    odds: [
      {
        id: 'odd29',
        market: 'Run Line',
        selection: 'Cubs -1.0',
        price: -103,
        is_main: true,
        points: 1.0,
      },
      {
        id: 'odd30',
        market: 'Run Line',
        selection: 'Cardinals +1.0',
        price: 109,
        is_main: false,
        points: -1.0,
      }
    ]
  },

  // UFC Fights
  {
    id: '16',
    sport: { id: 'ufc', name: 'UFC' },
    league: { id: 'ufc', name: 'UFC' },
    fixture: {
      home_team_display: 'McGregor',
      away_team_display: 'Poirier',
    },
    odds: [
      {
        id: 'odd31',
        market: 'Moneyline',
        selection: 'McGregor',
        price: -150,
        is_main: true,
        points: 0,
      },
      {
        id: 'odd32',
        market: 'Moneyline',
        selection: 'Poirier',
        price: 130,
        is_main: false,
        points: 0,
      }
    ]
  },
  {
    id: '17',
    sport: { id: 'ufc', name: 'UFC' },
    league: { id: 'ufc', name: 'UFC' },
    fixture: {
      home_team_display: 'Adesanya',
      away_team_display: 'Whittaker',
    },
    odds: [
      {
        id: 'odd33',
        market: 'Moneyline',
        selection: 'Adesanya',
        price: -180,
        is_main: true,
        points: 0,
      },
      {
        id: 'odd34',
        market: 'Moneyline',
        selection: 'Whittaker',
        price: 160,
        is_main: false,
        points: 0,
      }
    ]
  },
  {
    id: '18',
    sport: { id: 'ufc', name: 'UFC' },
    league: { id: 'ufc', name: 'UFC' },
    fixture: {
      home_team_display: 'Usman',
      away_team_display: 'Edwards',
    },
    odds: [
      {
        id: 'odd35',
        market: 'Moneyline',
        selection: 'Usman',
        price: -200,
        is_main: true,
        points: 0,
      },
      {
        id: 'odd36',
        market: 'Moneyline',
        selection: 'Edwards',
        price: 170,
        is_main: false,
        points: 0,
      }
    ]
  },
  {
    id: '19',
    sport: { id: 'ufc', name: 'UFC' },
    league: { id: 'ufc', name: 'UFC' },
    fixture: {
      home_team_display: 'Volkanovski',
      away_team_display: 'Holloway',
    },
    odds: [
      {
        id: 'odd37',
        market: 'Moneyline',
        selection: 'Volkanovski',
        price: -140,
        is_main: true,
        points: 0,
      },
      {
        id: 'odd38',
        market: 'Moneyline',
        selection: 'Holloway',
        price: 120,
        is_main: false,
        points: 0,
      }
    ]
  },
  {
    id: '20',
    sport: { id: 'ufc', name: 'UFC' },
    league: { id: 'ufc', name: 'UFC' },
    fixture: {
      home_team_display: 'Ngannou',
      away_team_display: 'Gane',
    },
    odds: [
      {
        id: 'odd39',
        market: 'Moneyline',
        selection: 'Ngannou',
        price: -120,
        is_main: true,
        points: 0,
      },
      {
        id: 'odd40',
        market: 'Moneyline',
        selection: 'Gane',
        price: 100,
        is_main: false,
        points: 0,
      }
    ]
  },

  // NHL Games
  {
    id: '21',
    sport: { id: 'nhl', name: 'NHL' },
    league: { id: 'nhl', name: 'NHL' },
    fixture: {
      home_team_display: 'Lightning',
      away_team_display: 'Panthers',
    },
    odds: [
      {
        id: 'odd41',
        market: 'Puck Line',
        selection: 'Lightning -1.5',
        price: -110,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd42',
        market: 'Puck Line',
        selection: 'Panthers +1.5',
        price: 102,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '22',
    sport: { id: 'nhl', name: 'NHL' },
    league: { id: 'nhl', name: 'NHL' },
    fixture: {
      home_team_display: 'Avalanche',
      away_team_display: 'Golden Knights',
    },
    odds: [
      {
        id: 'odd43',
        market: 'Puck Line',
        selection: 'Avalanche -1.0',
        price: -105,
        is_main: true,
        points: 1.0,
      },
      {
        id: 'odd44',
        market: 'Puck Line',
        selection: 'Golden Knights +1.0',
        price: 107,
        is_main: false,
        points: -1.0,
      }
    ]
  },
  {
    id: '23',
    sport: { id: 'nhl', name: 'NHL' },
    league: { id: 'nhl', name: 'NHL' },
    fixture: {
      home_team_display: 'Maple Leafs',
      away_team_display: 'Bruins',
    },
    odds: [
      {
        id: 'odd45',
        market: 'Puck Line',
        selection: 'Maple Leafs -1.5',
        price: -112,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd46',
        market: 'Puck Line',
        selection: 'Bruins +1.5',
        price: 100,
        is_main: false,
        points: -1.5,
      }
    ]
  },
  {
    id: '24',
    sport: { id: 'nhl', name: 'NHL' },
    league: { id: 'nhl', name: 'NHL' },
    fixture: {
      home_team_display: 'Oilers',
      away_team_display: 'Flames',
    },
    odds: [
      {
        id: 'odd47',
        market: 'Puck Line',
        selection: 'Oilers -1.0',
        price: -103,
        is_main: true,
        points: 1.0,
      },
      {
        id: 'odd48',
        market: 'Puck Line',
        selection: 'Flames +1.0',
        price: 109,
        is_main: false,
        points: -1.0,
      }
    ]
  },
  {
    id: '25',
    sport: { id: 'nhl', name: 'NHL' },
    league: { id: 'nhl', name: 'NHL' },
    fixture: {
      home_team_display: 'Rangers',
      away_team_display: 'Islanders',
    },
    odds: [
      {
        id: 'odd49',
        market: 'Puck Line',
        selection: 'Rangers -1.5',
        price: -108,
        is_main: true,
        points: 1.5,
      },
      {
        id: 'odd50',
        market: 'Puck Line',
        selection: 'Islanders +1.5',
        price: 104,
        is_main: false,
        points: -1.5,
      }
    ]
  },
];