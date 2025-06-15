import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  totalSections: number;
  currentIndex: number;
  onDotPress?: (index: number) => void;
}

export default function PageIndicator({ totalSections, currentIndex, onDotPress }: Props) {
  return (
    <View className="flex-row justify-center items-center py-3">
      {Array.from({ length: totalSections }).map((_, index) => {
        const Dot = () => {
          const animatedStyle = useAnimatedStyle(() => {
            const isActive = index === currentIndex;
            return {
              transform: [{ scale: withTiming(isActive ? 1.4 : 1) }],
              opacity: withTiming(isActive ? 1 : 0.4),
            };
          }, [currentIndex]);

          return (
            <Animated.View
              className="mx-1 h-2 w-2 rounded-full bg-blue-500"
              style={animatedStyle}
            />
          );
        };

        return (
          <Pressable
            key={index}
            onPress={() => onDotPress?.(index)}
            hitSlop={10}
            className="p-1"
          >
            <Dot />
          </Pressable>
        );
      })}
    </View>
  );
}
