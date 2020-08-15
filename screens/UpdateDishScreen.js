import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';

const initListForCheckbox = (target, checkedList) => {
    target.forEach(x =>
        checkedList.find(y => y == x.name) ?
            x.checked = true :
            x.checked = false
    );
}

const transList = (list) => {
    return list.filter(x => x.checked).map(x => x.name);
}

class UpdateDishScreenContent extends React.Component {

    constructor(props) {
        super(props);
        const { item } = this.props.route.params;
        const { place,
            genre,
            taste,
            ingredient,
            dishType,
            other,
        } = this.props.route.params.categories;
        initListForCheckbox(place, item.place);
        initListForCheckbox(genre, item.genre);
        initListForCheckbox(taste, item.taste);
        initListForCheckbox(ingredient, item.ingredient);
        initListForCheckbox(dishType, item.dishType);
        initListForCheckbox(other, item.other);
        this.state = {
            name: item.name,
            place: place,
            genre: genre,
            taste: taste,
            ingredient: ingredient,
            dishType: dishType,
            other: other,
            error: false
        };
    }

    componentDidMount() {

    }

    isChecked = (target, stateValue) => {
        return stateValue.includes(target);
    }

    clickCheck = (target, i, stateKey) => {
        const targetList = this.state[stateKey];
        targetList[i].checked = !targetList[i].checked;
        const wrap = {};
        wrap[stateKey] = targetList;
        this.setState(wrap);
    }

    saveClick = () => {
        const { navigation } = this.props;
        const items = this.props.globalState.state.dishes;
        const item = items.find(x => x.name == this.state.name)

        item.place = transList(this.state.place);
        item.genre = transList(this.state.genre);
        item.ingredient = transList(this.state.ingredient);
        item.dishType = transList(this.state.dishType);
        item.other = transList(this.state.other);

        this.props.globalState.writeDishes(items);
        navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>{this.state.name}</Text>
                <Text>食べる場所</Text>
                {
                    this.state.place.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'place')}
                        />
                    ))
                }
                <Text>ジャンル</Text>
                {
                    this.state.genre.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'genre')}
                        />
                    ))
                }
                <Text>味</Text>
                {
                    this.state.taste.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'taste')}
                        />
                    ))
                }
                <Text>材料</Text>
                {
                    this.state.ingredient.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'ingredient')}
                        />
                    ))
                }
                <Text>メイン/サイド</Text>
                {
                    this.state.dishType.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'dishType')}
                        />
                    ))
                }
                <Text>その他</Text>
                {
                    this.state.other.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'other')}
                        />
                    ))
                }
                <Button
                    icon={
                        <Icon
                            name="save"
                            size={20}
                            color="white"
                        />
                    }
                    title="更新"
                    onPress={this.saveClick}
                    disabled={this.state.error}
                />
            </ScrollView>
        );
    }
}

const UpdateDishScreen = ({ route, navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <UpdateDishScreenContent globalState={globalState} navigation={navigation} route={route} />}
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
    fixedDeleteView: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default UpdateDishScreen;