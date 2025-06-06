import { View, Text, Image, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleGetStarted = () => {
        router.push('/signup');
    };

    const handleLogin = () => {
        router.push('/auth/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-teal-50">
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        }}
                        className="mb-8"
                    >
                        <Image
                            source={{
                                uri: '<https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon_sample2-dLPkps6BvnM1vwrZhOq950gFpdSqqb.png>',
                            }}
                            className="w-48 h-48"
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <View className="flex-row space-x-2">
                        <View className="w-3 h-3 rounded-full bg-teal-700" />
                        <View className="w-3 h-3 rounded-full bg-teal-700" />
                        <View className="w-3 h-3 rounded-full bg-teal-700" />
                    </View>
                </View>
            ) : (
                <View className="flex-1">
                    <View className="flex-1 items-center justify-center pt-12 px-6">
                        <Image
                            source={{
                                uri: '<https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon_sample2-dLPkps6BvnM1vwrZhOq950gFpdSqqb.png>',
                            }}
                            className="w-36 h-36 mb-6"
                            resizeMode="contain"
                        />
                        <Text className="text-3xl font-bold text-teal-800 text-center mb-4">
                            케어트래커
                        </Text>
                        <Text className="text-lg text-teal-700 text-center mb-8 max-w-md">
                            소중한 가족의 안전한 위치 관리와 케어를 위한 최고의 솔루션
                        </Text>

                        <View className="flex-col space-y-6 mb-12">
                            <View className="flex-col items-center text-center">
                                <View className="w-12 h-12 rounded-full bg-teal-600 items-center justify-center mb-3">
                                    <Text className="text-white text-xl">📍</Text>
                                </View>
                                <Text className="font-semibold text-teal-800">실시간 위치 확인</Text>
                                <Text className="text-sm text-teal-700">가족의 위치를 실시간으로 확인하세요</Text>
                            </View>

                            <View className="flex-col items-center text-center">
                                <View className="w-12 h-12 rounded-full bg-teal-600 items-center justify-center mb-3">
                                    <Text className="text-white text-xl">🔔</Text>
                                </View>
                                <Text className="font-semibold text-teal-800">안전 알림</Text>
                                <Text className="text-sm text-teal-700">위험 상황 발생 시 즉시 알림을 받으세요</Text>
                            </View>

                            <View className="flex-col items-center text-center">
                                <View className="w-12 h-12 rounded-full bg-teal-600 items-center justify-center mb-3">
                                    <Text className="text-white text-xl">👥</Text>
                                </View>
                                <Text className="font-semibold text-teal-800">가족 연결</Text>
                                <Text className="text-sm text-teal-700">여러 가족 구성원을 쉽게 관리하세요</Text>
                            </View>
                        </View>
                    </View>

                    <View className="p-6 space-y-4">
                        <Button
                            onPress={handleGetStarted}
                            className="w-full py-6 bg-teal-600"
                            title="시작하기"
                        />
                        <Button
                            onPress={handleLogin}
                            variant="outline"
                            className="w-full py-6"
                            title="로그인"
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
