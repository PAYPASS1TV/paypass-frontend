import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
    const [userRole, setUserRole] = useState<'user' | 'caregiver' | null>(null);

    useEffect(() => {
        const loadUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role as 'user' | 'caregiver');
        };
        loadUserRole();
    }, []);

    if (userRole === 'user') {
        // 이용자용 탭 (지도, 로그, 마이페이지)
        return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#0d9488',
                    tabBarInactiveTintColor: '#6b7280',
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: '지도',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="map" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="log"
                    options={{
                        title: '로그',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="mypage"
                    options={{
                        title: '마이페이지',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="users"
                    options={{
                        href: null, // 이용자에게는 숨김
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        href: null, // 이용자에게는 숨김
                    }}
                />
            </Tabs>
        );
    }

    // 보호자용 탭 (지도, 이용자, 알림, 마이페이지)
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#0d9488',
                tabBarInactiveTintColor: '#6b7280',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '지도',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: '이용자',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: '알림',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="mypage"
                options={{
                    title: '마이페이지',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="log"
                options={{
                    href: null, // 보호자에게는 숨김
                }}
            />
        </Tabs>
    );
}
