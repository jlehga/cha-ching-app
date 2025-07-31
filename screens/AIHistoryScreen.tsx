import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBetHistory } from '../contexts/BetHistoryContext';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import ExpandableBetCard from '../components/ExpandableBetCard';
import { useBetMode } from '../contexts/BetModeContext';

type MainTab = 'open' | 'settled';
type SubTab = 'matched' | 'unmatched';

type BetStatus = 'matched' | 'unmatched' | 'open' | 'settled';

// Filter Modal component
const FilterModal = ({
  visible,
  tempDateRange,
  tempSortBy,
  tempDirection,
  onClose,
  onDatePickerOpen,
  onSortBySelect,
  onDirectionSelect,
  onApply,
  datePickerVisible,
  datePickerType,
  onDatePickerClose,
  onDateChange
}: {
  visible: boolean;
  tempDateRange: { start: string; end: string };
  tempSortBy: string;
  tempDirection: string;
  onClose: () => void;
  onDatePickerOpen: (type: 'start' | 'end') => void;
  onSortBySelect: (option: string) => void;
  onDirectionSelect: (option: string) => void;
  onApply: () => void;
  datePickerVisible: boolean;
  datePickerType: 'start' | 'end';
  onDatePickerClose: () => void;
  onDateChange: (event: any, date?: Date) => void;
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

export default function BetHistoryScreen() {
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

  const getFilteredBets = () => {
    // Filter out split bets from the main list (they'll be shown in expandable cards)
    const originalBets = bets.filter(bet => !bet.isSplitBet);

    if (activeMainTab === 'open') {
      return originalBets.filter(bet => bet.status === activeSubTab);
    } else {
      return originalBets.filter(bet => bet.status === 'settled');
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
          console.log('Bet pressed:', item.id);
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
    console.log('handleSortBySelect called with:', option);
    setTempSortBy(option.toLowerCase());
  };

  const handleDirectionSelect = (option: string) => {
    console.log('handleDirectionSelect called with:', option);
    setTempDirection(option === 'Newest First' ? 'desc' : 'asc');
  };

  const handleApplyFilters = () => {
    console.log('handleApplyFilters called');
    setSortBy(tempSortBy);
    setDirection(tempDirection);
    setDateRange(tempDateRange);
    setFilterModalVisible(false);
    console.log('Filters applied, modal closed');
  };

  const handleOpenFilterModal = () => {
    console.log('handleOpenFilterModal called');
    console.log('Current sortBy:', sortBy, 'direction:', direction, 'dateRange:', dateRange);
    setTempSortBy(sortBy);
    setTempDirection(direction);
    setTempDateRange(dateRange);
    setFilterModalVisible(true);
    console.log('Filter modal opened');
  };

  const handleCloseFilterModal = () => {
    console.log('handleCloseFilterModal called');
    setFilterModalVisible(false);
  };

  const filteredBets = getFilteredBets();

  // Debug state values
  console.log('Current state - filterModalVisible:', filterModalVisible, 'datePickerVisible:', datePickerVisible, 'datePickerType:', datePickerType);

  return (
    <>
      <Layout>
        <View style={[styles.container, GlobalStyles.screenContent]}>
          <Text style={GlobalStyles.title}>Bet History</Text>

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
            onClose={handleCloseFilterModal}
            onDatePickerOpen={handleDatePickerOpen}
            onSortBySelect={handleSortBySelect}
            onDirectionSelect={handleDirectionSelect}
            onApply={handleApplyFilters}
            datePickerVisible={datePickerVisible}
            datePickerType={datePickerType}
            onDatePickerClose={handleDatePickerClose}
            onDateChange={handleDateChange}
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
});