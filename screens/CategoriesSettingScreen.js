import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Left, Right, Body, Text, View, FlatList, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { List } from 'native-base';
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';
import EditLink from 'app/components/EditLink';

const addKeyList = (target, key) => {
    target.map(x => x.key = key);
}

const createStickyHeaderIndices = (items) => {
    const arr = [];
    items.map((x, index) => {
        if (x.header) {
            arr.push(index);
        }
    });
    arr.push(0);
    return arr;
}

class CategoriesSettingScreenContent extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = props;
        this.editLinkRef = React.createRef();
        props.navigation.setOptions({
            title: 'カテゴリ管理',
            headerRight: () => (
                <EditLink ref={this.editLinkRef} editClick={this.editClick} />
            )
        });

        this.state = {
            editClick: false
        };
    }

    editClick = (isPush) => {
        const categories = this.props.globalState.state.categories;
        if (isPush) {
            Object.keys(categories).map(key =>
                categories[key].map(x => x.edit = false)
            );
            this.props.globalState.setState({ categories: categories });
        }
        this.setState({ editClick: isPush });
    }

    deleteClick = () => {
        const categories = this.props.globalState.state.categories;

        // TODO: 削除されるCategoryを料理データから全部削除
        Object.keys(categories).map(key =>
            categories[key] = categories[key].filter(x => !x.edit)
        );
        this.props.globalState.writeCategories(categories);
        this.editLinkRef.current.completeClick();
    }

    deleteClickConfirm = () => {
        Alert.alert("削除の確認",
            "削除してもよろしいですか？",
            [
                {
                    text: "キャンセル",
                    style: "cancel"
                },
                {
                    text: "削除",
                    onPress: this.deleteClick
                }
            ],
            {
                cancelable: true
            }
        )
    }

    addClick = () => {
        const { navigation } = this.props;
        navigation.navigate('AddCategory', { categories: this.props.globalState.state.categories });
    }

    itemClick = (item) => {
        const { navigation } = this.props;
        navigation.navigate('UpdateCategory', { categories: this.props.globalState.state.categories, item: item });
    }

    render() {
        const { editClick } = this.state;
        const { categories } = this.props.globalState.state;
        const { placeList, genreList, tasteList, ingredientList, dishTypeList, otherList } = categories;

        //console.log(categories);

        const firstItems = [
            { header: true, name: "場所" },
            ...placeList
        ]

        addKeyList(placeList, 'placeList');
        addKeyList(genreList, 'genreList');
        addKeyList(tasteList, 'tasteList');
        addKeyList(ingredientList, 'ingredientList');
        addKeyList(dishTypeList, 'dishTypeList');
        addKeyList(otherList, 'otherList');

        const items = [
            { header: true, name: "*ジャンル", key: "genreList" },
            ...genreList,
            { header: true, name: "*味", key: "tasteList" },
            ...tasteList,
            { header: true, name: "*材料", key: "ingredientList" },
            ...ingredientList,
            { header: true, name: "*メイン/サイド", key: "dishTypeList" },
            ...dishTypeList,
            { header: true, name: "*その他", key: "otherList" },
            ...otherList,
        ];
        // https://docs.nativebase.io/docs/examples/FlatListExample.html
        //const stickyHeaderIndices = createStickyHeaderIndices(items);

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {editClick ?
                    (
                        <Text style={{ alignSelf: 'center', margin: 20 }}>新しくカテゴリを追加</Text>
                    ) : (
                        <Text
                            style={{ alignSelf: 'center', margin: 20, color: '#03A9F4' }}
                            onPress={this.addClick}
                        >新しくカテゴリを追加</Text>
                    )
                }
                {
                    editClick ?
                        (
                            <FlatList
                                data={firstItems}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item, index }) => {
                                    if (item.header) {
                                        return <Text>{item.name}</Text>
                                    } else {
                                        return (
                                            <ListItem
                                                title={item.name}
                                            />
                                        )
                                    }

                                }}
                            />
                        ) : (
                            <FlatList
                                data={firstItems}
                                keyExtractor={(item, i) => i.toString()}
                                //stickyHeaderIndices={stickyHeaderIndices}
                                renderItem={({ item }) => {
                                    if (item.header) {
                                        return <Text>{item.name}</Text>
                                    } else {
                                        return (<ListItem
                                            title={item.name}
                                            onPress={this.itemClick.bind(this, item)}
                                        />)
                                    }
                                }}
                            />
                        )
                }
                {
                    editClick ?
                        (
                            <FlatList
                                data={items}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item, index }) => {
                                    if (item.header) {
                                        return <Text>{item.name}</Text>
                                    } else {
                                        return (
                                            <ListItem
                                                title={<CheckBox
                                                    key={index}
                                                    title={item.name}
                                                    checked={item.edit}
                                                    onPress={() => {
                                                        items[index].edit = !items[index].edit;
                                                        this.props.globalState.setState({ categories: categories });
                                                        //TODO
                                                        //this.props.globalState.setState({ dishes: items });
                                                    }}
                                                />}
                                            />
                                        )
                                    }

                                }}
                            />
                        ) : (
                            <FlatList
                                data={items}
                                keyExtractor={(item, i) => i.toString()}
                                //stickyHeaderIndices={stickyHeaderIndices}
                                renderItem={({ item }) => {
                                    if (item.header) {
                                        return <Text>{item.name}</Text>
                                    } else {
                                        return (<ListItem
                                            title={item.name}
                                            onPress={this.itemClick.bind(this, item)}
                                        />)
                                    }
                                }}
                            />
                        )
                }
                {
                    editClick &&
                    (<View style={styles.fixedDeleteView}>
                        <Button
                            icon={
                                <Icon
                                    name="delete"
                                    size={20}
                                    color="white"
                                />
                            }
                            title="選択した項目を削除"
                            onPress={this.deleteClickConfirm}
                        /></View>)
                }
            </ScrollView>
        );
    }
}

const CategoriesSettingScreen = ({ navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <CategoriesSettingScreenContent globalState={globalState} navigation={navigation} />}
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

export default CategoriesSettingScreen;