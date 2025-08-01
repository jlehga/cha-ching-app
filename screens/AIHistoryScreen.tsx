import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBetHistory } from '../contexts/BetHistoryContext';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import ExpandableBetCard from '../components/ExpandableBetCard';
import AIAnalysisModal from '../components/AIAnalysisModal';
import { useBetMode } from '../contexts/BetModeContext';
import { useUser } from '../contexts/UserContext';
import { MOCK_BET_HISTORY, MOCK_AI_ANALYSIS, DEFAULT_AI_PREFERENCES, AIPreferences } from '../data/mock_bet_history';
import { analyzeBettingHistory } from '../utils/aiAnalysis';

type MainTab = 'open' | 'settled';
type SubTab = 'matched' | 'unmatched';

type BetStatus = 'matched' | 'unmatched' | 'open' | 'settled';

// Filter Modal component
const FilterModal = ({
  visible,
  tempDateRange,
  tempSortBy,
  tempDirection,
  tempSelectedSport,
  tempSelectedResult,
  onClose,
  onDatePickerOpen,
  onSortBySelect,
  onDirectionSelect,
  onSportSelect,
  onResultSelect,
  onApply,
  datePickerVisible,
  datePickerType,
  onDatePickerClose,
  onDateChange,
  activeMainTab
}: {
  visible: boolean;
  tempDateRange: { start: string; end: string };
  tempSortBy: string;
  tempDirection: string;
  tempSelectedSport: string;
  tempSelectedResult: string;
  onClose: () => void;
  onDatePickerOpen: (type: 'start' | 'end') => void;
  onSortBySelect: (option: string) => void;
  onDirectionSelect: (option: string) => void;
  onSportSelect: (sport: string) => void;
  onResultSelect: (result: string) => void;
  onApply: () => void;
  datePickerVisible: boolean;
  datePickerType: 'start' | 'end';
  onDatePickerClose: () => void;
  onDateChange: (event: any, date?: Date) => void;
  activeMainTab: MainTab;
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.filterModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Plays</Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterContent}>
            <Text style={styles.filterLabel}>Date Range</Text>
            <View style={styles.dateInputs}>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => onDatePickerOpen('start')}
              >
                <Text style={[styles.dateInputText, tempDateRange.start && styles.dateInputTextActive]}>
                  {tempDateRange.start || 'Start Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => onDatePickerOpen('end')}
              >
                <Text style={[styles.dateInputText, tempDateRange.end && styles.dateInputTextActive]}>
                  {tempDateRange.end || 'End Date'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.sortOptions}>
              {['Date', 'Amount', 'Sport', 'Status'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortOption, tempSortBy === option.toLowerCase() && styles.sortOptionActive]}
                  onPress={() => onSortBySelect(option)}
                >
                  <Text style={[styles.sortOptionText, tempSortBy === option.toLowerCase() && styles.sortOptionTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Direction</Text>
            <View style={styles.directionOptions}>
              {['Newest First', 'Oldest First'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.directionOption, tempDirection === (option === 'Newest First' ? 'desc' : 'asc') && styles.directionOptionActive]}
                  onPress={() => onDirectionSelect(option)}
                >
                  <Text style={[styles.directionOptionText, tempDirection === (option === 'Newest First' ? 'desc' : 'asc') && styles.directionOptionTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Sport</Text>
            <View style={styles.sortOptions}>
              {['All Sports', 'NBA', 'NFL', 'MLB', 'NHL', 'Soccer'].map(sport => (
                <TouchableOpacity
                  key={sport}
                  style={[styles.sortOption, tempSelectedSport === (sport === 'All Sports' ? '' : sport) && styles.sortOptionActive]}
                  onPress={() => onSportSelect(sport === 'All Sports' ? '' : sport)}
                >
                  <Text style={[styles.sortOptionText, tempSelectedSport === (sport === 'All Sports' ? '' : sport) && styles.sortOptionTextActive]}>
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {activeMainTab === 'settled' && (
              <>
                <Text style={styles.filterLabel}>Result</Text>
                <View style={styles.sortOptions}>
                  {['All Results', 'Win', 'Lose'].map(result => (
                    <TouchableOpacity
                      key={result}
                      style={[styles.sortOption, tempSelectedResult === (result === 'All Results' ? '' : result.toLowerCase()) && styles.sortOptionActive]}
                      onPress={() => onResultSelect(result === 'All Results' ? '' : result.toLowerCase())}
                    >
                      <Text style={[styles.sortOptionText, tempSelectedResult === (result === 'All Results' ? '' : result.toLowerCase()) && styles.sortOptionTextActive]}>
                        {result}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={onApply}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>

          {/* Date picker integrated within the filter modal */}
          {datePickerVisible && (
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <Text style={styles.datePickerTitle}>
                  Select {datePickerType === 'start' ? 'Start' : 'End'} Date
                </Text>
                <TouchableOpacity
                  style={styles.closeButtonContainer}
                  onPress={onDatePickerClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                style={Platform.OS === 'ios' ? styles.iosDatePicker : styles.androidDatePicker}
                textColor="#39FF14"
                accentColor="#39FF14"
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default function BetHistoryScreen({ navigation }) {
  const { user } = useUser();
  const { bets, getBetWithSplits } = useBetHistory();
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('open');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('matched');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerType, setDatePickerType] = useState<'start' | 'end'>('start');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date');
  const [direction, setDirection] = useState('desc');
  const [tempSortBy, setTempSortBy] = useState('date');
  const [tempDirection, setTempDirection] = useState('desc');
  const [tempDateRange, setTempDateRange] = useState({ start: '', end: '' });
  
  // Additional filter states
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [tempSelectedSport, setTempSelectedSport] = useState('');
  const [tempSelectedResult, setTempSelectedResult] = useState('');
  
  // AI Analysis state
  const [aiAnalysisVisible, setAiAnalysisVisible] = useState(false);
  const [aiPreferences, setAiPreferences] = useState<AIPreferences>(DEFAULT_AI_PREFERENCES);
  const [aiAnalysis, setAiAnalysis] = useState(MOCK_AI_ANALYSIS);

  // Authentication guard
  if (!user) {
    return (
      <Layout navigation={navigation}>
        <View style={[GlobalStyles.screenContent, styles.authGuardContainer]}>
          <Text style={styles.authGuardTitle}>Sign In Required</Text>
          <Text style={styles.authGuardText}>
            Please sign in to view your betting history and AI analysis.
          </Text>
        </View>
      </Layout>
    );
  }

  const getFilteredBets = () => {
    // Combine mock data with real bet context data
    const mockBets = MOCK_BET_HISTORY.map(bet => ({
      ...bet,
      // Add missing fields to match context bet structure
      matchedAmount: bet.status === 'matched' ? bet.amount : 0,
      remainingAmount: bet.status === 'matched' ? 0 : bet.amount,
      isSplitBet: false,
      splitBets: undefined,
      originalBetId: undefined,
      totalOriginalAmount: bet.amount
    }));
    
    // Convert context bets to match our data structure
    const contextBets = bets.map(bet => ({
      id: bet.id,
      sport: bet.sport,
      event: bet.event,
      market: bet.market,
      selection: bet.selection,
      odds: bet.odds,
      amount: bet.amount,
      timestamp: bet.timestamp,
      status: bet.status,
      result: bet.result || 'pending',
      matchedAt: bet.matchedAt,
      settledAt: bet.settledAt,
      profit: bet.result === 'win' ? bet.amount * (bet.odds > 0 ? bet.odds / 100 : 1) : bet.result === 'lose' ? -bet.amount : 0,
      roi: bet.result === 'win' ? (bet.odds > 0 ? bet.odds / 100 : 1) : bet.result === 'lose' ? -1 : 0,
      confidence: 0.7, // Default confidence for context bets
      betType: 'spread', // Default bet type
      timeOfDay: 'evening', // Default time
      dayOfWeek: 'sunday', // Default day
      matchedAmount: bet.matchedAmount || 0,
      remainingAmount: bet.remainingAmount || bet.amount,
      isSplitBet: bet.isSplitBet || false,
      splitBets: bet.splitBets,
      originalBetId: bet.originalBetId,
      totalOriginalAmount: bet.totalOriginalAmount || bet.amount
    }));
    
    // Combine both datasets, prioritizing context bets (newer)
    let allBets = [...contextBets, ...mockBets];
    
    // Apply date range filter if set
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      allBets = allBets.filter(bet => {
        const betDate = new Date(bet.timestamp);
        return betDate >= startDate && betDate <= endDate;
      });
    }
    
    // Apply sport filter if set
    if (selectedSport) {
      allBets = allBets.filter(bet => bet.sport === selectedSport);
    }
    
    // Apply result filter if set (for settled bets)
    if (selectedResult && activeMainTab === 'settled') {
      allBets = allBets.filter(bet => bet.result === selectedResult);
    }
    
    // Apply sorting
    allBets.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = b.timestamp - a.timestamp;
          break;
        case 'amount':
          comparison = b.amount - a.amount;
          break;
        case 'sport':
          comparison = a.sport.localeCompare(b.sport);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = b.timestamp - a.timestamp;
      }
      
      return direction === 'desc' ? comparison : -comparison;
    });
    
    // Filter by main tab
    if (activeMainTab === 'open') {
      return allBets.filter(bet => bet.status === activeSubTab || bet.status === 'matched');
    } else {
      return allBets.filter(bet => bet.status === 'settled');
    }
  };

  const renderBetItem = ({ item }: { item: any }) => {
    const splitBets = item.splitBets ?
      bets.filter(bet => item.splitBets?.includes(bet.id)) :
      [];

    return (
      <ExpandableBetCard
        bet={item}
        splitBets={splitBets}
        onPress={() => {
          // Could open a detailed bet view here
        }}
      />
    );
  };

  const handleDatePickerOpen = (type: 'start' | 'end') => {
    setDatePickerType(type);
    setDatePickerVisible(true);
  };

  const handleDatePickerClose = () => {
    setDatePickerVisible(false);
  };

  const handleDateChange = (event: any, date?: Date) => {
    // Always close the picker first
    setDatePickerVisible(false);
    
    // Handle the date selection
    if (event.type === 'set' && date) {
      const dateString = date.toLocaleDateString();
      if (datePickerType === 'start') {
        setTempDateRange(prev => ({ ...prev, start: dateString }));
      } else {
        setTempDateRange(prev => ({ ...prev, end: dateString }));
      }
    }
    // If event.type === 'dismissed', user cancelled, just close the picker
  };

  const handleSortBySelect = (option: string) => {
    setTempSortBy(option.toLowerCase());
  };

  const handleDirectionSelect = (option: string) => {
    setTempDirection(option === 'Newest First' ? 'desc' : 'asc');
  };

  const handleSportSelect = (sport: string) => {
    setTempSelectedSport(tempSelectedSport === sport ? '' : sport);
  };

  const handleResultSelect = (result: string) => {
    setTempSelectedResult(tempSelectedResult === result ? '' : result);
  };

  const handleApplyFilters = () => {
    setSortBy(tempSortBy);
    setDirection(tempDirection);
    setDateRange(tempDateRange);
    setSelectedSport(tempSelectedSport);
    setSelectedResult(tempSelectedResult);
    setFilterModalVisible(false);
  };

  const handleOpenFilterModal = () => {
    setTempSortBy(sortBy);
    setTempDirection(direction);
    setTempDateRange(dateRange);
    setTempSelectedSport(selectedSport);
    setTempSelectedResult(selectedResult);
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const filteredBets = getFilteredBets();



  return (
    <>
      <Layout navigation={navigation}>
        <View style={[styles.container, GlobalStyles.screenContent]}>
          <View style={styles.headerContainer}>
            <Text style={GlobalStyles.title}>Bet History</Text>
            <TouchableOpacity
              style={styles.aiAnalysisButton}
              onPress={async () => {
                // Generate real analysis based on current bet history (combined data)
                const combinedBets = getFilteredBets();
                const realAnalysis = await analyzeBettingHistory(combinedBets, aiPreferences);
                setAiAnalysis(realAnalysis);
                setAiAnalysisVisible(true);
              }}
            >
              <Text style={styles.aiAnalysisButtonText}>🤖 AI Analysis</Text>
            </TouchableOpacity>
          </View>

          {/* Main Tabs */}
          <View style={styles.mainTabContainer}>
            <TouchableOpacity
              style={[styles.mainTab, activeMainTab === 'open' && styles.activeMainTab]}
              onPress={() => setActiveMainTab('open')}
            >
              <Text style={[styles.mainTabText, activeMainTab === 'open' && styles.activeMainTabText]}>
                Open
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainTab, activeMainTab === 'settled' && styles.activeMainTab]}
              onPress={() => setActiveMainTab('settled')}
            >
              <Text style={[styles.mainTabText, activeMainTab === 'settled' && styles.activeMainTabText]}>
                Recently Settled
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sub Tabs for Open */}
          {activeMainTab === 'open' && (
            <View style={styles.subTabContainer}>
              <View style={styles.subTabs}>
                <TouchableOpacity
                  style={[styles.subTab, activeSubTab === 'matched' && styles.activeSubTab]}
                  onPress={() => setActiveSubTab('matched')}
                >
                  <Text style={[styles.subTabText, activeSubTab === 'matched' && styles.activeSubTabText]}>
                    Matched
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.subTab, activeSubTab === 'unmatched' && styles.activeSubTab]}
                  onPress={() => setActiveSubTab('unmatched')}
                >
                  <Text style={[styles.subTabText, activeSubTab === 'unmatched' && styles.activeSubTabText]}>
                    Unmatched
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleOpenFilterModal}
              >
                <Text style={styles.filterButtonText}>🔍 Filters</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Filter Button for Recently Settled */}
          {activeMainTab === 'settled' && (
            <View style={styles.subTabContainer}>
              <View style={styles.subTabs}>
                <View style={styles.subTab}>
                  <Text style={styles.subTabText}>All Settled</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleOpenFilterModal}
              >
                <Text style={styles.filterButtonText}>🔍 Filters</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={filteredBets}
            keyExtractor={(item) => item.id}
            renderItem={renderBetItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {activeMainTab === 'open'
                    ? `No ${activeSubTab} plays found. Place a bet on the Markets screen to see it here!`
                    : 'No settled plays found'
                  }
                </Text>
              </View>
            )}
          />

          <FilterModal 
            visible={filterModalVisible}
            tempDateRange={tempDateRange}
            tempSortBy={tempSortBy}
            tempDirection={tempDirection}
            tempSelectedSport={tempSelectedSport}
            tempSelectedResult={tempSelectedResult}
            onClose={handleCloseFilterModal}
            onDatePickerOpen={handleDatePickerOpen}
            onSortBySelect={handleSortBySelect}
            onDirectionSelect={handleDirectionSelect}
            onSportSelect={handleSportSelect}
            onResultSelect={handleResultSelect}
            onApply={handleApplyFilters}
            datePickerVisible={datePickerVisible}
            datePickerType={datePickerType}
            onDatePickerClose={handleDatePickerClose}
            onDateChange={handleDateChange}
            activeMainTab={activeMainTab}
          />

          <AIAnalysisModal
            visible={aiAnalysisVisible}
            onClose={() => setAiAnalysisVisible(false)}
            analysis={aiAnalysis}
            preferences={aiPreferences}
            onPreferencesChange={setAiPreferences}
          />
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiAnalysisButton: {
    backgroundColor: '#39FF14',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aiAnalysisButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 2,
  },
  mainTabs: {
    flexDirection: 'row',
    flex: 1,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  activeMainTab: {
    borderBottomColor: '#39FF14',
  },
  mainTabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeMainTabText: {
    color: '#39FF14',
  },
  filterButton: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: '#39FF14',
    borderWidth: 1,
    marginLeft: 16,
  },
  filterButtonText: {
    color: '#39FF14',
    fontWeight: '600',
  },
  subTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subTabs: {
    flexDirection: 'row',
    flex: 1,
  },
  subTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  activeSubTab: {
    borderBottomColor: '#39FF14',
  },
  subTabText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  activeSubTabText: {
    color: '#39FF14',
  },
  listContainer: {
    paddingBottom: 20,
  },
  betCard: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: '#39FF14',
    borderWidth: 1,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  marketText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  oddsText: {
    color: '#39FF14',
    fontSize: 14,
    marginBottom: 4,
  },
  amountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  resultText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  closeButton: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContent: {
    flex: 1,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  dateInputText: {
    color: '#888',
    textAlign: 'center',
  },
  dateInputTextActive: {
    color: '#39FF14',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sortOption: {
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  sortOptionActive: {
    backgroundColor: '#39FF14',
    borderColor: '#39FF14',
  },
  sortOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  sortOptionTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  directionOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  directionOption: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
  },
  directionOptionActive: {
    backgroundColor: '#39FF14',
    borderColor: '#39FF14',
  },
  directionOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  directionOptionTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#39FF14',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterModalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  datePickerContainer: {
    position: 'absolute',
    top: '20%',
    left: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 20,
    zIndex: 1001,
    elevation: 1001,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#39FF14',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iosDatePicker: {
    backgroundColor: '#000',
    color: '#39FF14',
  },
  androidDatePicker: {
    backgroundColor: '#000',
    color: '#39FF14',
  },
  authGuardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authGuardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authGuardText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});