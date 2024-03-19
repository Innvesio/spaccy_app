import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../components";

const Terms = ({ navigation }) => {
  navigation.setOptions({
    title: "Terms and Conditions",

    headerLeft: () => <BackButton onPress={() => navigation.pop()} />,
  });
  return (
    <View className="flex-1">
      <ScrollView className="p-5 space-y-7">
        {/*  */}
        <View>
          <Text className="font-bold text-base text-stone-700">
            DISCLAIMER AND SERVICES
          </Text>
          <View className="mt-3 space-y-2">
            <Text className="font-semibold text-stone-600 text-sm">
              This page sets out our Terms and Conditions on which the “Service
              Provider,” “space owner,“ “vendor” or “service user” or any of
              representative of the foregoing agrees to be bound, by making use
              of Spaccy Innovation Limited (“Spaccy”) Services and by accepting
              this Terms and Conditions.
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              In this Terms and Conditions, where the pronouns “we”, “us” or
              “our” is used, same refers to of Spaccy Innovation Limited and
              where “you” or “your” is used, same refers jointly or
              alternatively to the service providers and the user, depending on
              the context of use.
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              Where the term “Service Provider or “Service Providers” is used
              same refers to “space owners”, “venue owners” or “vendors”
              registered with Spaccy.
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              Where the term “User” or “users” is used same refers to
              “customers” and “service users” on the Spaccy platform.
            </Text>
          </View>
        </View>
        {/*  */}
        {/*  */}
        <View>
          <Text className="font-bold text-base text-stone-700">
            YOUR ATTENTION IS DRAWN IN PARTICULAR TO THE PROVISIONS OF THIS
            AGREEMENT, WHICH ENTITLES US TO CHARGE COMMISSION ON ANY BOOKINGS
            YOU RECEIVE AS A RESULT OF USING SERVICES PROVIDED BY US.
          </Text>
          <View className="mt-3 space-y-2">
            <Text className="font-semibold text-stone-600 text-sm">
              These Terms and Conditions are to be read in conjunction with our
              other rules/policies (privacy policy, cookies policy as published
              by Spaccy from time to time or executed agreements) before
              accessing or using any of our platforms. Kindly note that this
              Website is operated by Spaccy;
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              This Terms and Conditions constitute a binding agreement between
              Spaccy and any person using any section of this website, or our
              Apps or any of our Services;
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              Please read these Terms and Conditions carefully as they contain
              important information regarding your legal rights, remedies and
              obligations. These include various limitations, exclusions and
              obligations to comply with applicable laws, rules, regulations and
              policies.
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              Your continued use of the Website and/or any of our platform or
              our Services, as the case may be, shall constitute your acceptance
              to be bound by this Terms and Conditions. However, you may be
              required to accept this Terms and Conditions expressly by clicking
              on the ‘I ACCEPT’ icon below. Solely for the purpose of
              documentation, we may also ask you, or any of your representative,
              to accept these terms via our Site or by signing these terms
              either physically or electronically.
            </Text>
            <Text className="font-semibold text-stone-600 text-sm">
              Kindly note that the use of our site, apps, search features or any
              other service we provide constitutes use of our service for which
              you are bound by our Terms and Conditions.
            </Text>
          </View>
        </View>
        {/*  */}
      </ScrollView>
    </View>
  );
};

export default Terms;
