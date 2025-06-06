import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

// 요양원/보호센터 데이터 타입 정의
interface CareCenter {
  id: number;
  name: string;
  address: string;
  type: string;
  lat: number;
  lng: number;
  phone: string;
  rating: number;
}

// 모의 요양원/보호센터 데이터
const CARE_CENTERS: CareCenter[] = [
  {
    id: 1,
    name: "행복한 요양원",
    address: "서울특별시 강남구 테헤란로 123",
    type: "요양원",
    lat: 37.5665,
    lng: 126.978,
    phone: "02-1234-5678",
    rating: 4.5,
  },
  {
    id: 2,
    name: "건강한 노인복지센터",
    address: "서울특별시 서초구 서초대로 456",
    type: "복지센터",
    lat: 37.4979,
    lng: 127.0276,
    phone: "02-2345-6789",
    rating: 4.2,
  },
  {
    id: 3,
    name: "편안한 주야간보호센터",
    address: "서울특별시 송파구 올림픽로 789",
    type: "주야간보호센터",
    lat: 37.5145,
    lng: 127.1059,
    phone: "02-3456-7890",
    rating: 4.7,
  },
];

const MainScreen: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<CareCenter | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [region, setRegion] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const handleSearch = (): void => {
    console.log('검색어:', searchQuery);
    Alert.alert('검색', `"${searchQuery}" 검색 결과`);
  };

  const handleMarkerPress = (center: CareCenter): void => {
    setSelectedCenter(center);
    setRegion({
      ...region,
      latitude: center.lat,
      longitude: center.lng,
    });
  };

  const handleLogClick = (): void => {
    console.log('로그 버튼 클릭');
    Alert.alert('로그', '로그 페이지로 이동');
  };

  const handleMyPageClick = (): void => {
    console.log('마이페이지 버튼 클릭');
    Alert.alert('마이페이지', '마이페이지로 이동');
  };

  const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
      <Text className="text-xs text-gray-600">{children}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* 상단 검색 바 */}
      <View className="bg-white shadow-sm p-4 z-10">
        <View className="flex-row items-center space-x-2">
          <View className="flex-1 relative">
            <View className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <Icon name="search" size={16} color="#9CA3AF" />
            </View>
            <TextInput
              className="h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-lg text-sm"
              placeholder="요양원, 보호센터 검색..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity 
            className="bg-blue-500 px-4 py-2 rounded-md"
            onPress={handleSearch}
          >
            <Text className="text-white text-sm font-medium">검색</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 border border-gray-200 rounded-md">
            <Icon name="filter" size={16} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 지도 영역 */}
      <View className="flex-1 relative">
        <MapView
          style={{ width: '100%', height: '100%' }}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {CARE_CENTERS.map((center) => (
            <Marker
              key={center.id}
              coordinate={{
                latitude: center.lat,
                longitude: center.lng,
              }}
              title={center.name}
              description={center.address}
              onPress={() => handleMarkerPress(center)}
              pinColor="#3B82F6"
            />
          ))}
        </MapView>

        {/* 선택된 센터 정보 카드 */}
        {selectedCenter && (
          <View className="absolute bottom-4 left-4 right-4 bg-white shadow-lg rounded-xl p-4 z-10">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center space-x-2 mb-2">
                  <Text className="font-semibold text-lg text-gray-900">
                    {selectedCenter.name}
                  </Text>
                  <Badge>{selectedCenter.type}</Badge>
                </View>
                <View className="flex-row items-center text-gray-600 mb-1">
                  <Icon name="map-pin" size={14} color="#6B7280" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {selectedCenter.address}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 mb-2">
                  전화: {selectedCenter.phone}
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Text className="text-yellow-500 text-base">★</Text>
                    <Text className="text-sm ml-1 text-gray-700">
                      {selectedCenter.rating}
                    </Text>
                  </View>
                  <TouchableOpacity className="bg-blue-500 px-3 py-1.5 rounded-md">
                    <Text className="text-white text-sm font-medium">
                      상세 정보
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                className="p-2 ml-2"
                onPress={() => setSelectedCenter(null)}
              >
                <Text className="text-gray-400 text-lg">✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* 하단 네비게이션 */}
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-center space-x-8">
          <TouchableOpacity
            className="flex items-center py-2 px-4"
            onPress={handleLogClick}
          >
            <Icon name="file-text" size={24} color="#374151" />
            <Text className="text-xs text-gray-700 mt-1">로그</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center py-2 px-4"
            onPress={handleMyPageClick}
          >
            <Icon name="user" size={24} color="#374151" />
            <Text className="text-xs text-gray-700 mt-1">마이페이지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
// 작업 1

export default MainScreen;
