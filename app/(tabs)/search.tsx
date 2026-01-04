import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import { PHOTOS } from '@/data/photos';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(PHOTOS);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setResults(PHOTOS);
    } else {
      const filtered = PHOTOS.filter(
        photo => photo.title.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults(PHOTOS);
  };

  const renderPhoto = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => router.push(`/photo/${item.id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.resultImage} />
      <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Discover amazing photos</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#8D99AE" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search photos..."
          value={query}
          onChangeText={handleSearch}
          placeholderTextColor="#8D99AE"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <X size={18} color="#8D99AE" />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={results}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1D2029',
  },
  clearButton: {
    padding: 6,
  },
  resultsContainer: {
    padding: 12,
  },
  resultItem: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: 120,
  },
  resultTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1D2029',
    padding: 8,
  },
});