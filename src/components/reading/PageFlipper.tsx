import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  FlatList,
  Dimensions,
  View,
  Text,
  ViewToken,
  ListRenderItem,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Page } from '~/types/Book/Page';

const { width } = Dimensions.get('window');

const AnimatedText = Animated.createAnimatedComponent(Text);

interface Props {
  pages: Page[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
}

// ✅ Ref interface to expose scrollToIndex
export interface PageFlipperRef {
  scrollToIndex: (index: number) => void;
}

function PageFlipperInternal(
  { pages, currentIndex, onIndexChange }: Props,
  ref: React.Ref<PageFlipperRef>
) {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);
  const [viewableIndex, setViewableIndex] = useState(currentIndex);

  // ✅ Allow parent to call scrollToIndex
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    },
  }));

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index ?? 0;
        setViewableIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    }
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem: ListRenderItem<Page> = useCallback(
    ({ item, index }) => {
      const animatedStyle = useAnimatedStyle(() => {
        const opacity = withTiming(index === viewableIndex ? 1 : 0.5, { duration: 300 });
        return { opacity };
      }, [viewableIndex]);

      return (
        <View className="w-screen flex-1 justify-center items-center bg-white px-4">
          <AnimatedText
            className="text-lg text-gray-900 text-center"
            style={animatedStyle}>
            {item.content}
          </AnimatedText>
        </View>
      );
    },
    [viewableIndex]
  );

  return (
    <FlatList
      ref={flatListRef}
      data={pages}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.sectionId}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onMomentumScrollEnd={() => onIndexChange?.(viewableIndex)}
      renderItem={renderItem}
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      initialScrollIndex={currentIndex}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
    />
  );
}

const PageFlipper = forwardRef(PageFlipperInternal);
export default PageFlipper;
