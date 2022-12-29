import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Globalstyles from '../styles';

import normalize from '../styles/normalize';
import texts from '../styles/texts';

export default function TreeLargeList(props: any) {
  const {item, onPress, height, width, paddingLeft, disabled} = props;
  let treeImageView = {...styles.treeImageView};
  if (height) {
    treeImageView.height = height;
  }

  if (width) {
    treeImageView.width = width;
  }

  if (paddingLeft) {
    treeImageView.paddingLeft = paddingLeft;
  }
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <ImageBackground
        source={require('../assets/big_tree.png')}
        style={treeImageView}
        resizeMode="contain">
        <View
          style={{
            width: normalize(218, 'width'),
          }}>
          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext14black}>{item.product_title}</Text>
            <Text style={texts.lightGree18}>₦ {item.savings}</Text>
          </View>

          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext10green}>{item.percentage_title}</Text>
            <Text style={texts.lightRed10}>₦ {item.expected}</Text>
          </View>

          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext10brown}>{item.month_title}</Text>
            <Text style={texts.darkGreen10}>
              {item.from_date} - {item.to_date}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  treeImageView: {
    width: normalize(330, 'width'),
    height: normalize(86.62, 'height'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: normalize(60, 'width'),
    paddingTop: 8,
    alignSelf: 'center',
  },
});
