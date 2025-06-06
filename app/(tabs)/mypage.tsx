import { View, Text, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

// 모의 사용자 데이터
const INITIAL_USER_DATA = {
    id: 'user123',
    name: '김보호자',
    phone: '010-1234-5678',
    email: 'caregiver@example.com',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '101동 1001호',
    role: 'caregiver',
    joinDate: '2024-01-15',
    connectedUsers: [
        { id: '1', name: '김할머니', relationship: '어머니' },
    ],
};

const INITIAL_USER_DATA_FOR_USER = {
    id: 'user456',
    name: '김할머니',
    phone: '010-9876-5432',
    email: 'user@example.com',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '행복한 요양원',
    role: 'user',
    joinDate: '2024-01-15',
    connectedUsers: [],
};

export default function MyPage() {
    const [userRole, setUserRole] = useState<'user' | 'caregiver' | null>(null);
    const [userData, setUserData] = useState(INITIAL_USER_DATA);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(userData);

    useEffect(() => {
        const loadUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role as 'user' | 'caregiver');

            if (role === 'user') {
                setUserData(INITIAL_USER_DATA_FOR_USER);
                setEditData(INITIAL_USER_DATA_FOR_USER);
            } else {
                setUserData(INITIAL_USER_DATA);
                setEditData(INITIAL_USER_DATA);
            }
        };
        loadUserRole();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditData(userData);
    };

    const handleSave = async () => {
        try {
            // 실제 구현에서는 서버 API 호출
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUserData(editData);
            setIsEditing(false);
            Alert.alert('성공', '프로필이 저장되었습니다.');
        } catch (error) {
            Alert.alert('오류', '저장에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(userData);
    };

    const handleLogout = () => {
        Alert.alert(
            '로그아웃',
            '로그아웃 하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '로그아웃',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userRole');
                        router.push('/splash');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 p-4">
                <View className="space-y-6">
                    {/* 헤더 */}
                    <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-bold text-gray-900">마이페이지</Text>
                        {!isEditing ? (
                            <Button
                                onPress={handleEdit}
                                title="편집"
                                variant="outline"
                                className="px-4"
                            />
                        ) : (
                            <View className="flex-row space-x-2">
                                <Button
                                    onPress={handleSave}
                                    title="저장"
                                    className="px-4 bg-blue-600"
                                />
                                <Button
                                    onPress={handleCancel}
                                    title="취소"
                                    variant="outline"
                                    className="px-4"
                                />
                            </View>
                        )}
                    </View>

                    {/* 프로필 카드 */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex-row items-center">
                                <Text className="text-xl">👤</Text>
                                <Text className="ml-2">프로필 정보</Text>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <View className="flex-row items-center space-x-4 mb-4">
                                <View className="h-16 w-16 bg-blue-100 rounded-full items-center justify-center">
                                    <Text className="text-blue-600 text-2xl">👤</Text>
                                </View>
                                <View>
                                    <Text className="text-xl font-semibold">{userData.name}</Text>
                                    <Badge
                                        text={userData.role === 'caregiver' ? '보호자' : '이용자'}
                                        variant="default"
                                        className="mt-1"
                                    />
                                    <Text className="text-sm text-gray-500 mt-1">
                                        가입일: {userData.joinDate}
                                    </Text>
                                </View>
                            </View>

                            <View className="space-y-4">
                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">이름</Text>
                                    {isEditing ? (
                                        <Input
                                            value={editData.name}
                                            onChangeText={(text) => setEditData({...editData, name: text})}
                                        />
                                    ) : (
                                        <Text className="text-sm font-medium">{userData.name}</Text>
                                    )}
                                </View>

                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">전화번호</Text>
                                    {isEditing ? (
                                        <Input
                                            value={editData.phone}
                                            onChangeText={(text) => setEditData({...editData, phone: text})}
                                            keyboardType="phone-pad"
                                        />
                                    ) : (
                                        <Text className="text-sm font-medium">{userData.phone}</Text>
                                    )}
                                </View>

                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">이메일</Text>
                                    {isEditing ? (
                                        <Input
                                            value={editData.email}
                                            onChangeText={(text) => setEditData({...editData, email: text})}
                                            keyboardType="email-address"
                                        />
                                    ) : (
                                        <Text className="text-sm font-medium">{userData.email}</Text>
                                    )}
                                </View>

                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">주소</Text>
                                    {isEditing ? (
                                        <View className="space-y-2">
                                            <Input
                                                value={editData.address}
                                                onChangeText={(text) => setEditData({...editData, address: text})}
                                                placeholder="기본 주소"
                                            />
                                            <Input
                                                value={editData.detailAddress}
                                                onChangeText={(text) => setEditData({...editData, detailAddress: text})}
                                                placeholder="상세 주소"
                                            />
                                        </View>
                                    ) : (
                                        <View>
                                            <Text className="text-sm font-medium">{userData.address}</Text>
                                            <Text className="text-sm text-gray-600">{userData.detailAddress}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </CardContent>
                    </Card>

                    {/* 연결된 이용자 (보호자인 경우만 표시) */}
                    {userRole === 'caregiver' && (
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="flex-row items-center">
                                    <Text className="text-xl">👥</Text>
                                    <Text className="ml-2">연결된 이용자</Text>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <View className="space-y-3">
                                    {userData.connectedUsers.map((user) => (
                                        <View key={user.id} className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <View className="flex-row items-center space-x-3">
                                                <View className="h-10 w-10 bg-blue-100 rounded-full items-center justify-center">
                                                    <Text className="text-blue-600">👤</Text>
                                                </View>
                                                <View>
                                                    <Text className="font-medium">{user.name}</Text>
                                                    <Text className="text-sm text-gray-600">{user.relationship}</Text>
                                                </View>
                                            </View>
                                            <Text className="text-gray-400">→</Text>
                                        </View>
                                    ))}
                                    <Button
                                        onPress={() => router.push('/enter-code')}
                                        title="이용자 추가"
                                        variant="outline"
                                        className="w-full"
                                    />
                                </View>
                            </CardContent>
                        </Card>
                    )}

                    {/* 알림 설정 */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex-row items-center">
                                <Text className="text-xl">🔔</Text>
                                <Text className="ml-2">알림 설정</Text>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <View className="space-y-4">
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="font-medium">위치 알림</Text>
                                        <Text className="text-sm text-gray-600">
                                            {userRole === 'user' ? '내 위치 공유 시 알림' : '이용자의 위치 변경 시 알림'}
                                        </Text>
                                    </View>
                                    <View className="w-12 h-6 bg-blue-600 rounded-full items-end justify-center">
                                        <View className="w-5 h-5 bg-white rounded-full" />
                                    </View>
                                </View>

                                <View className="h-px bg-gray-200" />

                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="font-medium">응급 알림</Text>
                                        <Text className="text-sm text-gray-600">응급 상황 발생 시 즉시 알림</Text>
                                    </View>
                                    <View className="w-12 h-6 bg-blue-600 rounded-full items-end justify-center">
                                        <View className="w-5 h-5 bg-white rounded-full" />
                                    </View>
                                </View>
                            </View>
                        </CardContent>
                    </Card>

                    {/* 계정 설정 */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex-row items-center">
                                <Text className="text-xl">⚙️</Text>
                                <Text className="ml-2">계정 설정</Text>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <View className="space-y-3">
                                <Button
                                    onPress={() => {}}
                                    title="🔒  비밀번호 변경"
                                    variant="ghost"
                                    className="w-full justify-start"
                                />

                                <Button
                                    onPress={() => {}}
                                    title="📋  개인정보 처리방침"
                                    variant="ghost"
                                    className="w-full justify-start"
                                />

                                <Button
                                    onPress={() => {}}
                                    title="📄  서비스 이용약관"
                                    variant="ghost"
                                    className="w-full justify-start"
                                />

                                <View className="h-px bg-gray-200" />

                                <Button
                                    onPress={handleLogout}
                                    title="🚪  로그아웃"
                                    variant="ghost"
                                    className="w-full justify-start text-red-600"
                                />
                            </View>
                        </CardContent>
                    </Card>

                    {/* 앱 정보 */}
                    <Card className="bg-white">
                        <CardContent className="p-4 items-center">
                            <Text className="text-sm text-gray-500">케어트래커 v1.0.0</Text>
                            <Text className="text-sm text-gray-500">© 2024 CareTracker. All rights reserved.</Text>
                        </CardContent>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
