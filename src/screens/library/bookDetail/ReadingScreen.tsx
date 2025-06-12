import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useBookPages } from '~/hooks/book/useBookPages';
import { Page } from '~/types/Book/Page';
import { Audio } from 'expo-av';

import {
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { NavButton } from '~/components/common/NavButton';
import ReadingSkeleton from '~/components/skeletons/ReadingSkeleton';

// Constants
const SWIPE_THRESHOLD = 80;

// Route Param Type

type ReadingRouteParams = {
  params: {
    bookId: string;
  };
};
export default function ReadingScreen() {
  const route = useRoute<RouteProp<ReadingRouteParams, 'params'>>();
  const navigation = useNavigation();
  const { bookId } = route.params;

  const { pages, fetchPages, isLoading, hasMore } = useBookPages(bookId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const translateX = useSharedValue(0);

  // ────────────────
  // Gesture Handler
  // ────────────────
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX < -SWIPE_THRESHOLD) {
        runOnJS(handleNext)();
      } else if (event.translationX > SWIPE_THRESHOLD) {
        runOnJS(handlePrevious)();
      }
      translateX.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const currentPage: Page | undefined = pages[currentIndex];

  // ────────────────
  // Navigation logic
  // ────────────────
  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasMore && !isLoading) {
      fetchPages();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ────────────────
  // Audio playback
  // ────────────────
  const playAudio = async (url: string) => {
    if (!url) return;

    try {
      if (sound) await sound.unloadAsync();

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  if (isLoading && pages.length === 0) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReadingSkeleton />
      </GestureHandlerRootView>
    );
  }

  useEffect(() => {
    if (currentPage?.audioUrl) {
      playAudio(currentPage.audioUrl);
    }

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [currentPage]);

  // ────────────────
  // Render UI
  // ────────────────
  if (isLoading && pages.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C63FF" />
      </SafeAreaView>
    );
  }

  if (!currentPage) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-base text-gray-500">No pages available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <SafeAreaView className="flex-1 justify-between bg-white px-4 py-6">
            {/* Section Label */}
            <Text className="mb-2 text-right text-xs font-semibold text-indigo-600">
              Section {currentPage.sectionId}
            </Text>

            {/* Image */}
            {currentPage.imageUrl && (
              <Image
                source={{ uri: currentPage.imageUrl }}
                className="mb-4 h-64 w-full rounded-xl"
                resizeMode="cover"
              />
            )}

            {/* Content */}
            <View className="flex-1 justify-center">
              <Text className="text-lg leading-relaxed text-gray-800">{currentPage.content}</Text>
            </View>

            {/* Navigation */}
            <View className="mt-8 flex-row justify-between">
              <NavButton label="Previous" onPress={handlePrevious} disabled={currentIndex === 0} />
              <NavButton
                label="Next"
                onPress={handleNext}
                disabled={!hasMore && currentIndex >= pages.length - 1}
              />
            </View>
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
