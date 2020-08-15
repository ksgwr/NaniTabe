import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { Subscribe } from "unstated";

import GlobalContainer from 'app/containers/GlobalContainer';

class AddCategoryScreenContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: 'genre'
        };
    }

    changeText = (name) => {
        let error = null;
        if (name == '') {
            error = '文字を入力してください';
        } else if (this.props.globalState.state.dishes.find(x => x.name == name)) {
            error = '既に登録済みのカテゴリ名です';
        }
        this.setState({ name: name, error: error });
    }

    saveClick = () => {
        const { navigation } = this.props;
        const { category, name } = this.state;
        const categories = this.props.globalState.state.categories;

        categories[category].push({
            name: name
        });

        this.props.globalState.writeCategories(categories);
        navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>親カテゴリ</Text>
                <Picker
                    selectedValue={this.state.category}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                    <Picker.Item label="ジャンル" value="genre" />
                    <Picker.Item label="味" value="taste" />
                    <Picker.Item label="材料" value="ingredient" />
                    <Picker.Item label="メイン/サイド" value="dishType" />
                    <Picker.Item label="その他" value="other" />
                </Picker>
                <TextInput
                    value={this.state.name}
                    onChangeText={this.changeText}
                    placeholder="カテゴリ名"
                    style={{ width: 200, height: 44, padding: 8 }}
                />
                {this.state.error != null &&
                    (<Text style={{ color: "red" }}>{this.state.error}</Text>)
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

const AddCategoryScreen = ({ route, navigation }) => {
    return (
        <Subscribe to={[GlobalContainer]}>
            {globalState => <AddCategoryScreenContent globalState={globalState} navigation={navigation} route={route} />}
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

export default AddCategoryScreen;