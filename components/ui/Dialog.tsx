import React, { ReactNode } from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    Animated,
    Dimensions,
    ScrollView
} from 'react-native';
import { Button } from './Button';

interface DialogProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    animationType?: 'slide' | 'fade' | 'none';
    transparent?: boolean;
}

interface DialogContentProps {
    children: ReactNode;
    className?: string;
}

interface DialogHeaderProps {
    children: ReactNode;
    className?: string;
}

interface DialogTitleProps {
    children: ReactNode;
    className?: string;
}

interface DialogDescriptionProps {
    children: ReactNode;
    className?: string;
}

interface DialogFooterProps {
    children: ReactNode;
    className?: string;
}

export function Dialog({
                           visible,
                           onClose,
                           children,
                           animationType = 'fade',
                           transparent = true
                       }: DialogProps) {
    return (
        <Modal
            visible={visible}
            animationType={animationType}
            transparent={transparent}
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 bg-black/50 items-center justify-center p-4"
                onPress={onClose}
            >
                <Pressable onPress={(e) => e.stopPropagation()}>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
    return (
        <View className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-4/5 ${className}`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </View>
    );
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
    return (
        <View className={`p-6 pb-4 ${className}`}>
            {children}
        </View>
    );
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
    return (
        <Text className={`text-lg font-semibold text-gray-900 text-center ${className}`}>
            {children}
        </Text>
    );
}

export function DialogDescription({ children, className = '' }: DialogDescriptionProps) {
    return (
        <Text className={`text-sm text-gray-600 text-center mt-2 ${className}`}>
            {children}
        </Text>
    );
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
    return (
        <View className={`p-6 pt-4 flex-row space-x-3 ${className}`}>
            {children}
        </View>
    );
}

// 사용 예시 컴포넌트
export function ConfirmDialog({
                                  visible,
                                  onClose,
                                  onConfirm,
                                  title,
                                  description,
                                  confirmText = '확인',
                                  cancelText = '취소',
                                  confirmVariant = 'default'
                              }: {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'default' | 'destructive';
}) {
    return (
        <Dialog visible={visible} onClose={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onPress={onClose}
                        title={cancelText}
                        variant="outline"
                        className="flex-1"
                    />
                    <Button
                        onPress={() => {
                            onConfirm();
                            onClose();
                        }}
                        title={confirmText}
                        className={`flex-1 ${confirmVariant === 'destructive' ? 'bg-red-600' : 'bg-blue-600'}`}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
