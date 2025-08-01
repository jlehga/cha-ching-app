import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

// Test Users Data
const testUsers = [
  {
    uid: 'user1',
    username: 'bettingPro',
    email: 'pro@chaching.com',
    displayName: 'Betting Pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bettingPro',
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
    totalBets: 156,
    winRate: 0.68,
    favoriteSports: ['NBA', 'NFL'],
    isOnline: true
  },
  {
    uid: 'user2',
    username: 'sportsFan',
    email: 'fan@chaching.com',
    displayName: 'Sports Fan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportsFan',
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
    totalBets: 89,
    winRate: 0.52,
    favoriteSports: ['MLB', 'NBA'],
    isOnline: true
  },
  {
    uid: 'user3',
    username: 'luckyGambler',
    email: 'lucky@chaching.com',
    displayName: 'Lucky Gambler',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luckyGambler',
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
    totalBets: 234,
    winRate: 0.71,
    favoriteSports: ['NFL', 'UFC'],
    isOnline: false
  }
];

// Test Chat Rooms Data
const testChatRooms = [
  {
    roomId: 'lakers_warriors_20240115',
    gameId: 'game1',
    sport: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    gameTime: Timestamp.fromDate(new Date('2024-01-15T19:30:00Z')),
    status: 'live',
    currentScore: {
      home: 105,
      away: 98
    },
    quarter: '4th',
    timeRemaining: '2:45',
    activeUsers: 47,
    createdAt: serverTimestamp(),
    lastMessageAt: serverTimestamp(),
    isActive: true
  },
  {
    roomId: 'celtics_heat_20240115',
    gameId: 'game2',
    sport: 'NBA',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    gameTime: Timestamp.fromDate(new Date('2024-01-15T20:00:00Z')),
    status: 'upcoming',
    currentScore: {
      home: 0,
      away: 0
    },
    quarter: 'Pre-game',
    timeRemaining: '30:00',
    activeUsers: 12,
    createdAt: serverTimestamp(),
    lastMessageAt: serverTimestamp(),
    isActive: true
  },
  {
    roomId: 'chiefs_raiders_20240115',
    gameId: 'game3',
    sport: 'NFL',
    homeTeam: 'Chiefs',
    awayTeam: 'Raiders',
    gameTime: Timestamp.fromDate(new Date('2024-01-15T18:00:00Z')),
    status: 'final',
    currentScore: {
      home: 28,
      away: 14
    },
    quarter: 'Final',
    timeRemaining: '0:00',
    activeUsers: 23,
    createdAt: serverTimestamp(),
    lastMessageAt: serverTimestamp(),
    isActive: false
  }
];

// Test Messages Data
const testMessages = [
  {
    roomId: 'lakers_warriors_20240115',
    userId: 'user1',
    username: 'bettingPro',
    displayName: 'Betting Pro',
    message: 'Lakers looking strong in the 4th! 💪',
    timestamp: serverTimestamp(),
    type: 'text'
  },
  {
    roomId: 'lakers_warriors_20240115',
    userId: 'user2',
    username: 'sportsFan',
    displayName: 'Sports Fan',
    message: 'Warriors need to step up their defense',
    timestamp: serverTimestamp(),
    type: 'text'
  },
  {
    roomId: 'lakers_warriors_20240115',
    userId: 'user3',
    username: 'luckyGambler',
    displayName: 'Lucky Gambler',
    message: 'This game is going down to the wire! 🏀',
    timestamp: serverTimestamp(),
    type: 'text'
  },
  {
    roomId: 'chiefs_raiders_20240115',
    userId: 'user1',
    username: 'bettingPro',
    displayName: 'Betting Pro',
    message: 'Chiefs dominated that game! 🏈',
    timestamp: serverTimestamp(),
    type: 'text'
  },
  {
    roomId: 'chiefs_raiders_20240115',
    userId: 'user2',
    username: 'sportsFan',
    displayName: 'Sports Fan',
    message: 'Mahomes was unstoppable tonight',
    timestamp: serverTimestamp(),
    type: 'text'
  }
];

// Setup function
export const setupFirestore = async () => {
  try {
    console.log('🚀 Setting up Firestore collections...');

    // Create Users
    console.log('Creating users...');
    for (const user of testUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
      console.log(`✅ Created user: ${user.username}`);
    }

    // Create Chat Rooms
    console.log('Creating chat rooms...');
    for (const room of testChatRooms) {
      await setDoc(doc(db, 'chatRooms', room.roomId), room);
      console.log(`✅ Created chat room: ${room.homeTeam} vs ${room.awayTeam}`);
    }

    // Create Messages
    console.log('Creating messages...');
    for (const message of testMessages) {
      await addDoc(collection(db, 'messages'), message);
      console.log(`✅ Created message in ${message.roomId}`);
    }

    console.log('🎉 Firestore setup complete!');
    console.log('📊 Created:');
    console.log(`   - ${testUsers.length} users`);
    console.log(`   - ${testChatRooms.length} chat rooms`);
    console.log(`   - ${testMessages.length} messages`);

  } catch (error) {
    console.error('❌ Error setting up Firestore:', error);
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupFirestore();
} 