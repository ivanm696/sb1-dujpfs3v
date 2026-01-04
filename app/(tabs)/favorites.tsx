import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FAVORITES } from '@/data/favorites';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [favorites, setFavorites] = useState(FAVORITES);
  
  // Calculate number of columns based on screen width
  const numColumns = width > 768 ? 3 : 2;
  const imageSize = (width - 16 * (numColumns + 1)) / numColumns;

  const handlePhotoPress = useCallback((id) => {
    router.push(`/photo/${id}`);
  }, []);

  const renderFavorite = useCallback(({ item, index }) => (
    <Animated.View entering={FadeIn.delay(index * 100)}>
      <TouchableOpacity 
        style={[styles.favoriteContainer, { width: imageSize }]}
        onPress={() => handlePhotoPress(item.id)}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: item.url }} 
          style={[styles.favoriteImage, { height: imageSize }]}
          resizeMode="cover"
        />
        <Text style={styles.favoriteTitle} numberOfLines={2}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  ), [imageSize, handlePhotoPress]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>Your favorite memories</Text>
      </View>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.favoritesGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart icon on photos to add them to your favorites
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#0A2463',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8D99AE',
  },
  favoritesGrid: {
    padding: 16,
  },
  favoriteContainer: {
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    overflow: 'hidden',
  },
  favoriteImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1D2029',
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#1D2029',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8D99AE',
    textAlign: 'center',
  },
});