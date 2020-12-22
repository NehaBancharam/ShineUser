import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TermsAndConditions = (props) => {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginBottom: 15,
            textAlign: "center",
            color: "purple",
            fontWeight: "bold",
          }}
        >
          The terms defined below govern your use of Shine Brightly and its
          services and functionalities. By using this app, you are agreeing to
          abide by these terms.
        </Text>
        <Text>For the purposes of this Terms of Use:</Text>
        <Text>
          {"\u2B24"}“We”, “Service” and “Activities” refers to the Shine
          Brightly app.
          {"\n"}
          {"\u2B24"}“You” and “Your” refers to you as the user making use of the
          Service. {"\n"}
        </Text>

        <View>
          <Text style={{ fontWeight: "bold" }}>
            “Use at Your Own Risk” Disclaimer
          </Text>
          <Text>
            This Service is not meant to be used as an alternative for medical
            treatment or advice. All the activities that You partake in should
            be done with care. We will not be liable for any mishaps, illness or
            damages caused by Your usage of the Service. If You have any medical
            queries about participating in certain Activities, please contact
            seek professional medical advice first.{"\n"}
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Prohibited Conduct</Text>
          <Text>
            You agree to use the Service by accepting the rules and regulations
            below. Any violation of these rules shall be fully Your
            responsibility and can lead to termination of Your account. By using
            this Service, you agree not to:
            {"\n"}
            {"\u2B24"}Exhibit any behaviour such as harassment or intimidation
            to other users.{"\n"}
            {"\u2B24"}Use the Service in any manner to make it less pleasant for
            others such as posting offensive, demeaning comments on other users’
            post.{"\n"}
            {"\u2B24"}Attempt to corrupt or crash the Service by “flooding” it
            with requests.{"\n"}
            {"\u2B24"}Reverse engineer any aspect of the Service for Your
            personal gain.{"\n"}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
          <Text>
            The personal information collected by this Service will be used to
            provide You with a better experience. All information gathered will
            not be shared with anyone except by third party services used to
            identify You:{"\n"}
            {"\u2B24"}Facebook{"\n"}
            {"\u2B24"}Google Analytics for Firebase{"\n"}
            We value Your trust in providing all personal information required.
            However, no electronic media is 100% protected and thus We cannot
            guarantee its total security.
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Termination</Text>
          <Text>
            If You fail to abide by the Terms of Use, We have the right to
            terminate access to the Service and Your account. We shall not be
            held accountable for any harm or loss of information lead by the
            termination of Your account.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TermsAndConditions;
