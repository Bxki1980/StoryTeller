import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

export default function RecentlyPlayedSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {/* Thumbnail */}
        <View style={{ width: 60, height: 60, borderRadius: 8 }} />

        <View style={{ marginLeft: 12, flex: 1 }}>
          {/* Title */}
          <View style={{ width: '70%', height: 12, marginBottom: 6 }} />
          {/* Progress bar */}
          <View style={{ width: '90%', height: 6, borderRadius: 4 }} />
          {/* Continue text */}
          <View style={{ width: '40%', height: 10, marginTop: 6 }} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
