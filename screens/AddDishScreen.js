import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';

const initListForCheckbox = (target, defaultValue = false) => {
    target.map(x => x.checked = defaultValue);
}

const transList = (list) => {
    return list.filter(x => x.checked).map(x => x.name);
}

class AddDishScreenContent extends React.Component {

    constructor(props) {
        super(props);
        const { placeList,
            genreList,
            tasteList,
            ingredientList,
            dishTypeList,
            otherList,
        } = this.props.route.params.categories;
        initListForCheckbox(placeList, true);
        initListForCheckbox(genreList);
        initListForCheckbox(tasteList);
        initListForCheckbox(ingredientList);
        initListForCheckbox(dishTypeList);
        initListForCheckbox(otherList);
        this.state = {
            name: '',
            placeList: placeList,
            genreList: genreList,
            tasteList: tasteList,
            ingredientList: ingredientList,
            dishTypeList: dishTypeList,
            otherList: otherList,
            error: ''
        };
    }

    componentDidMount() {

    }

    changeText = (name) => {
        let error = null;
        if (name == '') {
            error = '文字を入力してください';
        } else if (this.props.globalState.state.dishes.find(x => x.name == name)) {
            error = '既に登録済みの料理名です';
        }
        this.setState({ name: name, error: error });
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

        items.push(
            {
                name: this.state.name,
                place: transList(this.state.placeList),
                genre: transList(this.state.genreList),
                taste: transList(this.state.tasteList),
                ingredients: transList(this.state.ingredientList),
                dishType: transList(this.state.dishTypeList),
                other: transList(this.state.otherList)
            }
        );

        this.props.globalState.writeDishes(items);
        navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <TextInput
                    value={this.state.name}
                    onChangeText={this.changeText}
                    placeholder="料理名"
                    style={{ width: 200, height: 44, padding: 8 }}
                />
                {this.state.error != null &&
                    (<Text style={{ color: "red" }}>{this.state.error}</Text>)
                }
                <Text>食べる場所</Text>
                {
                    this.state.placeList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'placeList')}
                        />
                    ))
                }
                <Text>ジャンル</Text>
                {
                    this.state.genreList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'genreList')}
                        />
                    ))
                }
                <Text>味</Text>
                {
                    this.state.tasteList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'tasteList')}
                        />
                    ))
                }
                <Text>材料</Text>
                {
                    this.state.ingredientList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'ingredientList')}
                        />
                    ))
                }
                <Text>メイン/サイド</Text>
                {
                    this.state.dishTypeList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'dishTypeList')}
                        />
                    ))
                }
                <Text>その他</Text>
                {
                    this.state.otherList.map((x, i) => (
                        <CheckBox
                            key={i}
                            title={x.name}
                            checked={x.checked}
                            onPress={this.clickCheck.bind(this, x, i, 'otherList')}
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
                    title="追加"
                    onPress={this.saveClick}
                    disabled={this.state.error != null}
                />
            </ScrollView>
        );
    }
}

const AddDishScreen = ({ route, navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <AddDishScreenContent globalState={globalState} navigation={navigation} route={route} />}
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

export default AddDishScreen;