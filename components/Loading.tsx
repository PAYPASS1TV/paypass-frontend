import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Animated,
    Easing
} from 'react-native';
import { useEffect, useRef } from 'react';

interface LoadingProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    overlay?: boolean;
    className?: string;
}

interface LoadingOverlayProps {
    visible: boolean;
    text?: string;
    size?: 'small' | 'large';
    color?: string;
}

interface LoadingDotsProps {
    color?: string;
    size?: number;
}

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

// 기본 로딩 컴포넌트
export function Loading({
                            size = 'large',
                            color = '#0d9488',
                            text,
                            overlay = false,
                            className = ''
                        }: LoadingProps) {
    if (overlay) {
        return (
            <View className={`absolute inset-0 bg-black/20 items-center justify-center z-50 ${className}`}>
                <View className="bg-white rounded-lg p-6 items-center shadow-lg">
                    <ActivityIndicator size={size} color={color} />
                    {text && (
                        <Text className="text-gray-700 mt-3 text-center">{text}</Text>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View className={`items-center justify-center ${className}`}>
            <ActivityIndicator size={size} color={color} />
            {text && (
                <Text className="text-gray-700 mt-3 text-center">{text}</Text>
            )}
        </View>
    );
}

// 오버레이 로딩
export function LoadingOverlay({
                                   visible,
                                   text = '로딩 중...',
                                   size = 'large',
                                   color = '#0d9488'
                               }: LoadingOverlayProps) {
    if (!visible) return null;

    return (
        <Loading
            overlay
            text={text}
            size={size}
            color={color}
            className="absolute inset-0"
        />
    );
}

// 점 애니메이션 로딩
export function LoadingDots({ color = '#0d9488', size = 8 }: LoadingDotsProps) {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDots = () => {
            const duration = 600;

            Animated.sequence([
                Animated.timing(dot1, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(dot2, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(dot3, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.parallel([
                    Animated.timing(dot1, {
                        toValue: 0,
                        duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot2, {
                        toValue: 0,
                        duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot3, {
                        toValue: 0,
                        duration,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => animateDots());
        };

        animateDots();
    }, []);

    return (
        <View className="flex-row space-x-1 items-center">
            <Animated.View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    opacity: dot1,
                }}
            />
            <Animated.View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    opacity: dot2,
                }}
            />
            <Animated.View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    opacity: dot3,
                }}
            />
        </View>
    );
}

// 커스텀 스피너
export function LoadingSpinner({ size = 24, color = '#0d9488' }: LoadingSpinnerProps) {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            rotation.setValue(0);
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => animate());
        };

        animate();
    }, []);

    const rotateData = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={{
                width: size,
                height: size,
                borderWidth: 2,
                borderColor: `${color}30`,
                borderTopColor: color,
                borderRadius: size / 2,
                transform: [{ rotate: rotateData }],
            }}
        />
    );
}

// 풀스크린 로딩
export function FullScreenLoading({
                                      text = '로딩 중...',
                                      backgroundColor = '#f0fdfa'
                                  }: {
    text?: string;
    backgroundColor?: string;
}) {
    return (
        <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor }}
        >
            <LoadingDots color="#0d9488" size={12} />
            <Text className="text-gray-700 mt-6 text-lg">{text}</Text>
        </View>
    );
}
