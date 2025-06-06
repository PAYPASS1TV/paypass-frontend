import React, { ReactNode, useState, createContext, useContext } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
    onValueChange?: (value: string) => void;
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function Tabs({ defaultValue, children, className = '', onValueChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        onValueChange?.(tab);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
            <View className={`${className}`}>
                {children}
            </View>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = '' }: TabsListProps) {
    return (
        <View className={`flex-row bg-gray-100 rounded-lg p-1 ${className}`}>
            {children}
        </View>
    );
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs');
    }

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    return (
        <Pressable
            onPress={() => setActiveTab(value)}
            className={`flex-1 py-2 px-3 rounded-md items-center justify-center ${
                isActive ? 'bg-white shadow-sm' : 'bg-transparent'
            } ${className}`}
        >
            <Text className={`text-sm font-medium ${
                isActive ? 'text-gray-900' : 'text-gray-600'
            }`}>
                {children}
            </Text>
        </Pressable>
    );
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabsContent must be used within Tabs');
    }

    const { activeTab } = context;

    if (activeTab !== value) {
        return null;
    }

    return (
        <View className={`mt-4 ${className}`}>
            {children}
        </View>
    );
}
