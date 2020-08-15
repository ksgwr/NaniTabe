import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Subscribe } from "unstated";
import * as Random from 'random-seed';

import GlobalContainer from 'app/containers/GlobalContainer';
import { MonoText } from 'app/components/StyledText';

const createFilter = (categories) => {
  // deep copy filter
  const filter = JSON.parse(JSON.stringify(categories));
  filter.enable = false;
  filter.genre.forEach(x => x.check = false);
  return filter;
}

const applyFilter = (items, filter) => {
  const enableGenre = filter.genre.filter(x => x.check).map(x => x.name);
  return items.filter(x => x.genre.find(y => enableGenre.find(z => y.indexOf(z) >= 0)));
}

const applyTargetFilter = (items, target) => {
  return items.filter(x => x.place.find(y => y.indexOf(target) >= 0));
}

const shuffleItems = (items, seed) => {
  const gen = Random.create(seed);
  //Fisher–Yates Algorithms
  for (let i = items.length - 1; i > 0; i--) {
    const r = Math.floor(gen.random() * (i + 1));
    const tmp = items[i];
    items[i] = items[r];
    items[r] = tmp;
  }
  return items;
}

class MainScreenContent extends React.Component {

  constructor(props) {
    super(props);
    const filter = createFilter(this.props.globalState.state.categories);
    this.state = {
      filter: filter,
      seed: 0,
      //items: items
    };
  }

  updateFilter = (filter) => {
    this.setState({ filter: filter });
  }

  filterClick = () => {
    const { navigation } = this.props;
    console.log(this.state.filter);
    navigation.navigate('Filter', { filter: this.state.filter, updateFilter: this.updateFilter });
  }

  shuffleClick = () => {
    this.setState({ seed: Math.random() });
  }

  render() {
    let items = [...this.props.globalState.state.dishes];
    if (this.state.seed != 0) {
      items = shuffleItems(items, this.state.seed);
    }
    items = applyTargetFilter(items, this.props.target);
    if (this.state.filter.enable) {
      items = applyFilter(items, this.state.filter);
    }

    return (
      <View style={styles.container}>
        <View style={styles.filterView}>
          {
            this.state.filter.enable ?
              this.state.filter.genre.filter(x => x.check).map((x, i) => (
                <Text
                  key={i}
                  name={x.name}>{x.name}</Text>
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
            <FlatList
              data={items}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item, index }) => (
                <ListItem
                  key={index}
                  title={item.name}
                />
              )}
            />
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

const MainScreen = ({ navigation, target }) => {
  return (
    <Subscribe to={[GlobalContainer]}>
      {globalState => <MainScreenContent globalState={globalState} navigation={navigation} target={target} />}
    </Subscribe>
  )
}

MainScreen.navigationOptions = {
  header: null,
};

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

export default MainScreen;