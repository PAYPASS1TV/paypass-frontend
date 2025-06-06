import { TouchableOpacity, Text, View } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps {
    onPress: () => void;
    title?: string;
    children?: ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export function Button({
                           onPress,
                           title,
                           children,
                           variant = 'default',
                           size = 'md',
                           disabled = false,
                           className = '',
                       }: ButtonProps) {
    const baseClasses = 'items-center justify-center rounded-lg';

    const variantClasses = {
        default: 'bg-blue-600',
        outline: 'border border-gray-300 bg-white',
        ghost: 'bg-transparent',
    };

    const sizeClasses = {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
    };

    const textVariantClasses = {
        default: 'text-white font-semibold',
        outline: 'text-gray-700 font-semibold',
        ghost: 'text-blue-600 font-semibold',
    };

    const disabledClasses = disabled ? 'opacity-50' : '';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        >
            {children || (
                <Text className={`${textVariantClasses[variant]} text-lg`}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
