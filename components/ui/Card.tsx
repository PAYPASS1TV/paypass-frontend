import { View, Text, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onPress?: () => void;
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = '', onPress }: CardProps) {
    const Component = onPress ? TouchableOpacity : View;

    return (
        <Component
            onPress={onPress}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <View className={`p-6 pb-4 ${className}`}>
            {children}
        </View>
    );
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <View className={`p-6 pt-0 ${className}`}>
            {children}
        </View>
    );
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return (
        <Text className={`text-lg font-semibold text-gray-900 ${className}`}>
            {children}
        </Text>
    );
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return (
        <Text className={`text-sm text-gray-600 mt-1 ${className}`}>
            {children}
        </Text>
    );
}
