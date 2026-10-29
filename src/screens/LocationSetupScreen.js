import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#D92D20',
  background: '#FFFFFF',
  text: '#171717',
  secondaryText: '#666666',
  placeholder: '#929292',
  inputBackground: '#F1F1F1',
  border: '#D6D6D6',
  iconBackground: '#F1F1F1',
  white: '#FFFFFF',
};

const INITIAL_ADDRESSES = [
  {
    id: 'home',
    label: 'Home',
    address: '123 Main Street, Stony Plain',
    icon: 'home',
  },
  {
    id: 'work',
    label: 'Work',
    address: '456 Example Ave, Spruce Grove',
    icon: 'briefcase',
  },
  {
    id: 'hotel',
    label: 'Hotel',
    address: 'Add Hotel Address',
    icon: 'business',
    isPlaceholder: true,
  },
  {
    id: 'other',
    label: 'Other',
    address: 'Enter delivery address',
    icon: 'location-sharp',
    isPlaceholder: true,
  },
];

const LocationSetupScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedId, setSelectedId] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

  const filteredAddresses = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return addresses;
    }

    return addresses.filter(item => {
      return (
        item.label.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query)
      );
    });
  }, [addresses, searchText]);

  const handleSelectAddress = item => {
    setSelectedId(item.id);

    if (item.id === 'other' || item.id === 'hotel') {
      setShowManualEntry(true);

      if (item.id === 'hotel' && item.isPlaceholder) {
        setManualAddress('');
      }
    } else {
      setShowManualEntry(false);
    }
  };

  const handleConfirmLocation = () => {
    const selectedAddress = addresses.find(
      item => item.id === selectedId,
    );

    if (!selectedAddress) {
      Alert.alert('Select Location', 'Please select a delivery location.');
      return;
    }

    let finalAddress = selectedAddress.address;

    if (
      selectedAddress.id === 'other' ||
      selectedAddress.id === 'hotel'
    ) {
      if (!manualAddress.trim()) {
        Alert.alert(
          'Address Required',
          'Please enter your delivery address.',
        );
        return;
      }

      finalAddress = manualAddress.trim();

      setAddresses(previous =>
        previous.map(item =>
          item.id === selectedAddress.id
            ? {
                ...item,
                address: finalAddress,
                isPlaceholder: false,
              }
            : item,
        ),
      );
    }

    const location = {
      id: selectedAddress.id,
      label: selectedAddress.label,
      address: finalAddress,
    };

    // Keep the selected location available to the next screen.
    // This screen does not call a backend API.
    if (route?.params?.onLocationSelected) {
      route.params.onLocationSelected(location);
    }

    // Update "Home" below if your actual home screen uses another route name.
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainDrawer',
          params: { selectedLocation: location },
        },
      ],
    });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Location Setup',
        'There is no previous screen to return to.',
      );
    }
  };

  const renderAddress = item => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.addressRow}
        activeOpacity={0.7}
        onPress={() => handleSelectAddress(item)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={`${item.label}, ${item.address}`}
      >
        <View style={styles.addressIcon}>
          <Ionicons
            name={item.icon}
            size={24}
            color={COLORS.text}
          />
        </View>

        <View style={styles.addressInfo}>
          <Text style={styles.addressLabel}>{item.label}</Text>
          <Text
            style={styles.addressText}
            numberOfLines={2}
          >
            {item.address}
          </Text>
        </View>

        <View
          style={[
            styles.radioOuter,
            isSelected && styles.radioOuterSelected,
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        backgroundColor={COLORS.background}
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={COLORS.text}
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Deliver to</Text>
            <Text style={styles.headerSubtitle}>
              Where are you delivering?
            </Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={24}
              color="#AAAAAA"
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search area, street or landmark"
              placeholderTextColor={COLORS.placeholder}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              accessibilityLabel="Search delivery address"
            />

            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText('')}
                accessibilityLabel="Clear search"
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={COLORS.placeholder}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Address List */}
          <View style={styles.addressList}>
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map(renderAddress)
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No matching saved addresses.
                </Text>
                <Text style={styles.emptySubText}>
                  Select Other to enter a new address.
                </Text>

                <TouchableOpacity
                  style={styles.addAddressButton}
                  onPress={() => {
                    setSelectedId('other');
                    setShowManualEntry(true);
                    setManualAddress(searchText.trim());
                  }}
                >
                  <Text style={styles.addAddressButtonText}>
                    Enter this address
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Manual Address Entry */}
          {showManualEntry && (
            <View style={styles.manualEntryContainer}>
              <Text style={styles.manualEntryLabel}>
                {selectedId === 'hotel'
                  ? 'Enter hotel address'
                  : 'Enter delivery address'}
              </Text>

              <TextInput
                style={styles.manualAddressInput}
                placeholder="Street, area, city, postal code"
                placeholderTextColor={COLORS.placeholder}
                value={manualAddress}
                onChangeText={setManualAddress}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                accessibilityLabel="Enter delivery address"
              />
            </View>
          )}
        </ScrollView>

        {/* Bottom Confirm Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmLocation}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Confirm Location"
          >
            <Text style={styles.confirmButtonText}>
              Confirm Location
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 22,
  },

  backButton: {
    width: 32,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 10,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  headerSubtitle: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },

  searchContainer: {
    minHeight: 46,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    minHeight: 46,
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 12,
    paddingVertical: 8,
  },

  addressList: {
    width: '100%',
  },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    paddingVertical: 10,
  },

  addressIcon: {
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: COLORS.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  addressInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },

  addressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 5,
  },

  addressText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 17,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#B8B8B8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterSelected: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },

  emptySubText: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 8,
  },

  addAddressButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginTop: 16,
  },

  addAddressButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },

  manualEntryContainer: {
    marginTop: 14,
    marginBottom: 10,
  },

  manualEntryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },

  manualAddressInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  bottomContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },

  confirmButton: {
    minHeight: 51,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LocationSetupScreen;
