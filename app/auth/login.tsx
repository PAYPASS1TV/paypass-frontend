import { View, Text, Image, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            // 실제 구현에서는 서버 API 호출
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 로그인 성공 시 역할 선택 페이지로 이동
            router.push('/select-role');
        } catch (error) {
            Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-teal-50">
            <View className="flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <View className="items-center mb-4">
                            <Image
                                source={{
                                    uri: '<https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon_sample2-dLPkps6BvnM1vwrZhOq950gFpdSqqb.png>',
                                }}
                                className="w-20 h-20"
                                resizeMode="contain"
                            />
                        </View>
                        <CardTitle className="text-2xl font-bold text-teal-800 text-center">
                            로그인
                        </CardTitle>
                        <CardDescription className="text-center">
                            계정 정보를 입력하여 로그인하세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="space-y-4">
                            <Input
                                label="이메일"
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />

                            <View>
                                <Input
                                    label="비밀번호"
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                                <Button
                                    onPress={() => {}}
                                    variant="ghost"
                                    className="self-end mt-1"
                                    title="비밀번호 찾기"
                                />
                            </View>

                            <Button
                                onPress={handleLogin}
                                disabled={isLoading}
                                className="w-full bg-teal-600"
                                title={isLoading ? "로그인 중..." : "로그인"}
                            />
                        </View>

                        <View className="mt-6 items-center">
                            <Text className="text-sm text-gray-600">
                                계정이 없으신가요?{' '}
                                <Text
                                    className="text-teal-600 font-semibold"
                                    onPress={() => router.push('/signup')}
                                >
                                    회원가입
                                </Text>
                            </Text>
                        </View>

                        <Button
                            onPress={() => router.push('/splash')}
                            variant="ghost"
                            className="w-full mt-6"
                            title="← 처음으로 돌아가기"
                        />
                    </CardContent>
                </Card>
            </View>
        </SafeAreaView>
    );
}
