import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';

export default function RootLayout() {
  return (
      <View className="flex-1">
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="select-role" options={{ headerShown: false }} />
          <Stack.Screen name="enter-code" options={{ headerShown: false }} />
          <Stack.Screen name="user-code" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
  );
}
