import React, { useState, useRef, RefObject, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

interface OTPInputProps {
    length: number;
    onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null);
    const textInputRefs = useRef<RefObject<TextInput>[]>([]);

    useEffect(() => {
        textInputRefs.current = Array(length)
            .fill(null)
            .map(() => React.createRef<TextInput>());
    }, [length]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        if (text && index < length - 1) {
            textInputRefs.current[index + 1]?.current?.focus();
        }
    };

    return (
        <View style={styles.otpContainer}>
            {otp.map((_, index) => (
                <TextInput
                    key={index}
                    style={[
                        styles.underlineStyleBase,
                        focusedInputIndex === index && styles.underlineStyleFocused,
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={text => handleChange(text, index)}
                    onFocus={() => setFocusedInputIndex(index)}
                    onBlur={() => setFocusedInputIndex(null)}
                    ref={textInputRefs.current[index]}
                    value={otp[index]}
                />
            ))}
        </View>
    );
};

const OtpScreen: React.FC = () => {
    const [otp, setOtp] = useState<string>('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction onPress={() => { }} />
                    <Appbar.Content title={<Text style={styles.headerTitle}>Forgot Password</Text>} />
                </Appbar.Header>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Code has been sent to +1 111 ******99</Text>
                    <OTPInput length={4} onChange={setOtp} />
                    <Text style={styles.text}>Resend code in <Text style={styles.resendText}>55</Text> s</Text>
                    <Button
                        mode="contained"
                        onPress={() => console.log('Verify Pressed with OTP:', otp)}
                        style={styles.verifyButton}
                        textColor='white'
                    >
                        Verify
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
    resendText: {
        color: '#822BFF',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
    },
    underlineStyleFocused: {
        borderColor: 'blue',
    },
    verifyButton: {
        backgroundColor: '#822BFF',
        width: '90%',
        marginTop: 20,
        position: 'absolute',
        bottom: 50,
    },
});
