import React, {useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';

import HTMLView from 'react-native-htmlview';

import {CommonStyles, Colors, Typography} from '../.././theme';
import Footer from '../../shared/footer';

const Terms = props => {
  const {navigation} = props;

  const win = Dimensions.get('window');
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.privacy}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Terms of Use</Text>
              <View style={styles.titleBorder}></View>
            </View>
            <View>
              <Text>
                Welcome to our Web site. By using any of our web sites
                (frost.com, store.frost.com, go.frost.com, hub.frost.com,
                brandanddemandsolutions.com, pdsxchange.com,
                growthinnovationleadership.com, customercontactmindxchange.com,
                cxmindxchange, starmindxchange.com, gilcouncil.com, or
                customerleadershipcouncil.com), you are agreeing to comply with
                and be bound by the following terms of use. Please review the
                following terms carefully. If you do not agree to these terms,
                you should not use this site. The term “Frost & Sullivan” or
                “us” or “we” or “our” refers to Frost & Sullivan, Inc., the
                owner of the Web sites. The term “you” refers to the user or
                viewer of our Web Site.
                {'\n'}
                {'\n'}
              </Text>
              <Text>
                1. Acceptance of Agreement.
                {'\n'}
                {'\n'}
                You agree to the terms and conditions outlined in this Terms of
                Use Agreement (“Agreement”) with respect to all of our sites
                (the “Site”). This Agreement constitutes the entire and only
                agreement between us and you, and supersedes all prior or
                contemporaneous agreements, representations, warranties and
                understandings with respect to the Site, the content, products
                or services provided by or through the Site, and the subject
                matter of this Agreement. This Agreement may be amended at any
                time by us from time to time without specific notice to you. The
                latest Agreement will be posted on the Site, and you should
                review this Agreement prior to using the Site.
                {'\n'}
                {'\n'}
                2. Copyright.
                {'\n'}
                {'\n'}
                The content, organization, graphics, design, compilation,
                magnetic translation, digital conversion and other matters
                related to the Site are protected under applicable copyrights,
                trademarks and other proprietary (including but not limited to
                intellectual property) rights. The copying, redistribution, use
                or publication by you of any such matters or any part of the
                Site, except as allowed by Section 4 below, is strictly
                prohibited. You do not acquire ownership rights to any content,
                document or other materials viewed through the Site. The posting
                of information or materials on the Site does not constitute a
                waiver of any right in such information and materials. Some of
                the content on the site is the copyrighted work of third
                parties.
                {'\n'}
                {'\n'}
                3. Service Marks.
                {'\n'}
                {'\n'}
                “Frost.com”, “Brandandemandsolutions.com”, “Pdsxchange.com”,
                “Growthinnovationleadership.com”,
                “Customercontactmindxchange.com”, “Cxmindxchange”,
                “Starmindxchange.com”, “Gilcouncil.com”, or
                “Customerleadershipcouncil.com” and others are our service marks
                or registered service marks or trademarks. Other product and
                company names mentioned on the Site may be trademarks of their
                respective owners.
                {'\n'}
                {'\n'}
                4. Limited License; Permitted Uses.
                {'\n'}
                {'\n'}
                You are granted a non-exclusive, non-transferable, revocable
                license (a) to access and use the Site strictly in accordance
                with this Agreement; (b) to use the Site solely for internal,
                personal, non-commercial purposes; and (c) to print out discrete
                information from the Site solely for internal, personal,
                non-commercial purposes and provided that you maintain all
                copyright and other policies contained therein. No print out or
                electronic version of any part of the Site or its contents may
                be used by you in any litigation or arbitration matter
                whatsoever under any circumstances.
                {'\n'}
                {'\n'}
                5. Restrictions and Prohibitions on Use.
                {'\n'}
                {'\n'}
                Your license for access and use of the Site and any information,
                materials or documents (collectively defined as “Content and
                Materials”) therein are subject to the following restrictions
                and prohibitions on use: You may not (a) copy, print (except for
                the express limited purpose permitted by Section 4 above),
                republish, display, distribute, transmit, sell, rent, lease,
                loan or otherwise make available in any form or by any means all
                or any portion of the Site or any Content and Materials
                retrieved therefrom; (b) use the Site or any materials obtained
                from the Site to develop, of as a component of, any information,
                storage and retrieval system, database, information base, or
                similar resource (in any media now existing or hereafter
                developed), that is offered for commercial distribution of any
                kind, including through sale, license, lease, rental,
                subscription, or any other commercial distribution mechanism;
                (c) create compilations or derivative works of any Content and
                Materials from the Site; (d) use any Content and Materials from
                the Site in any manner that may infringe any copyright,
                intellectual property right, proprietary right, or property
                right of us or any third parties; (e) remove, change or obscure
                any copyright notice or other proprietary notice or terms of use
                contained in the Site; (f) make any portion of the Site
                available through any timesharing system, service bureau, the
                Internet or any other technology now existing or developed in
                the future; (g) remove, decompile, disassemble or reverse
                engineer any Site software or use any network monitoring or
                discovery software to determine the Site architecture; (h) use
                any automatic or manual process to harvest information from the
                Site; (i) use the Site for the purpose of gathering information
                for or transmitting (1) unsolicited commercial email; (2) email
                that makes use of headers, invalid or nonexistent domain names,
                or other means of deceptive addressing; and (3) unsolicited
                telephone calls or facsimile transmissions; (j) use the Site in
                a manner that violates any state or federal law regulating
                email, facsimile transmissions or telephone solicitations; and
                (k) export or re-export the Site or any portion thereof, or any
                software available on or through the Site, in violation of the
                export control laws or regulations of the United States.
              </Text>
            </View>
          </View>
          <View style={styles.cta}>
            <Button
              style={[
                styles.button,
                styles.plainButton,
                {backgroundColor: Colors.SECONDARY_BUTTON_COLOR},
              ]}
              onPress={() => Linking.openURL('mailto:contact@frost.com')}>
              <Text style={[styles.buttonText, styles.plainButtonText]}>
                Contact Our Program Team
              </Text>
            </Button>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </>
  );
};
export default Terms;
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  header: {
    ...CommonStyles.header,
    marginTop: Platform.OS === 'ios' ? 120 : 62,
    width: '100%',
    marginLeft: 32,
    marginRight: 32,
  },
  privacy: {
    padding: 30,
  },
  title: {
    marginBottom: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 30,
    fontWeight: '600',
  },
  titleBorder: {
    height: 5,
    width: 50,
    backgroundColor: 'rgba(24,56,99,1)',
  },
  aboutImage: {
    marginBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundText: {
    padding: 30,
    flex: 1,
    backgroundColor: '#1f71cc',
  },
  backgroundTitle: {
    paddingBottom: 30,
  },
  backgroundTitleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 30,
  },
  backgroundTitleBorder: {
    height: 5,
    width: 50,
    backgroundColor: '#fff',
  },
  backgroundParagraph: {
    color: '#fff',
  },
  cta: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    ...CommonStyles.button,
    height: 60,
    width: 380,
    backgroundColor: Colors.SECONDARY_BUTTON_COLOR,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    fontFamily: Typography.FONT_BOLD,
    fontSize: 15,
  },
  iconImage: {
    width: 300,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 14,
  },
  plainButton: {
    width: '70%',
    borderRadius: 25,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  plainButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  poweredBy: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});
