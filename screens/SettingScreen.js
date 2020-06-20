import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import { List } from 'native-base';
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';

const baseSettings = [
  {
    name: '料理名から管理',
    view: 'DishesSetting'
  },
  {
    name: 'カテゴリから管理',
    view: 'CategoriesSetting'
  },
  /*{
    name: '検索エンジンを設定'
  },*/
  {
    name: 'データをリセット'
  },
  {
    name: 'バージョン情報',
    view: 'Version'
  }
];

class SettingScreenContent extends React.Component {

  constructor(props) {
    super(props);
  }

  resetClick = () => {
    this.props.globalState.reset();
  }

  itemClick = (view) => {
    if (!view) {
      Alert.alert('データリセット',
        "料理とカテゴリのデータを初期状態に戻しますか？一度削除するとデータは復元できません。",
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          { text: "リセット", onPress: this.resetClick }
        ],
        {
          cancelable: false
        }
      )
      return;
    }
    const { navigation } = this.props;
    navigation.navigate(view);
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          baseSettings.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              onPress={this.itemClick.bind(this, item.view)}
              bottomDivider
              topDivider
            />
          ))
        }
      </ScrollView>
    );
  }
}

const SettingScreen = ({ navigation }) => {
  return (
    <Subscribe to={[GlobalContainer]}>
      {globalState => <SettingScreenContent globalState={globalState} navigation={navigation} />}
    </Subscribe>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default SettingScreen;