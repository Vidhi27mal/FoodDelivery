import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';

const PRIMARY_RED = '#DC3026';
const LIGHT_RED = '#FFF0EF';

const Home = ({ navigation }) => {
  const foodCategories = [
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Burger' },
    { emoji: '🍜', name: 'Noodles' },
    { emoji: '🍰', name: 'Dessert' },
  ];

  const popularFoods = [
    {
      emoji: '🍔',
      name: 'Classic Burger',
      description: 'Juicy burger with fresh veggies',
      price: '₹149',
      rating: '⭐ 4.8',
    },
    {
      emoji: '🍕',
      name: 'Cheese Pizza',
      description: 'Loaded with mozzarella cheese',
      price: '₹249',
      rating: '⭐ 4.9',
    },
    {
      emoji: '🍝',
      name: 'Creamy Pasta',
      description: 'Creamy sauce with Italian herbs',
      price: '₹199',
      rating: '⭐ 4.7',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              if (navigation.openDrawer) {
                navigation.openDrawer();
              } else {
                console.log('Drawer navigation is not connected yet');
              }
            }}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>DELIVER TO</Text>
            <Text style={styles.locationText}>
              📍 Your Location⌄
            </Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hungry?</Text>
          <Text style={styles.welcomeSubtitle}>
            Delicious food is just a tap away!
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search for food or restaurants"
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />
        </View>

        {/* Offer Banner */}
        <View style={styles.offerBanner}>
          <View style={styles.offerTextContainer}>
            <Text style={styles.offerTag}>SPECIAL OFFER</Text>

            <Text style={styles.offerTitle}>
              Delicious Food,{'\n'}Delivered Fast!
            </Text>

            <Text style={styles.offerSubtitle}>
              Get 30% OFF on your first order
            </Text>
          </View>

          <Text style={styles.offerEmoji}>🍔</Text>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          {foodCategories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryItem}
            >
              <View style={styles.categoryCircle}>
                <Text style={styles.categoryEmoji}>
                  {category.emoji}
                </Text>
              </View>

              <Text style={styles.categoryName}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Foods */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Now 🔥</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {popularFoods.map((food) => (
          <TouchableOpacity
            key={food.name}
            style={styles.foodCard}
            activeOpacity={0.8}
          >
            <View style={styles.foodImage}>
              <Text style={styles.foodEmoji}>{food.emoji}</Text>
            </View>

            <View style={styles.foodDetails}>
              <Text style={styles.foodName}>{food.name}</Text>

              <Text style={styles.foodDescription}>
                {food.description}
              </Text>

              <View style={styles.foodBottomRow}>
                <Text style={styles.foodPrice}>{food.price}</Text>
                <Text style={styles.foodRating}>{food.rating}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },

  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    fontSize: 27,
    color: '#222222',
  },

  locationContainer: {
    flex: 1,
    marginLeft: 12,
  },

  locationLabel: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '700',
    letterSpacing: 1,
  },

  locationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
    marginTop: 4,
  },

  profileButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: LIGHT_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileIcon: {
    fontSize: 22,
  },

  // Welcome
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 18,
  },

  welcomeTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#202020',
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginTop: 22,
    paddingHorizontal: 15,
    height: 52,
    borderRadius: 14,
  },

  searchIcon: {
    fontSize: 18,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: '#222222',
  },

  // Offer Banner
  offerBanner: {
    backgroundColor: PRIMARY_RED,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 20,
    minHeight: 165,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  offerTextContainer: {
    flex: 1,
  },

  offerTag: {
    color: '#FFE8E6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  offerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
    lineHeight: 28,
  },

  offerSubtitle: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 8,
  },

  offerEmoji: {
    fontSize: 65,
    marginLeft: 5,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY_RED,
  },

  // Categories
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  categoryItem: {
    alignItems: 'center',
    width: '23%',
  },

  categoryCircle: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: LIGHT_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryEmoji: {
    fontSize: 30,
  },

  categoryName: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '600',
    marginTop: 9,
  },

  // Popular Food Cards
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 12,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  foodImage: {
    width: 85,
    height: 85,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  foodEmoji: {
    fontSize: 42,
  },

  foodDetails: {
    flex: 1,
    marginLeft: 12,
  },

  foodName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  foodDescription: {
    fontSize: 11,
    color: '#888888',
    marginTop: 5,
  },

  foodBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  foodPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: PRIMARY_RED,
  },

  foodRating: {
    fontSize: 11,
    color: '#555555',
  },

  addButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: PRIMARY_RED,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '600',
    lineHeight: 26,
  },

  bottomSpace: {
    height: 25,
  },
});

export default Home;