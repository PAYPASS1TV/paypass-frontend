
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// 모의 요양원/보호센터 데이터
interface CareCenter {
  id: number;
  name: string;
  address: string;
  type: string;
}

const CARE_CENTERS: CareCenter[] = [
  { id: 1, name: "행복한 요양원", address: "서울특별시 강남구 테헤란로 123", type: "요양원" },
  { id: 2, name: "건강한 노인복지센터", address: "서울특별시 서초구 서초대로 456", type: "복지센터" },
  { id: 3, name: "편안한 주야간보호센터", address: "서울특별시 송파구 올림픽로 789", type: "주야간보호센터" },
  { id: 4, name: "사랑의 요양원", address: "서울특별시 강동구 천호대로 101", type: "요양원" },
  { id: 5, name: "희망 노인복지센터", address: "서울특별시 마포구 양화로 202", type: "복지센터" },
  { id: 6, name: "미소 주야간보호센터", address: "서울특별시 영등포구 여의대로 303", type: "주야간보호센터" },
  { id: 7, name: "햇살 요양원", address: "서울특별시 용산구 이태원로 404", type: "요양원" },
  { id: 8, name: "푸른 노인복지센터", address: "서울특별시 종로구 종로 505", type: "복지센터" },
];

interface FormData {
  name: string;
  birthDate: Date | null;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  isElderly: boolean;
  careCenter: CareCenter | null;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthDate: null,
    phone: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    isElderly: false,
    careCenter: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isCareCenterModalVisible, setIsCareCenterModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(CARE_CENTERS);

  // 검색어에 따라 요양원/보호센터 필터링
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCenters(CARE_CENTERS);
    } else {
      const filtered = CARE_CENTERS.filter(
        (center) =>
          center.name.includes(searchTerm) || 
          center.address.includes(searchTerm) || 
          center.type.includes(searchTerm),
      );
      setFilteredCenters(filtered);
    }
  }, [searchTerm]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const searchZipCode = () => {
    Alert.alert(
      "우편번호 검색",
      "우편번호 검색 기능 (실제 구현 시 다음 우편번호 API 등을 사용)",
      [
        {
          text: "확인",
          onPress: () => {
            // 모의 데이터로 채우기
            handleInputChange("zipCode", "06234");
            handleInputChange("address", "서울특별시 강남구 테헤란로 123");
          }
        }
      ]
    );
  };

  const selectCareCenter = (center: CareCenter) => {
    handleInputChange("careCenter", center);
    setIsCareCenterModalVisible(false);
  };

  const removeCareCenter = () => {
    handleInputChange("careCenter", null);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || formData.birthDate;
    setShowDatePicker(false);
    handleInputChange("birthDate", currentDate);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "생년월일을 선택하세요";
    return `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일`;
  };

  const isFormValid = (): boolean => {
    const requiredFields = [
      formData.name,
      formData.birthDate,
      formData.phone,
      formData.zipCode,
      formData.address,
      formData.detailAddress,
    ];

    // 모든 필수 필드가 채워져 있는지 확인
    const basicFieldsValid = requiredFields.every((field) => 
      field && field.toString().trim() !== ""
    );

    // 노인 이용자인 경우 요양원/보호센터 선택이 필수
    if (formData.isElderly) {
      return basicFieldsValid && formData.careCenter !== null;
    }

    return basicFieldsValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log("회원가입 데이터:", formData);
      Alert.alert("성공", "회원가입이 완료되었습니다!");
    }
  };

  const renderCareCenterItem = ({ item }: { item: CareCenter }) => (
    <TouchableOpacity
      style={styles.careCenterItem}
      onPress={() => selectCareCenter(item)}
    >
      <View style={styles.careCenterHeader}>
        <Text style={styles.careCenterName}>{item.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.careCenterAddress}>📍 {item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>서비스 이용을 위해 정보를 입력해주세요</Text>
          </View>

          <View style={styles.form}>
            {/* 이름 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>이름 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </View>

            {/* 생년월일 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>생년월일 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity
                style={[styles.input, styles.dateButton]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.dateButtonText, !formData.birthDate && styles.placeholder]}>
                  📅 {formatDate(formData.birthDate)}
                </Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={formData.birthDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                />
              )}
            </View>

            {/* 전화번호 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>전화번호 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="010-0000-0000"
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                keyboardType="phone-pad"
              />
            </View>

            {/* 주소 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>주소 <Text style={styles.required}>*</Text></Text>
              
              {/* 우편번호 */}
              <View style={styles.zipCodeContainer}>
                <TextInput
                  style={[styles.input, styles.zipCodeInput]}
                  placeholder="우편번호"
                  value={formData.zipCode}
                  onChangeText={(text) => handleInputChange("zipCode", text)}
                  editable={false}
                />
                <TouchableOpacity style={styles.searchButton} onPress={searchZipCode}>
                  <Text style={styles.searchButtonText}>🔍 검색</Text>
                </TouchableOpacity>
              </View>

              {/* 기본주소 */}
              <TextInput
                style={styles.input}
                placeholder="기본주소"
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                editable={false}
              />

              {/* 상세주소 */}
              <TextInput
                style={styles.input}
                placeholder="상세주소를 입력하세요"
                value={formData.detailAddress}
                onChangeText={(text) => handleInputChange("detailAddress", text)}
              />
            </View>

            {/* 이용자 구분 */}
            <View style={styles.inputGroup}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  const newValue = !formData.isElderly;
                  handleInputChange("isElderly", newValue);
                  if (!newValue) {
                    handleInputChange("careCenter", null);
                  }
                }}
              >
                <View style={[styles.checkbox, formData.isElderly && styles.checkboxChecked]}>
                  {formData.isElderly && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>노인 이용자입니다</Text>
              </TouchableOpacity>

              {/* 요양원/보호센터 정보 (조건부 표시) */}
              {formData.isElderly && (
                <View style={styles.careCenterSection}>
                  <Text style={styles.label}>
                    요양원/보호센터 <Text style={styles.required}>*</Text>
                  </Text>

                  {formData.careCenter ? (
                    <View style={styles.selectedCareCenter}>
                      <View style={styles.careCenterInfo}>
                        <View style={styles.careCenterHeader}>
                          <Text style={styles.selectedCareCenterName}>
                            {formData.careCenter.name}
                          </Text>
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>{formData.careCenter.type}</Text>
                          </View>
                        </View>
                        <Text style={styles.selectedCareCenterAddress}>
                          📍 {formData.careCenter.address}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={removeCareCenter}
                      >
                        <Text style={styles.removeButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.input, styles.careCenterButton]}
                      onPress={() => setIsCareCenterModalVisible(true)}
                    >
                      <Text style={styles.placeholder}>
                        🔍 요양원/보호센터를 검색하세요
                      </Text>
                    </TouchableOpacity>
                  )}

                  {formData.isElderly && !formData.careCenter && (
                    <Text style={styles.warningText}>
                      노인 이용자는 요양원/보호센터 선택이 필요합니다
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* 회원가입 버튼 */}
            <TouchableOpacity
              style={[styles.submitButton, !isFormValid() && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isFormValid()}
            >
              <Text style={[styles.submitButtonText, !isFormValid() && styles.submitButtonTextDisabled]}>
                회원가입 완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 요양원/보호센터 검색 모달 */}
      <Modal
        visible={isCareCenterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCareCenterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>요양원/보호센터 검색</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsCareCenterModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="이름 또는 주소로 검색"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            <FlatList
              data={filteredCenters}
              renderItem={renderCareCenterItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.careCenterList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  dateButton: {
    justifyContent: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholder: {
    color: '#9ca3af',
  },
  zipCodeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  zipCodeInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  careCenterSection: {
    paddingLeft: 24,
    borderLeftWidth: 2,
    borderLeftColor: '#bfdbfe',
    gap: 12,
  },
  careCenterButton: {
    justifyContent: 'center',
  },
  selectedCareCenter: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  careCenterInfo: {
    flex: 1,
  },
  careCenterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  selectedCareCenterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  selectedCareCenterAddress: {
    fontSize: 14,
    color: '#6b7280',
  },
  badge: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  warningText: {
    fontSize: 12,
    color: '#f59e0b',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  submitButtonTextDisabled: {
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#6b7280',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    margin: 20,
    marginBottom: 10,
  },
  careCenterList: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  careCenterItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  careCenterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  careCenterAddress: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#6b7280',
    fontSize: 16,
  },
});

export default SignupPage;