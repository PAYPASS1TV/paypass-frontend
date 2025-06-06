export interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    detailAddress: string;
    role: 'user' | 'caregiver';
    joinDate: string;
    connectedUsers: ConnectedUser[];
}

export interface ConnectedUser {
    id: string;
    name: string;
    relationship: string;
    status: 'active' | 'inactive';
    lastLocation?: string;
    lastUpdated?: string;
    batteryLevel?: number;
}

export interface CareCenter {
    id: number;
    name: string;
    address: string;
    type: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    phone: string;
    rating: number;
}

export interface Notification {
    id: string;
    type: 'location' | 'battery' | 'emergency';
    title: string;
    time: string;
    location?: string;
    detail?: string;
    read: boolean;
    userId?: string;
}

export interface ActivityLog {
    id: string;
    type: 'location' | 'activity' | 'health';
    title: string;
    time: string;
    location?: string;
    detail?: string;
    read: boolean;
}
