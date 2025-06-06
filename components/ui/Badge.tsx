import { View, Text } from 'react-native';

interface BadgeProps {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'secondary';
    className?: string;
}

export function Badge({ text, variant = 'default', className = '' }: BadgeProps) {
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        secondary: 'bg-gray-100 text-gray-800',
    };

    return (
        <View className={`px-2 py-1 rounded-full ${variantClasses[variant]} ${className}`}>
            <Text className="text-xs font-medium">{text}</Text>
        </View>
    );
}
