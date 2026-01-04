import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { X, Heart, Share2, Download, Info } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { PHOTOS } from '@/data/photos';

export default function PhotoDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Find the photo based on id
  const photoId = Array.isArray(id) ? id[0] : id;
  const photo = PHOTOS.find(p => p.id.toString() === photoId) || PHOTOS[0];
  
  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);
  
  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        title: photo.title,
        url: photo.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [photo]);
  
  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev);
  }, []);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <Animated.View entering={FadeIn.duration(300)}>
          <Image 
            source={{ uri: photo.url }} 
            style={[styles.image, { width: width, height: width }]}
            resizeMode="contain"
          />
        </Animated.View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{photo.title}</Text>
          
          {showInfo && (
            <Animated.View entering={FadeIn.duration(200)} style={styles.infoContainer}>
              <Text style={styles.infoText}>Album: {photo.albumId}</Text>
              <Text style={styles.infoText}>Photo ID: {photo.id}</Text>
              <Text style={styles.infoText}>Size: 600x600px</Text>
              <Text style={styles.infoText}>Added: May 15, 2023</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={toggleFavorite}
        >
          <Heart size={24} color={isFavorite ? '#E84855' : '#1D2029'} fill={isFavorite ? '#E84855' : 'transparent'} />
          <Text style={styles.actionText}>Favorite</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Share2 size={24} color="#1D2029" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {}}
        >
          <Download size={24} color="#1D2029" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={toggleInfo}
        >
          <Info size={24} color="#1D2029" />
          <Text style={styles.actionText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    backgroundColor: '#000000',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#1D2029',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#F5F6FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8D99AE',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F6FA',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8D99AE',
    marginTop: 4,
  },
});