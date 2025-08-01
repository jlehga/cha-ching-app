import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { LiveGame } from '../data/mock_live_scores';

const { height: screenHeight } = Dimensions.get('window');

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  message: string;
  timestamp: Date;
  type: 'text';
}

interface ChatRoomModalProps {
  visible: boolean;
  onClose: () => void;
  game: LiveGame | null;
}

// Mock messages for testing
const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'bettingPro',
    displayName: 'Betting Pro',
    message: 'Lakers looking strong in the 4th! 💪',
    timestamp: new Date(Date.now() - 300000),
    type: 'text'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'sportsFan',
    displayName: 'Sports Fan',
    message: 'Warriors need to step up their defense',
    timestamp: new Date(Date.now() - 240000),
    type: 'text'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'luckyGambler',
    displayName: 'Lucky Gambler',
    message: 'This game is going down to the wire! 🏀',
    timestamp: new Date(Date.now() - 180000),
    type: 'text'
  },
];

const MessageBubble = ({ message, isOwnMessage }: { message: ChatMessage; isOwnMessage: boolean }) => (
  <View style={[styles.messageContainer, isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer]}>
    <Text style={[styles.username, isOwnMessage ? styles.ownUsername : styles.otherUsername]}>
      {message.displayName}
    </Text>
    <View style={[styles.messageBubble, isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble]}>
      <Text style={[styles.messageText, isOwnMessage ? styles.ownMessageText : styles.otherMessageText]}>
        {message.message}
      </Text>
    </View>
    <Text style={[styles.messageTime, isOwnMessage ? styles.ownMessageTime : styles.otherMessageTime]}>
      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Text>
  </View>
);

export default function ChatRoomModal({ visible, onClose, game }: ChatRoomModalProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // TODO: Future enhancement - AI-generated background images
  // Consider adding dynamic backgrounds based on:
  // - Team colors and logos
  // - Game atmosphere (live, final, upcoming)
  // - User preferences and themes
  // - Real-time game highlights or stats

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardWillShowListener?.remove();
      keyboardDidHideListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !game) return;

    setLoading(true);
    try {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: user.uid,
        username: user.username,
        displayName: user.displayName,
        message: newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [message, ...prev]);
      setNewMessage('');
      
      // TODO: Send message to Firebase
      // await addDoc(collection(db, 'messages'), {
      //   roomId: game.roomId,
      //   ...message,
      //   timestamp: serverTimestamp()
      // });
      
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isOwnMessage = item.userId === user?.uid;
    return <MessageBubble message={item} isOwnMessage={isOwnMessage} />;
  };

  if (!game) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>{game.homeTeam} vs {game.awayTeam}</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{game.homeScore}</Text>
              <Text style={styles.vsText}>vs</Text>
              <Text style={styles.scoreText}>{game.awayScore}</Text>
            </View>
            <Text style={styles.gameStatus}>
              {game.status === 'live' ? `${game.quarter} - ${game.timeRemaining}` : 
               game.status === 'upcoming' ? `Starts in ${game.timeRemaining}` : 
               `Final - ${game.gameTime}`}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        />

        {/* Message Input */}
        <View style={[styles.inputContainer, { bottom: keyboardHeight }]}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!newMessage.trim() || loading) && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!newMessage.trim() || loading}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreText: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vsText: {
    color: '#888',
    fontSize: 14,
    marginHorizontal: 8,
  },
  gameStatus: {
    color: '#888',
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    marginBottom: 80, // Account for input container height
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 100, // Extra padding at bottom for better spacing
  },
  messageContainer: {
    marginBottom: 20, // Increased spacing between messages
    alignItems: 'flex-start',
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  username: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  ownUsername: {
    color: '#39FF14',
    textAlign: 'right',
    marginRight: 8, // Outside the bubble on the right
  },
  otherUsername: {
    color: '#39FF14',
    textAlign: 'left',
    marginLeft: 8, // Outside the bubble on the left
  },
  messageBubble: {
    backgroundColor: '#222',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12, // Reduced from 14 to make less fat
    maxWidth: '80%',
  },
  ownMessageBubble: {
    backgroundColor: '#39FF14',
  },
  otherMessageBubble: {
    backgroundColor: '#222',
  },
  messageText: {
    color: '#fff',
    fontSize: 15, // Slightly larger text
    lineHeight: 20, // Better line spacing
  },
  ownMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#fff',
  },
  messageTime: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
  },
  ownMessageTime: {
    color: '#666',
    textAlign: 'right',
    marginRight: 8, // Outside the bubble on the right
  },
  otherMessageTime: {
    color: '#666',
    textAlign: 'left',
    marginLeft: 8, // Outside the bubble on the left
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 40, // Increased to lift higher
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#000',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  input: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 24, // More rounded for thicker appearance
    paddingHorizontal: 18, // Increased horizontal padding
    paddingVertical: 16, // Increased vertical padding for thickness
    marginRight: 12, // More space between input and button
    color: '#fff',
    fontSize: 15, // Slightly larger text
    maxHeight: 120, // Increased max height
    borderWidth: 1, // Added subtle border
    borderColor: '#333',
  },
  sendButton: {
    backgroundColor: '#39FF14',
    borderRadius: 24, // More rounded to match input
    paddingHorizontal: 20, // Increased horizontal padding
    paddingVertical: 16, // Increased vertical padding for thickness
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, // Ensure minimum width
  },
  sendButtonDisabled: {
    backgroundColor: '#666',
  },
  sendButtonText: {
    color: '#000',
    fontSize: 15, // Slightly larger text
    fontWeight: 'bold',
  },
}); 