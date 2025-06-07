import {
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import SectionHeader from '~/components/common/SectionHeader';
import PlaylistCard from '~/components/home/PlaylistCard';
import Header from '~/components/home/Header';
import { useEffect } from 'react';


export default function HomeScreen() {

  useEffect(() => {
  console.log('🏠 HomeScreen loaded');
}, []);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">
        <Header />
        
        <SectionHeader title="Recently Played" />
        <FlatList
          horizontal
          data={[]} // Pass an empty array or real data here
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <View className="w-32 h-32 bg-gray-200 rounded-md mr-4 justify-center items-center">
              <Text>Item</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <SectionHeader title="Playlists" />
        <View className="flex-row justify-between mt-2">
          <PlaylistCard title="Playlists" image={require('../../assets/images/playlist.webp')} screen="PlaylistsScreen" />
          <PlaylistCard title="Library" image={require('../../assets/images/library.webp')} screen="LibraryScreen" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
