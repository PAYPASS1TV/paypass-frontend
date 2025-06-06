import { TextInput, View, Text } from 'react-native';

interface InputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    className?: string;
    label?: string;
    error?: string;
}

export function Input({
                          placeholder,
                          value,
                          onChangeText,
                          secureTextEntry = false,
                          keyboardType = 'default',
                          className = '',
                          label,
                          error,
                      }: InputProps) {
    return (
        <View className="space-y-2">
            {label && (
                <Text className="text-sm font-medium text-gray-700">{label}</Text>
            )}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                className={`border border-gray-300 rounded-lg px-3 py-3 text-base ${className}`}
                placeholderTextColor="#9ca3af"
            />
            {error && (
                <Text className="text-red-500 text-sm">{error}</Text>
            )}
        </View>
    );
}
