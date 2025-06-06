import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleLoginPress = () => {
    // 기본 네비게이션 (뒤로가기 가능)
    router.push('/login');
    
    // 또는 스택을 교체 (뒤로가기 불가능)
    // router.replace('/login');
  };

  const handleLogout = () => {
    // 모든 스택을 클리어하고 로그인으로 이동
    router.dismissAll();
    router.replace('/login');
  };
//로그인
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity 
        onPress={handleLoginPress}
        className="bg-blue-500 px-6 py-3 rounded-lg mb-4"
      >
        <Text className="text-white font-semibold">로그인하기</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}