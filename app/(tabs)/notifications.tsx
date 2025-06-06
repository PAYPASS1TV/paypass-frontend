import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Card,
    CardContent,
    Badge,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../components/ui';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const markAsRead = (notificationId: string) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const unreadNotifications = notifications.filter(n => !n.read);
    const locationNotifications = notifications.filter(n => n.type === 'location');

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold text-gray-900">알림</Text>
                    {unreadCount > 0 && (
                        <Badge text={`${unreadCount}개 읽지 않음`} variant="default" />
                    )}
                </View>

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">전체</TabsTrigger>
                        <TabsTrigger value="unread">읽지않음</TabsTrigger>
                        <TabsTrigger value="location">위치</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <ScrollView className="flex-1">
                            <View className="space-y-4">
                                {notifications.map((notification) => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onPress={() => markAsRead(notification.id)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </TabsContent>

                    <TabsContent value="unread">
                        <ScrollView className="flex-1">
                            <View className="space-y-4">
                                {unreadNotifications.map((notification) => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onPress={() => markAsRead(notification.id)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </TabsContent>

                    <TabsContent value="location">
                        <ScrollView className="flex-1">
                            <View className="space-y-4">
                                {locationNotifications.map((notification) => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onPress={() => markAsRead(notification.id)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </TabsContent>
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

// 알림 카드 컴포넌트 분리
function NotificationCard({ notification, onPress }: { notification: any, onPress: () => void }) {
    return (
        <Card
            className={`bg-white ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}
            onPress={onPress}
        >
            <CardContent className="p-4">
                <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                        <View className="flex-row items-center space-x-2 mb-2">
                            <View
                                className={`h-10 w-10 rounded-full items-center justify-center ${
                                    notification.type === 'location'
                                        ? 'bg-blue-100'
                                        : 'bg-yellow-100'
                                }`}
                            >
                                <Text className="text-xl">
                                    {notification.type === 'location' ? '📍' : '🔋'}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="font-medium">{notification.title}</Text>
                                <View className="flex-row items-center">
                                    <Text className="text-xs text-gray-500">🕐</Text>
                                    <Text className="text-xs text-gray-500 ml-1">
                                        {notification.time}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {notification.location && (
                            <View className="flex-row items-center mt-2">
                                <Text className="text-sm text-gray-600">📍</Text>
                                <Text className="text-sm text-gray-600 ml-1">
                                    {notification.location}
                                </Text>
                            </View>
                        )}
                        {notification.detail && (
                            <Text className="text-sm text-gray-600 mt-2">
                                {notification.detail}
                            </Text>
                        )}
                    </View>
                    {!notification.read && (
                        <View className="h-2 w-2 bg-blue-500 rounded-full" />
                    )}
                </View>
            </CardContent>
        </Card>
    );
}
