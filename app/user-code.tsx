import { View, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function UserCodePage() {
    const [userCode, setUserCode] = useState('');

    useEffect(() => {
        // 사용자 코드 생성 (실제로는 서버에서 생성)
        const generateCode = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
        setUserCode(generateCode());
    }, []);

    const handleCopyCode = async () => {
        try {
            await Clipboard.setStringAsync(userCode);
            Alert.alert('성공', '코드가 복사되었습니다!');
        } catch (error) {
            Alert.alert('오류', '복사에 실패했습니다.');
        }
    };

    const handleRefreshCode = () => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        setUserCode(newCode);
        Alert.alert('성공', '새 코드가 생성되었습니다.');
    };

    const handleContinue = () => {
        router.push('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <View className="h-16 w-16 bg-blue-100 rounded-full items-center justify-center mx-auto mb-4">
                            <Text className="text-blue-600 text-2xl">👤</Text>
                        </View>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            나의 이용자 코드
                        </CardTitle>
                        <CardDescription>
                            보호자에게 이 코드를 알려주어 연결하세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* 코드 표시 */}
                        <View className="items-center">
                            <View className="bg-gray-100 rounded-lg p-6 mb-4 items-center">
                                <Text className="text-4xl font-mono font-bold text-gray-900 tracking-widest mb-2">
                                    {userCode}
                                </Text>
                                <Badge text="활성 상태" variant="success" />
                            </View>

                            <View className="flex-row space-x-2">
                                <Button
                                    onPress={handleCopyCode}
                                    title="📋 복사"
                                    variant="outline"
                                    className="flex-1"
                                />
                                <Button
                                    onPress={handleRefreshCode}
                                    title="🔄"
                                    variant="outline"
                                    className="px-4"
                                />
                                <Button
                                    onPress={() => {}}
                                    title="📤"
                                    variant="outline"
                                    className="px-4"
                                />
                            </View>
                        </View>

                        {/* 안내 정보 */}
                        <View className="bg-blue-50 p-4 rounded-lg">
                            <Text className="font-medium text-blue-900 mb-2">코드 사용 방법</Text>
                            <Text className="text-sm text-blue-800">1. 위 6자리 코드를 보호자에게 알려주세요</Text>
                            <Text className="text-sm text-blue-800">2. 보호자가 앱에서 코드를 입력합니다</Text>
                            <Text className="text-sm text-blue-800">3. 연결 완료 후 위치 공유가 시작됩니다</Text>
                        </View>

                        {/* 주의사항 */}
                        <View className="bg-yellow-50 p-4 rounded-lg">
                            <Text className="font-medium text-yellow-900 mb-2">⚠️ 주의사항</Text>
                            <Text className="text-sm text-yellow-800">• 코드는 신뢰할 수 있는 보호자에게만 알려주세요</Text>
                            <Text className="text-sm text-yellow-800">• 필요시 언제든 새 코드로 변경할 수 있습니다</Text>
                            <Text className="text-sm text-yellow-800">• 코드 연결 후 위치 정보가 공유됩니다</Text>
                        </View>

                        <Button
                            onPress={handleContinue}
                            className="w-full py-3 bg-blue-600"
                            title="계속하기"
                        />
                    </CardContent>
                </Card>
            </View>
        </SafeAreaView>
    );
}
