import { View, Text, Dimensions, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import type { Region } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// 모의 요양원/보호센터 데이터
const CARE_CENTERS = [
    {
        id: 1,
        name: '행복한 요양원',
        address: '서울특별시 강남구 테헤란로 123',
        type: '요양원',
        coordinate: { latitude: 37.5665, longitude: 126.978 },
        phone: '02-1234-5678',
        rating: 4.5,
    },
    {
        id: 2,
        name: '건강한 노인복지센터',
        address: '서울특별시 서초구 서초대로 456',
        type: '복지센터',
        coordinate: { latitude: 37.4979, longitude: 127.0276 },
        phone: '02-2345-6789',
        rating: 4.2,
    },
];

export default function MainPage() {
    const [userRole, setUserRole] = useState<'user' | 'caregiver' | null>(null);
    const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role as 'user' | 'caregiver');
        };
        loadUserRole();
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('권한 필요', '위치 서비스 권한이 필요합니다.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } catch (error) {
            console.error('위치 정보를 가져올 수 없습니다:', error);
            // 기본 위치 설정 (서울)
            setCurrentLocation({
                latitude: 37.5665,
                longitude: 126.978,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };

    if (userRole === 'user') {
        // 이용자용 UI
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="bg-white shadow-sm p-4">
                    <Text className="text-xl font-semibold text-gray-900 text-center">
                        내 위치
                    </Text>
                    <Text className="text-sm text-gray-600 text-center">
                        현재 위치를 확인하세요
                    </Text>
                </View>

                <View className="flex-1">
                    {currentLocation && (
                        <MapView
                            style={{ width, height: height - 200 }}
                            initialRegion={currentLocation}
                            showsUserLocation
                            showsMyLocationButton
                        >
                            <Marker
                                coordinate={currentLocation}
                                title="내 위치"
                                pinColor="blue"
                            />
                        </MapView>
                    )}
                </View>
            </SafeAreaView>
        );
    }

    // 보호자용 UI
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="bg-white shadow-sm p-4">
                <View className="flex-row space-x-2">
                    <View className="flex-1">
                        <Input
                            placeholder="요양원, 보호센터 검색..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <Button
                        onPress={() => {}}
                        title="검색"
                        className="px-4 bg-blue-600"
                    />
                </View>
            </View>

            <View className="flex-1">
                {currentLocation && (
                    <MapView
                        style={{ width, height: height - 200 }}
                        initialRegion={currentLocation}
                        showsUserLocation
                        showsMyLocationButton
                    >
                        {/* 이용자 마커 */}
                        <Marker
                            coordinate={currentLocation}
                            title="김할머니"
                            description="현재 위치"
                            pinColor="blue"
                        />

                        {/* 요양원/보호센터 마커들 */}
                        {CARE_CENTERS.map((center) => (
                            <Marker
                                key={center.id}
                                coordinate={center.coordinate}
                                title={center.name}
                                description={center.type}
                                pinColor="green"
                                onPress={() => setSelectedCenter(center)}
                            />
                        ))}
                    </MapView>
                )}

                {/* 선택된 센터 정보 카드 */}
                {selectedCenter && (
                    <View className="absolute bottom-4 left-4 right-4">
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-4">
                                <View className="flex-row justify-between items-start">
                                    <View className="flex-1">
                                        <Text className="font-semibold text-lg mb-2">
                                            {selectedCenter.name}
                                        </Text>
                                        <Text className="text-gray-600 mb-1">
                                            📍 {selectedCenter.address}
                                        </Text>
                                        <Text className="text-gray-600 mb-2">
                                            📞 {selectedCenter.phone}
                                        </Text>
                                        <View className="flex-row items-center">
                                            <Text className="text-yellow-500">⭐</Text>
                                            <Text className="ml-1">{selectedCenter.rating}</Text>
                                        </View>
                                    </View>
                                    <Button
                                        onPress={() => setSelectedCenter(null)}
                                        title="✕"
                                        variant="ghost"
                                        className="p-2"
                                    />
                                </View>
                            </CardContent>
                        </Card>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
