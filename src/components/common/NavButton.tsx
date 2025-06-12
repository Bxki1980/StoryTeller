import { TouchableOpacity, Text } from "react-native";


export function NavButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl ${
        disabled ? 'bg-gray-300' : 'bg-indigo-600'
      }`}
    >
      <Text className="text-white font-semibold text-base">{label}</Text>
    </TouchableOpacity>
  );
}