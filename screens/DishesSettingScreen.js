import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { List } from 'native-base';
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';
import EditLink from 'app/components/EditLink';

class DishesSettingScreenContent extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = props;
        this.editLinkRef = React.createRef();
        props.navigation.setOptions({
            title: '料理管理',
            headerRight: () => (
                <EditLink ref={this.editLinkRef} editClick={this.editClick} />
            )
        });

        this.state = {
            editClick: false
        };
    }

    editClick = (isPush) => {
        const items = this.props.globalState.state.dishes;
        if (isPush) {
            items.map(x => x.edit = false);
            this.props.globalState.setState({ dishes: items });
        }
        this.setState({ editClick: isPush });
    }

    deleteClick = () => {
        let items = this.props.globalState.state.dishes;

        items = items.filter(x => !x.edit);

        this.props.globalState.writeDishes(items);
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
        navigation.navigate('AddDish', { categories: this.props.globalState.state.categories });
    }

    itemClick = (name) => {
        const { navigation } = this.props;
        const item = this.props.globalState.state.dishes.find(x => x.name == name);
        navigation.navigate('UpdateDish', { categories: this.props.globalState.state.categories, item: item });
    }

    render() {
        const { editClick } = this.state;
        const items = this.props.globalState.state.dishes;

        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                {editClick ?
                    (
                        <Text style={{ alignSelf: 'center', margin: 20 }}>新しく料理を追加</Text>
                    ) : (
                        <Text
                            style={{ alignSelf: 'center', margin: 20, color: '#03A9F4' }}
                            onPress={this.addClick}
                        >新しく料理を追加</Text>
                    )
                }
                {
                    editClick ?
                        (
                            <FlatList
                                data={items}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item, index }) => (
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{<CheckBox
                                                key={index}
                                                title={item.name}
                                                checked={item.edit}
                                                onPress={() => {
                                                    items[index].edit = !items[index].edit;
                                                    this.props.globalState.setState({ dishes: items });
                                                }}
                                            />}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )}
                            />
                        ) : (
                            <FlatList
                                data={items}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item }) => (
                                    <ListItem
                                        onPress={this.itemClick.bind(this, item.name)}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                {item.name}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )}
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

const DishesSettingScreen = ({ navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <DishesSettingScreenContent globalState={globalState} navigation={navigation} />}
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

export default DishesSettingScreen;