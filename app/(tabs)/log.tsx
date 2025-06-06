import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

// 모의 로그 데이터
const INITIAL_LOGS = [
    {
        id: '1',
        type: 'location',
        title: '주야간보호센터에 도착했습니다',
        time: '10분 전',
        location: '편안한 주야간보호센터',
        read: false,
    },
    {
        id: '2',
        type: 'location',
        title: '집을 나섰습니다',
        time: '1시간 전',
        location: '자택',
        read: true,
    },
    {
        id: '3',
        type: 'activity',
        title: '물리치료에 참여했습니다',
        time: '2시간 전',
        detail: '30분간 진행',
        read: true,
    },
    {
        id: '4',
        type: 'health',
        title: '약 복용 시간입니다',
        time: '3시간 전',
        detail: '오전 약 복용',
        read: true,
    },
];

export default function LogPage() {
    const [logs, setLogs] = useState(INITIAL_LOGS);

    const unreadCount = logs.filter(log => !log.read).length;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold text-gray-900">활동 로그</Text>
                    {unreadCount > 0 && (
                        <Badge text={`${unreadCount}개 읽지 않음`} variant="default" />
                    )}
                </View>

                {/* 요약 통계 */}
                <View className="flex-row space-x-3 mb-6">
                    <Card className="flex-1 bg-blue-50">
                        <CardContent className="p-3 items-center">
                            <Text className="text-2xl font-bold text-blue-700">3</Text>
                            <Text className="text-sm text-blue-600">오늘 이동</Text>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 bg-green-50">
                        <CardContent className="p-3 items-center">
                            <Text className="text-2xl font-bold text-green-700">1</Text>
                            <Text className="text-sm text-green-600">활동 참여</Text>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 bg-purple-50">
                        <CardContent className="p-3 items-center">
                            <Text className="text-2xl font-bold text-purple-700">5</Text>
                            <Text className="text-sm text-purple-600">총 기록</Text>
                        </CardContent>
                    </Card>
                </View>

                <ScrollView className="flex-1">
                    <View className="space-y-4">
                        {logs.map((log) => (
                            <Card
                                key={log.id}
                                className={`bg-white ${!log.read ? 'border-l-4 border-blue-500' : ''}`}
                            >
                                <CardContent className="p-4">
                                    <View className="flex-row items-start justify-between">
                                        <View className="flex-1">
                                            <View className="flex-row items-center space-x-2 mb-2">
                                                <View
                                                    className={`h-10 w-10 rounded-full items-center justify-center ${
                                                        log.type === 'location'
                                                            ? 'bg-blue-100'
                                                            : log.type === 'activity'
                                                                ? 'bg-green-100'
                                                                : 'bg-purple-100'
                                                    }`}
                                                >
                                                    <Text className="text-xl">
                                                        {log.type === 'location'
                                                            ? '📍'
                                                            : log.type === 'activity'
                                                                ? '🏃'
                                                                : '💊'}
                                                    </Text>
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-medium">{log.title}</Text>
                                                    <View className="flex-row items-center">
                                                        <Text className="text-xs text-gray-500">🕐</Text>
                                                        <Text className="text-xs text-gray-500 ml-1">
                                                            {log.time}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {log.location && (
                                                <View className="flex-row items-center mt-2">
                                                    <Text className="text-sm text-gray-600">📍</Text>
                                                    <Text className="text-sm text-gray-600 ml-1">
                                                        {log.location}
                                                    </Text>
                                                </View>
                                            )}
                                            {log.detail && (
                                                <Text className="text-sm text-gray-600 mt-2">
                                                    {log.detail}
                                                </Text>
                                            )}
                                        </View>
                                        {!log.read && (
                                            <View className="h-2 w-2 bg-blue-500 rounded-full" />
                                        )}
                                    </View>
                                </CardContent>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
