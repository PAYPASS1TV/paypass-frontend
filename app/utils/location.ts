import * as Location from 'expo-location';

export const locationUtils = {
    // 위치 권한 요청
    async requestLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === 'granted';
    },

    // 현재 위치 가져오기
    async getCurrentLocation() {
        try {
            const hasPermission = await this.requestLocationPermission();
            if (!hasPermission) {
                throw new Error('위치 권한이 필요합니다.');
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
        } catch (error) {
            console.error('위치 정보를 가져올 수 없습니다:', error);
            // 기본 위치 반환 (서울)
            return {
                latitude: 37.5665,
                longitude: 126.978,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
        }
    },

    // 위치 추적 시작
    async startLocationTracking(callback: (location: any) => void) {
        const hasPermission = await this.requestLocationPermission();
        if (!hasPermission) {
            throw new Error('위치 권한이 필요합니다.');
        }

        return await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 10000, // 10초마다 업데이트
                distanceInterval: 10, // 10미터 이동 시 업데이트
            },
            callback
        );
    },
};
