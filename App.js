import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <StudentApp />
    </SafeAreaProvider>
  );
}

function StudentApp() {
  const [screen, setScreen] = useState('form');
  const [userName, setUserName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [student, setStudent] = useState(null);

 const openDetails = () => {
   const name = userName.trim().normalize('NFC');
   const id = studentId.trim();

   // Tên có dấu hoặc không dấu, chỉ gồm chữ cái và khoảng trắng.
   const isNameValid =
     /^\p{L}+(?: +\p{L}+)*$/u.test(name);

   // MSSV có dạng: B + 2 chữ cái + 22 đến 26 + 4 chữ số.
   // Ví dụ hợp lệ: BIT240025
   const isStudentIdValid =
     /^B[A-Za-z]{2}2[2-6][0-9]{4}$/.test(id);

   Keyboard.dismiss();

   if (!isNameValid || !isStudentIdValid) {
     const message =
       'Thông tin bạn nhập chưa hợp lệ.\n\n' +
       'Tên chỉ được chứa chữ cái và khoảng trắng.\n' +
       'MSSV phải có dạng B + 2 chữ cái + 22–26 + 4 chữ số.\n' +
       'Ví dụ: BIT240025.';

     setError(message);

     Alert.alert('Thông báo', message, [
       { text: 'OK' },
     ]);

     return;
   }

   setError('');

   setStudent({
     userName: name,
     studentId: id,
   });

   setScreen('details');
 };

  if (screen === 'details' && student) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quay lại màn hình nhập thông tin"
          onPress={() => setScreen('form')}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.detailsContent}>
          <Text style={styles.detailsTitle}>
            Thông tin sinh viên
          </Text>

          <Text style={styles.detailsText}>
            UserName: {student.userName}
          </Text>

          <Text style={styles.detailsText}>
            MSSV: {student.studentId}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.numberGrid}>
            {/* Hàng 1: ô 1 và ô 2 */}
            <View style={styles.numberRow}>
              <View style={[styles.numberBox, styles.blueBox]}>
                <Text style={styles.numberText}>1</Text>
              </View>

              <View style={[styles.numberBox, styles.redBox]}>
                <Text style={styles.numberText}>2</Text>
              </View>
            </View>

            {/* Hàng 2: nhóm ô 3, 4 rộng bằng ô 5 */}
            <View style={styles.numberRow}>
              <View style={styles.leftGroup}>
                <View style={[styles.numberBox, styles.yellowBox]}>
                  <Text style={[styles.numberText, styles.darkText]}>
                    3
                  </Text>
                </View>

                <View style={[styles.numberBox, styles.greenBox]}>
                  <Text style={styles.numberText}>4</Text>
                </View>
              </View>

              <View style={[styles.numberBox, styles.purpleBox]}>
                <Text style={styles.numberText}>5</Text>
              </View>
            </View>

            {/* Hàng 3: ô 6 rộng toàn hàng */}
            <View style={[styles.numberRow, styles.lastRow]}>
              <View style={[styles.numberBox, styles.orangeBox]}>
                <Text style={styles.numberText}>6</Text>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>
              Nhập thông tin sinh viên
            </Text>

            <TextInput
              accessibilityLabel="UserName"
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Enter your name"
              placeholderTextColor="#888"
              style={styles.input}
              value={userName}
              onChangeText={(value) => {
                setUserName(value);
                setError('');
              }}
            />

            <TextInput
              accessibilityLabel="MSSV"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholder="Enter your student ID"
              placeholderTextColor="#888"
              style={styles.input}
              value={studentId}
              returnKeyType="done"
              onSubmitEditing={openDetails}
              onChangeText={(value) => {
                setStudentId(value);
                setError('');
              }}
            />

            {!!error && (
              <Text
                style={styles.error}
                accessibilityLiveRegion="polite"
              >
                {error}
              </Text>
            )}

            <Pressable
              accessibilityRole="button"
              onPress={openDetails}
              style={({ pressed }) => [
                styles.clickButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.clickButtonText}>
                Click me
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flexGrow: 1,
    padding: 16,
  },

  numberGrid: {
    width: '100%',
    aspectRatio: 0.84,
    gap: 8,
  },

  numberRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },

  lastRow: {
    flex: 0.83,
  },

  leftGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },

  numberBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '700',
    includeFontPadding: false,
    textAlign: 'center',
  },

  darkText: {
    color: '#000',
  },

  blueBox: {
    backgroundColor: '#2F80ED',
  },

  redBox: {
    backgroundColor: '#FF383E',
  },

  yellowBox: {
    backgroundColor: '#FFD119',
  },

  greenBox: {
    backgroundColor: '#2EAF6D',
  },

  purpleBox: {
    backgroundColor: '#7C3BD9',
  },

  orangeBox: {
    backgroundColor: '#FF760D',
  },

  form: {
    marginTop: 'auto',
    paddingTop: 32,
    paddingBottom: 8,
  },

  formTitle: {
    color: '#333',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderColor: '#d0d0d0',
    borderRadius: 6,
    borderWidth: 1,
    color: '#222',
    fontSize: 14,
    minHeight: 42,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  error: {
    color: '#B42318',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },

  clickButton: {
    alignSelf: 'center',
    backgroundColor: '#ED8427',
    borderRadius: 6,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  clickButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.65,
  },

  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    marginLeft: 8,
  },

  backArrow: {
    color: '#000',
    fontSize: 32,
  },

  detailsContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  detailsTitle: {
    color: '#222',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },

  detailsText: {
    color: '#333',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});