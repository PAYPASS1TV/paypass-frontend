import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Input,
    Card,
    CardContent,
    Badge,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    ConfirmDialog
} from '../../components/ui';

export default function UsersPage() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [newUserCode, setNewUserCode] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserRelationship, setNewUserRelationship] = useState('');

    const handleRemoveUser = (userId: string, userName: string) => {
        setUserToDelete(userId);
        setShowDeleteDialog(true);
    };

    const confirmDeleteUser = () => {
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== userToDelete));
            setUserToDelete(null);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4">
                {/* 기존 UI 코드... */}

                {/* 개선된 이용자 추가 Dialog */}
                <Dialog visible={showAddDialog} onClose={() => setShowAddDialog(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>새 이용자 추가</DialogTitle>
                        </DialogHeader>

                        <View className="p-4 space-y-4">
                            <Input
                                label="이용자 코드 *"
                                placeholder="6자리 코드 입력"
                                value={newUserCode}
                                onChangeText={(text) => setNewUserCode(text.replace(/\\D/g, '').slice(0, 6))}
                                keyboardType="numeric"
                            />

                            <Input
                                label="이용자 이름"
                                placeholder="예: 어머니"
                                value={newUserName}
                                onChangeText={setNewUserName}
                            />

                            <Input
                                label="관계"
                                placeholder="예: 어머니, 아버지, 할머니"
                                value={newUserRelationship}
                                onChangeText={setNewUserRelationship}
                            />
                        </View>

                        <DialogFooter>
                            <Button
                                onPress={() => setShowAddDialog(false)}
                                title="취소"
                                variant="outline"
                                className="flex-1"
                            />
                            <Button
                                onPress={handleAddUser}
                                title="추가"
                                className="flex-1 bg-blue-600"
                                disabled={newUserCode.length !== 6}
                            />
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* 삭제 확인 Dialog */}
                <ConfirmDialog
                    visible={showDeleteDialog}
                    onClose={() => setShowDeleteDialog(false)}
                    onConfirm={confirmDeleteUser}
                    title="이용자 삭제"
                    description="정말로 이용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                    confirmText="삭제"
                    confirmVariant="destructive"
                />
            </View>
        </SafeAreaView>
    );
}
