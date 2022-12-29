import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
// import normalize from '../../styles/normalize';
// import Layout from '../../components/Layout';
import Globalstyles from '../../styles';
import Texts from '../../styles/texts';
import Swiper from 'react-native-swiper';
import normalize from '../../styles/normalize';
import {LogoIcon, OnBoard1, OnBoard2, OnBoard3} from '../../assets/svgs';
import {DEVICE_WIDTH} from '../../constants';
import styles from './styles';
import {Button, InactiveButton, Layout} from '../../components';
import {Colors} from '../../constants';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const promotiondata = [
  {
    image: (
      <OnBoard1
        height={normalize(300, 'height')}
        width={normalize(300, 'width')}
      />
    ),
  },
  {
    image: (
      <OnBoard2
        height={normalize(300, 'height')}
        width={normalize(300, 'width')}
      />
    ),
  },
  {
    image: (
      <OnBoard3
        height={normalize(300, 'height')}
        width={normalize(300, 'width')}
      />
    ),
  },
];

const Onboarding: React.FC<Props> = props => {
  //States
  const [indexes, setIndex] = useState(0);

  //Helpers

  useEffect(() => {
    NotificationCall();
    createChannel();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.notification);
      callPushNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });
    const unsubscribes = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log(remoteMessage.notification);
        callPushNotification(
          remoteMessage.notification?.title,
          remoteMessage.notification?.body,
        );
      },
    );
  }, []);

  const createChannel = async () => {
    PushNotification.createChannel(
      {
        channelId: '120', // (required)
        channelName: 'Monietree channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const callPushNotification = async (title, body) => {
    // {"android": {"sound": "default"}, "body": "You have withdraw trans#12312321312313", "title": "Transactions"}
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: '120',
        title: title,
        message: body,
        playSound: true,
        soundName: 'default',
        actions: '',
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: 'userAction',
        title: title,
        subtitle: body,
        category: 'test',
        threadId: 'thread-id',
        repeats: true,
      });
    }
  };

  const onScrollEvent = event => {
    if (
      indexes !=
      (event.nativeEvent.contentOffset.x / (DEVICE_WIDTH * 0.72)).toFixed()
    ) {
      console.log('-------start=-------');
      console.log(indexes);
      if (
        (event.nativeEvent.contentOffset.x / (DEVICE_WIDTH * 0.72)).toFixed() >
        indexes
      ) {
        setIndex(indexes + 1);
      } else {
        setIndex(indexes - 1);
      }
    }
  };

  // api calls
  const NotificationCall = async () => {
    await messaging().registerDeviceForRemoteMessages();

    await messaging()
      .getToken()
      .then(async a => {
        console.log('token', a);
        await AsyncStorage.setItem('notification_token', `${a}`);
      })
      .catch(e => {
        console.log('notification token error');
      });
  };

  // Constants

  const goToSignIn = async () => {
    props.navigation.navigate('Signup');
  };
  const goToLogIn = async () => {
    props.navigation.navigate('Login');
  };

  const renderSwiper = () => {
    return (
      <View
        style={{
          height: normalize(420, 'height'),
        }}>
        <Swiper
          dot={<View style={styles.dotStyles} />}
          activeDot={<View style={styles.activeDotStyles} />}>
          <View style={Globalstyles.swiperStyle}>
            <Text style={Texts.heading24TextGreen}>
              Save your money and watch it grow!
            </Text>

            <View style={Globalstyles.tiny17Gap} />
            <OnBoard1
              height={normalize(220, 'height')}
              width={normalize(300, 'width')}
            />
            <View style={Globalstyles.tinyGap} />
            <Text style={Texts.heading14Text}>
              Beyond having another app to save your money, monieTree goes above
              and beyond to bring you the best interest rates in the market!
            </Text>
          </View>
          <View style={Globalstyles.swiperStyle}>
            <Text style={Texts.heading24TextGreen}>
              Fix your money and get high interest rates
            </Text>
            <OnBoard2
              height={normalize(252, 'height')}
              width={normalize(350, 'width')}
            />
            <Text style={Texts.heading14Text}>
              Fix your money for longer periods to get the maximum returns on
              your money!
            </Text>
          </View>
          <View style={Globalstyles.swiperStyle}>
            <Text style={Texts.heading24TextGreen}>
              Grow with the monieTree Community
            </Text>
            <OnBoard3
              height={normalize(252, 'height')}
              width={normalize(360, 'width')}
            />
            <Text style={Texts.heading14Text}>
              Join our growing community and be part of the early seeders and
              enjoy a bountiful harvest!
            </Text>
          </View>
        </Swiper>
      </View>
    );
  };

  // Main
  return (
    <Layout>
      <View style={Globalstyles.smallGap} />
      <LogoIcon height={55.66} width={75.97} />
      <View style={Globalstyles.bigGap} />

      {/* <View style={Globalstyles.smallGap} /> */}

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        snapToInterval={DEVICE_WIDTH * 0.72}
        horizontal
        onScroll={event => onScrollEvent(event)}>
        {promotiondata.map((item, index) => {
          // Alert.alert(item.thumbnail)
          return (
            <TouchableOpacity
              style={{marginHorizontal: 10, justifyContent: 'center'}}>
              <View>{item.image}</View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
      {renderSwiper()}
      {/* <TouchableOpacity
        style={{
          width: normalize(334, 'width'),
          height: 50,
          backgroundColor: Colors.primaryButtonColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        <Text>ss</Text>
      </TouchableOpacity> */}
      <Button title={'Open a FREE account'} onPress={goToSignIn}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        title={'I already have an account.'}
        linkText={' Sign in'}
        backgroundColor={'white'}
        onPress={goToLogIn}></InactiveButton>
    </Layout>
  );
};

export default Onboarding;
