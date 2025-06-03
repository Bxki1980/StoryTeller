import {
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import SectionHeader from '~/components/common/SectionHeader';
import PlaylistCard from '~/components/home/PlaylistCard';
import BottomTabNavigator from '~/components/common/BottomTabNavigator';
import Header from '~/components/home/Header';
import PlaylistsScreen from './PlaylistsScreen';
import LibraryScreen from './LibraryScreen';

export default function HomeScreen() {
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
          <PlaylistCard title="Playlists" image={0} screen="PlaylistsScreen" />
          <PlaylistCard title="Library" image={0} screen="LibraryScreen" />
        </View>
      </ScrollView>

      <BottomTabNavigator />
    </SafeAreaView>
  );
}
