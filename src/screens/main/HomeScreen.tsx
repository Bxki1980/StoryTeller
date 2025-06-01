import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import BottomTabNavigator from '~/components/common/BottomTabNavigator';
import SectionHeader from '~/components/common/SectionHeader';
import PlaylistCard from '~/components/home/PlaylistCard';


export default function HomeScreen() {
 return (
  <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="px-4">
      <Header />                        // Hello, Lily + icons
      <SectionHeader title="Recently Played" />
      <FlatList horizontal data={undefined} renderItem={undefined}  />       // Render RecentlyPlayedCard
      <SectionHeader title="Playlists" />
      <View className="flex-row justify-between mt-2">
        <PlaylistCard title="Playlists" image={0} screen={''} />
        <PlaylistCard title="Library" image={0} screen={''} />
      </View>
    </ScrollView>
    <BottomTabNavigator />             // Already done (assumed)
  </SafeAreaView>
);
}
