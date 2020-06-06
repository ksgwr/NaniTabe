import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const filter = this.props.route.params?.filter ? this.props.route.params.filter : {
      enable: false,
      genreList: [
        { name: '洋食', check: false },
        { name: '中華', check: false },
        { name: '家庭料理', check: false }
      ]
    };
    let items = [
      {
        name: 'ハンバーグ',
        genre: ['洋食'],
        taste: ['がっつり'],
        ingredients: ['牛ひき肉'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: '唐揚げ',
        genre: ['家庭料理'],
        taste: ['がっつり', '揚げ物'],
        ingredients: ['鶏肉'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'コロッケ',
        genre: ['家庭料理'],
        taste: ['揚げ物'],
        ingredients: ['ジャガイモ'],
        dishType: ['メイン', 'サイド'],
        other: []
      },
      {
        name: 'チャーハン',
        genre: ['中華'],
        taste: ['塩辛い'],
        ingredients: ['米'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'カレーライス',
        genre: ['家庭料理'],
        taste: ['辛い'],
        ingredients: ['米', 'カレー'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: '野菜炒め',
        genre: ['家庭料理'],
        taste: ['塩辛い'],
        ingredients: ['野菜'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: '生姜焼き',
        genre: ['家庭料理'],
        taste: ['がっつり'],
        ingredients: ['豚肉'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'オムライス',
        genre: ['洋食'],
        taste: [],
        ingredients: ['卵'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: '餃子',
        genre: ['中華'],
        taste: ['ツマミ'],
        ingredients: ['豚ひき肉'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'ステーキ',
        genre: ['洋食'],
        taste: ['がっつり'],
        ingredients: ['牛肉'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'しゃぶしゃぶ',
        genre: ['家庭料理'],
        taste: ['温まる'],
        ingredients: [],
        dishType: ['メイン'],
        other: []
      },
      {
        name: 'すき焼き',
        genre: ['家庭料理'],
        taste: ['温まる'],
        ingredients: ['牛肉', '卵'],
        dishType: ['メイン'],
        other: []
      },
      {
        name: '焼き肉',
        genre: ['家庭料理'],
        taste: ['がっつり'],
        ingredients: ['肉'],
        dishType: ['メイン'],
        other: []
      }
    ];
    if (filter.enable) {
      const enableGenreList = filter.genreList.filter(x => x.check).map(x => x.name);

      items = items.filter(x => x.genre.find(y => enableGenreList.find(z => y.indexOf(z) >= 0)));
    }
    this.state = {
      filter: filter,
      items: items
    }
  }

  filterClick = () => {
    const { navigation } = this.props;
    navigation.push('Filter', { filter: this.state.filter });
  }

  shuffleClick = () => {
    const array = this.state.items;
    //Fisher–Yates Algorithms
    for (let i = array.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    this.setState({ items: array });
  }

  render() {
    const { items } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.filterView}>
          {
            this.state.filter.enable ?
              this.state.filter.genreList.filter(x => x.check).map((x, i) => (
                <Text name={x.name}>{x.name}</Text>
              ))
              : <Text>条件なし</Text>
          }

          <Button
            buttonStyle={styles.filterButton}
            icon={
              <Icon
                name="filter"
                size={20}
                color="white"
              />
            }
            title="絞り込み"
            onPress={this.filterClick}
          />
        </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            {
              items.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.name}
                />
              ))
            }

          </View></ScrollView>
        <View style={styles.fixedShuffleView}>
          <Button
            icon={
              <Icon
                name="shuffle"
                size={20}
                color="white"
              />
            }
            title="シャッフル"
            onPress={this.shuffleClick}
          />
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  fixedShuffleView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    padding: 10
  },
  filterButton: {
    borderColor: '#f39c12',
    backgroundColor: '#f1c40f'
  }
});
