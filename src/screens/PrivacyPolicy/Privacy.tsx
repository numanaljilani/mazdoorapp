import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import icons from '../../constants/icons';
import {Image} from 'react-native';
import { bg_color2, secondary_text_color, text_color } from '../../constants/color';
import { useSelector } from 'react-redux';

const Privacy = ({navigation}: any) => {
  const {language , dark} = useSelector((state: any) => state?.user);
  return (
    <ScrollView>
      <View className={`${bg_color2(dark)} px-6 py-5`}>
        <View className="flex-row gap-x-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.back} className="w-7 h-7" tintColor={dark ? "white" : "black"}/>
          </TouchableOpacity>
          <Text className={`${text_color(text_color(dark))} text-xl font-[Poppins-Medium] text-medium`}>
            Privacy Policy
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            1. Information We Collect
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            <Text className={`${secondary_text_color(dark)} text-base font-[Poppins-Regular]`}>
              Personal Information :
            </Text>{' '}
            We only collect personal information that you choose to provide,
            such as your name, email address, and phone number (if you contact
            us through the App).
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            2. How We Use Your Information:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            The information we collect is used to operate the App effectively,
            improve features, personalize your experience (if applicable), send
            marketing communications (with your consent), respond to inquiries,
            analyze App usage, and comply with legal requirements.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            3. Disclosure of Your Information:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We may disclose your information to trusted service providers
            (confidentiality agreements), for legal reasons (court orders), or
            during business transfers (mergers, acquisitions).
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            4. Data Retention:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We retain your information for as long as necessary for the stated
            purposes. It may be kept longer for legal or record-keeping needs.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            5.Your Rights:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
          You have the right to access, correct, delete, restrict processing, and object to marketing use of your information.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            6. Security
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no internet or electronic storage system is 100% secure. We
            cannot guarantee the security of your information.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            7. Children's Privacy:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
          Our App is not intended for children under 14. We don't knowingly collect their personal information.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            8. Changes to this Privacy Policy:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
          We may update this policy. We'll notify you within the App.
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            9. Contact Us:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
          Have questions? Contact us at [ Email ] (and phone number if applicable).
          </Text>
        </View>
        <View className="py-2">
          <Text className={`${text_color(dark)} text-base font-[Poppins-Medium] text-medium`}>
            10. Additional Information:
          </Text>
          <Text className={`${secondary_text_color(dark)} text-sm font-[Poppins-Light]`}>
          A more detailed explanation of each point is available in the full Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Privacy;
