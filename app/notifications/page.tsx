import { useNavigation } from '@react-navigation/native';
import { Bell, Clock, MapPin, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Notification 타입 정의
interface Notification {
  id: string;
  type: 'location' | 'battery';
  title: string;
  time: string;
  location?: string;
  detail?: string;
  read: boolean;
  userId: string;
}

// 모의 알림 데이터
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "location",
    title: "김할머니님이 주야간보호센터에 도착했습니다",
    time: "10분 전",
    location: "편안한 주야간보호센터",
    read: false,
    userId: "1",
  },
  {
    id: "2",
    type: "location",
    title: "김할머니님이 집을 나섰습니다",
    time: "1시간 전",
    location: "자택",
    read: true,
    userId: "1",
  },
  {
    id: "3",
    type: "battery",
    title: "김할머니님의 기기 배터리가 부족합니다",
    time: "2시간 전",
    detail: "배터리 잔량 15%",
    read: true,
    userId: "1",
  },
];

type TabType = 'all' | 'unread' | 'location';

interface NotificationCardProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(notification)}
    className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 ${
      !notification.read ? 'border-l-4 border-l-blue-500' : ''
    }`}
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-1">
        <View className="flex-row items-center space-x-3 mb-2">
          {notification.type === "location" ? (
            <View className="h-10 w-10 bg-blue-100 rounded-full items-center justify-center">
              <MapPin size={20} color="#2563eb" />
            </View>
          ) : (
            <View className="h-10 w-10 bg-amber-100 rounded-full items-center justify-center">
              <Bell size={20} color="#d97706" />
            </View>
          )}
          <View className="flex-1">
            <Text className="font-medium text-gray-900 text-base">
              {notification.title}
            </Text>
            <View className="flex-row items-center mt-1">
              <Clock size={12} color="#6b7280" />
              <Text className="text-sm text-gray-500 ml-1">
                {notification.time}
              </Text>
            </View>
          </View>
        </View>
        {notification.location && (
          <View className="flex-row items-center mt-2">
            <MapPin size={16} color="#6b7280" />
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
        <View className="h-2 w-2 bg-blue-500 rounded-full ml-2" />
      )}
    </View>
  </TouchableOpacity>
);

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const markAsRead = (notificationId: string): void => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const handleNotificationClick = (notification: Notification): void => {
    markAsRead(notification.id);

    // 위치 알림인 경우 지도로 이동
    if (notification.type === "location") {
      navigation.navigate('Main', { userId: notification.userId });
    }
  };

  const getFilteredNotifications = (): Notification[] => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'location':
        return notifications.filter(n => n.type === 'location');
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const TabButton: React.FC<{ value: TabType; label: string; isActive: boolean }> = ({
    value,
    label,
    isActive
  }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      className={`flex-1 py-3 items-center rounded-lg ${
        isActive ? 'bg-blue-600' : 'bg-gray-100'
      }`}
    >
      <Text className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const BottomNavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onPress: () => void;
  }> = ({ icon, label, isActive = false, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center py-2 px-4 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
    >
      {icon}
      <Text className={`text-xs mt-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-4 pb-20">
        {/* 헤더 */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">알림</Text>
          {unreadCount > 0 && (
            <View className="bg-blue-500 rounded-full px-3 py-1">
              <Text className="text-white text-sm font-medium">
                {unreadCount}개 읽지 않음
              </Text>
            </View>
          )}
        </View>

        {/* 탭 */}
        <View className="flex-row space-x-2 mb-4">
          <TabButton value="all" label="전체" isActive={activeTab === 'all'} />
          <TabButton value="unread" label="읽지 않음" isActive={activeTab === 'unread'} />
          <TabButton value="location" label="위치" isActive={activeTab === 'location'} />
        </View>

        {/* 알림 목록 */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={handleNotificationClick}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Bell size={48} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4">
                {activeTab === 'unread' ? '읽지 않은 알림이 없습니다' : 
                 activeTab === 'location' ? '위치 알림이 없습니다' : 
                 '알림이 없습니다'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 하단 네비게이션 */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <View className="flex-row justify-center space-x-8 max-w-2xl mx-auto">
          <BottomNavButton
            icon={<MapPin size={24} color="#6b7280" />}
            label="지도"
            onPress={() => navigation.navigate('Main' as never)}
          />
          <BottomNavButton
            icon={<User size={24} color="#6b7280" />}
            label="이용자"
            onPress={() => navigation.navigate('Users' as never)}
          />
          <BottomNavButton
            icon={<Bell size={24} color="#2563eb" />}
            label="알림"
            isActive={true}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;