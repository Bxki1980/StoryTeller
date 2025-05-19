import React from 'react';
import { useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';

interface AnimatedAuthToggleProps {
  activeTab: 'login' | 'signup' | 'forgotPassword';
  setActiveTab: (tab: 'login' | 'signup' | 'forgotPassword') => void;
}

const tabWidth = (Dimensions.get('window').width * 0.9) / 2;

export default function AnimatedAuthToggle({ activeTab, setActiveTab }: AnimatedAuthToggleProps) {
  const slideAnim = useRef(new Animated.Value(activeTab === 'login' ? 0 : tabWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === 'login' ? 0 : tabWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  return (
    <View className="mb-8 h-12 w-[90%] self-center overflow-hidden rounded-xl bg-gray-200 opacity-85">
      {/* Blue sliding bar */}
      <Animated.View
        style={{
          position: 'absolute',
          height: '100%',
          width: tabWidth,
          borderRadius: 7,
          backgroundColor: '#3B82F6', // blue-500,
          transform: [{ translateX: slideAnim }],
        }}
      />
      <View className="h-fully flex-1 flex-row">
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setActiveTab('login')}>
          <Text className={`font-semibold ${activeTab === 'login' ? 'text-white' : 'text-black'}`}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setActiveTab('signup')}>
          <Text className={`font-semibold ${activeTab === 'signup' ? 'text-white' : 'text-black'}`}>
            signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
