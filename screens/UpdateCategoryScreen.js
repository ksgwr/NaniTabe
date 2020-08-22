import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';

const filterDishes = (dishes, target, name, exist) => {
    const filterDishes = dishes.filter(x => x[target].includes(name) == exist);
    filterDishes.map(x => x.edit = exist);
    filterDishes.map(x => x.initial = exist);
    return filterDishes;
}

class UpdateCategoryScreenContent extends React.Component {

    constructor(props) {
        super(props);
        const { item, dishes } = this.props.route.params;
        const enableDishes = filterDishes(dishes, item.key, item.name, true);
        const disableDishes = filterDishes(dishes, item.key, item.name, false);
        const items = [
            ...enableDishes,
            ...disableDishes
        ];
        this.state = {
            name: item.name,
            items: items,
            error: false
        };
    }

    isChecked = (target, stateValue) => {
        return stateValue.includes(target);
    }

    saveClick = () => {
        const { navigation } = this.props;

        // TODO

        navigation.goBack();
    }

    render() {
        const { items } = this.state;
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>{this.state.name}</Text>
                <Text>関連料理</Text>
                <FlatList
                    data={items}
                    keyExtractor={(item, i) => i.toString()}
                    renderItem={({ item, index }) => (
                        <ListItem
                            title={<CheckBox
                                key={index}
                                title={item.name}
                                checked={item.edit}
                                onPress={() => {
                                    items[index].edit = !items[index].edit;
                                    this.setState({ items: items });
                                }}
                            />}
                        />
                    )}
                />
                <View style={styles.fixedDeleteView}>
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
                </View>
            </View>
        );
    }
}

const UpdateCategoryScreen = ({ route, navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <UpdateCategoryScreenContent globalState={globalState} navigation={navigation} route={route} />}
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

export default UpdateCategoryScreen;