import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { ViewStyle, DimensionValue } from 'react-native';


export default function ReadingSkeleton() {
  const baseColor = '#E5E7EB'; // Tailwind: gray-200
  const highlightColor = '#F3F4F6'; // Tailwind: gray-100

  return (
    <View className="flex-1 bg-white px-4 py-6 justify-between">
      {/* Section Header */}
      <SkeletonLine width="30%" height={14} />

      {/* Image Placeholder */}
      <SkeletonBlock height={256} radius={16} className="mt-2 mb-6" />

      {/* Paragraph */}
      <View className="space-y-3">
        <SkeletonLine width="100%" />
        <SkeletonLine width="95%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="85%" />
        <SkeletonLine width="40%" />
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-8">
        <SkeletonBlock width={140} height={44} radius={12} />
        <SkeletonBlock width={140} height={44} radius={12} />
      </View>
    </View>
  );
}


export function SkeletonLine({
  width = '100%',
  height = 16,
}: {
  width?: DimensionValue;
  height?: number;
}) {
  return (
    <MotiView
      style={{ width, height, borderRadius: 8 } as ViewStyle}
      className="bg-gray-200"
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 1000,
      }}
    />
  );
}

export function SkeletonBlock({
  width = '100%',
  height,
  radius = 12,
  className,
}: {
  width?: DimensionValue;
  height: number;
  radius?: number;
  className?: string;
}) {
  return (
    <MotiView
      style={{ width, height, borderRadius: radius } as ViewStyle}
      className={`bg-gray-200 ${className}`}
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 1000,
      }}
    />
  );
}



