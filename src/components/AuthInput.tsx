// src/components/auth/AuthInput.tsx
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { clsx } from 'clsx'; // optional: cleaner class merging
import { twMerge } from 'tailwind-variants';

interface AuthInputProps extends TextInputProps {
  containerClassName?: string; // customize container styles
  inputClassName?: string;     // customize input styles
}

const AuthInput: React.FC<AuthInputProps> = ({
  containerClassName = '',
  inputClassName = '',
  ...rest
}) => {
  return (
    <View className={twMerge('w-full mb-4', containerClassName)}>
      <TextInput
        className={twMerge(
          'bg-white rounded-xl px-4 py-3 text-base text-black border border-gray-300 focus:border-blue-500',
          inputClassName
        )}
        placeholderTextColor="#A1A1AA"
        {...rest}
      />
    </View>
  );
};

export default AuthInput;
