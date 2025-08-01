import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { AIAnalysisData, AIPreferences, DEFAULT_AI_PREFERENCES } from '../data/mock_bet_history';

type AIAnalysisModalProps = {
  visible: boolean;
  onClose: () => void;
  analysis: AIAnalysisData;
  preferences: AIPreferences;
  onPreferencesChange: (preferences: AIPreferences) => void;
};

const AIAnalysisModal = ({ 
  visible, 
  onClose, 
  analysis, 
  preferences, 
  onPreferencesChange 
}: AIAnalysisModalProps) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'preferences' | 'recommendations'>('summary');
  const [tempPreferences, setTempPreferences] = useState<AIPreferences>(preferences);

  const handleSavePreferences = () => {
    onPreferencesChange(tempPreferences);
    onClose();
  };

  const renderSummaryTab = () => (
    <ScrollView style={styles.tabContent}>
      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{analysis.winRate * 100}%</Text>
          <Text style={styles.metricLabel}>Win Rate</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: analysis.totalProfit >= 0 ? '#39FF14' : '#FF4444' }]}>
            ${analysis.totalProfit.toFixed(2)}
          </Text>
          <Text style={styles.metricLabel}>Total Profit</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{analysis.averageROI.toFixed(2)}x</Text>
          <Text style={styles.metricLabel}>Avg ROI</Text>
        </View>
      </View>

      {/* Performance Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Breakdown</Text>
        
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Best Sport</Text>
          <View style={styles.breakdownValue}>
            <Text style={styles.breakdownText}>{analysis.bestSport.sport}</Text>
            <Text style={styles.breakdownSubtext}>
              {analysis.bestSport.winRate * 100}% win rate • ${analysis.bestSport.profit.toFixed(2)} profit
            </Text>
          </View>
        </View>

        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Best Bet Type</Text>
          <View style={styles.breakdownValue}>
            <Text style={styles.breakdownText}>{analysis.bestBetType.type}</Text>
            <Text style={styles.breakdownSubtext}>
              {analysis.bestBetType.winRate * 100}% win rate • ${analysis.bestBetType.profit.toFixed(2)} profit
            </Text>
          </View>
        </View>

        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Best Time</Text>
          <View style={styles.breakdownValue}>
            <Text style={styles.breakdownText}>{analysis.bestTimeOfDay.time}</Text>
            <Text style={styles.breakdownSubtext}>
              {analysis.bestTimeOfDay.winRate * 100}% win rate • ${analysis.bestTimeOfDay.profit.toFixed(2)} profit
            </Text>
          </View>
        </View>
      </View>

      {/* Risk Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Profile</Text>
        <View style={styles.riskProfileCard}>
          <Text style={styles.riskProfileText}>{analysis.riskProfile.toUpperCase()}</Text>
          <Text style={styles.riskProfileDescription}>
            Based on your betting patterns, you prefer moderate risk with consistent returns
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderPreferencesTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>AI Preferences</Text>
      
      {/* Risk Tolerance */}
      <View style={styles.preferenceSection}>
        <Text style={styles.preferenceLabel}>Risk Tolerance</Text>
        <View style={styles.optionGroup}>
          {(['conservative', 'moderate', 'aggressive'] as const).map(risk => (
            <TouchableOpacity
              key={risk}
              style={[
                styles.optionButton,
                tempPreferences.riskTolerance === risk && styles.optionButtonActive
              ]}
              onPress={() => setTempPreferences(prev => ({ ...prev, riskTolerance: risk }))}
            >
              <Text style={[
                styles.optionButtonText,
                tempPreferences.riskTolerance === risk && styles.optionButtonTextActive
              ]}>
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Max Bet Size */}
      <View style={styles.preferenceSection}>
        <Text style={styles.preferenceLabel}>Max Bet Size: ${tempPreferences.maxBetSize}</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              maxBetSize: Math.max(50, prev.maxBetSize - 25) 
            }))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.sliderTrack}>
            <View 
              style={[
                styles.sliderFill, 
                { width: `${(tempPreferences.maxBetSize / 500) * 100}%` }
              ]} 
            />
          </View>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              maxBetSize: Math.min(500, prev.maxBetSize + 25) 
            }))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Min Confidence */}
      <View style={styles.preferenceSection}>
        <Text style={styles.preferenceLabel}>Min Confidence: {Math.round(tempPreferences.minConfidence * 100)}%</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              minConfidence: Math.round((Math.max(0.5, prev.minConfidence - 0.05)) * 100) / 100
            }))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.sliderTrack}>
            <View 
              style={[
                styles.sliderFill, 
                { width: `${(tempPreferences.minConfidence - 0.5) / 0.5 * 100}%` }
              ]} 
            />
          </View>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              minConfidence: Math.round((Math.min(1.0, prev.minConfidence + 0.05)) * 100) / 100
            }))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Target ROI */}
      <View style={styles.preferenceSection}>
        <Text style={styles.preferenceLabel}>Target ROI: {Math.round(tempPreferences.targetROI * 100)}%</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              targetROI: Math.round((Math.max(0.5, prev.targetROI - 0.1)) * 100) / 100
            }))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.sliderTrack}>
            <View 
              style={[
                styles.sliderFill, 
                { width: `${(tempPreferences.targetROI - 0.5) / 1.5 * 100}%` }
              ]} 
            />
          </View>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => setTempPreferences(prev => ({ 
              ...prev, 
              targetROI: Math.round((Math.min(2.0, prev.targetROI + 0.1)) * 100) / 100
            }))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderRecommendationsTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>AI Recommendations</Text>
      
      {analysis.recommendations.map((recommendation, index) => (
        <View key={index} style={styles.recommendationCard}>
          <Text style={styles.recommendationText}>{recommendation}</Text>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Best Actions</Text>
        
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>🎯 Primary Strategy</Text>
          <Text style={styles.actionText}>
            Focus on NFL spread bets during Sunday evenings with bet sizes of $150-200
          </Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>⚡ Quick Wins</Text>
          <Text style={styles.actionText}>
            Look for NBA total bets with confidence above 75% and odds between -110 and -120
          </Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>🚫 Avoid</Text>
          <Text style={styles.actionText}>
            Soccer moneyline bets and MLB runline bets - your historical performance is poor
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🤖 AI Analysis</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {(['summary', 'preferences', 'recommendations'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === 'summary' && renderSummaryTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}
          {activeTab === 'recommendations' && renderRecommendationsTab()}

          {/* Action Buttons */}
          {activeTab === 'preferences' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
                <Text style={styles.saveButtonText}>Save Preferences</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  activeTab: {
    borderBottomColor: '#39FF14',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#39FF14',
  },
  tabContent: {
    padding: 20,
    maxHeight: 500,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  metricValue: {
    color: '#39FF14',
    fontSize: 20,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  breakdownLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  breakdownValue: {
    alignItems: 'flex-end',
  },
  breakdownText: {
    color: '#39FF14',
    fontSize: 14,
    fontWeight: '600',
  },
  breakdownSubtext: {
    color: '#666',
    fontSize: 12,
  },
  riskProfileCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
  },
  riskProfileText: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  riskProfileDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  preferenceSection: {
    marginBottom: 20,
  },
  preferenceLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  optionButtonActive: {
    backgroundColor: '#39FF14',
    borderColor: '#39FF14',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  optionButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderButton: {
    backgroundColor: '#39FF14',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#39FF14',
    borderRadius: 3,
  },
  recommendationCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendationText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  actionCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionTitle: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#39FF14',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIAnalysisModal; 