import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // 또는 원하는 아이콘 라이브러리


type RoleType = 'user' | 'caregiver' | null;

interface NavigationProps {
  navigate: (screen: string) => void;
}

const SelectRolePage: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleRoleSelect = (role: 'user' | 'caregiver') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      console.log('선택한 역할:', selectedRole);

      // 역할에 따라 다른 대시보드로 이동
      if (selectedRole === 'user') {
        navigation.navigate('UserDashboard');
      } else {
        navigation.navigate('CaregiverDashboard');
      }
    } else {
      Alert.alert('알림', '역할을 선택해주세요.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 justify-center px-4">
      <View className="bg-white rounded-xl p-6 mx-4 shadow-lg">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2">환영합니다!</Text>
          <Text className="text-lg text-gray-600 text-center leading-6">
            회원가입이 완료되었습니다. 서비스 이용을 위해 역할을 선택해주세요.
          </Text>
        </View>

        {/* Role Selection Cards */}
        <View className="space-y-4 mb-6">
          {/* User Role Card */}
          <TouchableOpacity
            className={`border-2 rounded-xl p-5 transition-all ${
              selectedRole === 'user'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white'
            }`}
            onPress={() => handleRoleSelect('user')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center space-x-4">
              <View
                className={`h-12 w-12 rounded-full items-center justify-center ${
                  selectedRole === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <Icon
                  name="user"
                  size={24}
                  color={selectedRole === 'user' ? '#2563eb' : '#6b7280'}
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  당신은 이용자이십니까?
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  서비스를 직접 이용하는 노인 이용자
                </Text>
              </View>
              {selectedRole === 'user' && (
                <Icon name="arrow-right" size={20} color="#2563eb" />
              )}
            </View>
          </TouchableOpacity>

          {/* Caregiver Role Card */}
          <TouchableOpacity
            className={`border-2 rounded-xl p-5 transition-all ${
              selectedRole === 'caregiver'
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white'
            }`}
            onPress={() => handleRoleSelect('caregiver')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center space-x-4">
              <View
                className={`h-12 w-12 rounded-full items-center justify-center ${
                  selectedRole === 'caregiver' ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <Icon
                  name="users"
                  size={24}
                  color={selectedRole === 'caregiver' ? '#16a34a' : '#6b7280'}
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  당신은 보호자이십니까?
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  이용자를 돌보는 가족 또는 보호자
                </Text>
              </View>
              {selectedRole === 'caregiver' && (
                <Icon name="arrow-right" size={20} color="#16a34a" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            selectedRole
              ? 'bg-blue-600 active:bg-blue-700'
              : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.8}
        >
          <Text
            className={`text-lg font-semibold ${
              selectedRole ? 'text-white' : 'text-gray-500'
            }`}
          >
            선택 완료
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectRolePage;