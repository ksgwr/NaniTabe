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

const addCommonDataList = (target, key, editable = true) => {
    target.map(x => x.key = key);
    target.map(x => x.editable = editable);
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
        navigation.navigate('AddCategory', {
            categories: this.props.globalState.state.categories,
            dishes: this.props.globalState.state.dishes,
        });
    }

    itemClick = (item) => {
        const { navigation } = this.props;
        navigation.navigate('UpdateCategory', {
            categories: this.props.globalState.state.categories,
            dishes: this.props.globalState.state.dishes,
            item: item
        });
    }

    render() {
        const { editClick } = this.state;
        const { categories } = this.props.globalState.state;
        const { place, genre, taste, ingredient, dishType, other } = categories;

        //console.log(categories);

        addCommonDataList(place, 'place', false);
        addCommonDataList(genre, 'genre');
        addCommonDataList(taste, 'taste');
        addCommonDataList(ingredient, 'ingredient');
        addCommonDataList(dishType, 'dishType');
        addCommonDataList(other, 'other');

        const items = [
            { header: true, name: "場所", key: 'place' },
            ...place,
            { header: true, name: "*ジャンル", key: "genre" },
            ...genre,
            { header: true, name: "*味", key: "taste" },
            ...taste,
            { header: true, name: "*材料", key: "ingredient" },
            ...ingredient,
            { header: true, name: "*メイン/サイド", key: "dishType" },
            ...dishType,
            { header: true, name: "*その他", key: "other" },
            ...other,
        ];
        // https://docs.nativebase.io/docs/examples/FlatListExample.html
        //const stickyHeaderIndices = createStickyHeaderIndices(items);

        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
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
                                data={items}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item, index }) => {
                                    if (item.header) {
                                        return <Text>{item.name}</Text>
                                    } else {
                                        return item.editable ? (
                                            <ListItem>
                                                <ListItem.Content>
                                                    <ListItem.CheckBox
                                                        key={index}
                                                        title={item.name}
                                                        checked={item.edit}
                                                        onPress={() => {
                                                            items[index].edit = !items[index].edit;
                                                            this.props.globalState.setState({ categories: categories });
                                                            //TODO
                                                            //this.props.globalState.setState({ dishes: items });
                                                        }}
                                                    />
                                                </ListItem.Content>
                                            </ListItem>
                                        ) : (
                                                <ListItem>
                                                    <ListItem.Content>
                                                        <ListItem.Title>{item.name}</ListItem.Title>
                                                    </ListItem.Content>
                                                </ListItem>
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
                                            onPress={this.itemClick.bind(this, item)}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title>{item.name}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>)
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
            </View>
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