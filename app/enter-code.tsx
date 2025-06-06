import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

export default function EnterCodePage() {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCodeSubmit = async () => {
        if (code.length !== 6) {
            Alert.alert('오류', '6자리 코드를 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            // 모의 코드 검증 (실제 구현에서는 서버에서 검증)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 연결 성공 후 탭 화면으로 이동
            router.push('/(tabs)/home');
        } catch (error) {
            Alert.alert('오류', '코드 확인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <View className="items-center mb-4">
                            <View className="h-16 w-16 bg-green-100 rounded-full items-center justify-center">
                                <Text className="text-green-600 text-2xl">🔑</Text>
                            </View>
                        </View>
                        <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                            이용자 코드 입력
                        </CardTitle>
                        <CardDescription className="text-center">
                            이용자로부터 받은 6자리 코드를 입력하여 연결하세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="space-y-6">
                            <Input
                                label="이용자 코드"
                                placeholder="123456"
                                value={code}
                                onChangeText={(text) => setCode(text.replace(/\\D/g, '').slice(0, 6))}
                                keyboardType="numeric"
                                className="text-center text-2xl tracking-widest"
                            />

                            <View className="bg-blue-50 p-4 rounded-lg">
                                <View className="flex-row items-start space-x-3">
                                    <Text className="text-blue-600 text-lg">✓</Text>
                                    <View>
                                        <Text className="font-medium text-blue-800 mb-1">
                                            코드 입력 후 가능한 기능:
                                        </Text>
                                        <Text className="text-xs text-blue-800">• 이용자의 실시간 위치 확인</Text>
                                        <Text className="text-xs text-blue-800">• 특정 장소 출입 알림 받기</Text>
                                        <Text className="text-xs text-blue-800">• 이용자 안전 상태 모니터링</Text>
                                    </View>
                                </View>
                            </View>

                            <Button
                                onPress={handleCodeSubmit}
                                disabled={code.length !== 6 || isLoading}
                                className="w-full py-3 bg-blue-600"
                                title={isLoading ? "연결 중..." : "연결하기"}
                            />
                        </View>

                        <View className="mt-6 items-center">
                            <Text className="text-sm text-gray-600">
                                코드를 받지 못하셨나요?{' '}
                                <Text className="text-blue-600 font-semibold">
                                    이용자에게 코드 요청하기
                                </Text>
                            </Text>
                        </View>
                    </CardContent>
                </Card>
            </View>
        </SafeAreaView>
    );
}
