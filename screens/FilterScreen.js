import * as React from 'react';
import { Image, Platform, StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements';

const addCommonDataList = (target, key) => {
    target.map(x => x.key = key);
}

const checkEnable = (filter) => {
    return filter.genre.some(x => x.check)
        || filter.taste.some(x => x.check)
        || filter.ingredient.some(x => x.check)
        || filter.dishType.some(x => x.check)
        || filter.other.some(x => x.check);
}


export default class FilterScreen extends React.Component {
    constructor(props) {
        super(props);
        const { filter } = this.props.route.params;
        this.state = {
            filter: filter
        };
    }

    submit = () => {
        const { navigation } = this.props;
        const { filter } = this.state;
        filter.enable = checkEnable(filter);
        this.props.route.params.updateFilter(filter);
        navigation.goBack();
    }


    render() {
        const { filter } = this.state;
        const { genre, taste, ingredient, dishType, other } = filter;

        addCommonDataList(genre, 'genre');
        addCommonDataList(taste, 'taste');
        addCommonDataList(ingredient, 'ingredient');
        addCommonDataList(dishType, 'dishType');
        addCommonDataList(other, 'other');

        const items = [
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
        ]

        return (
            <View style={styles.container}>
                <Text>絞り込み画面</Text>
                <View style={styles.term}>
                    <FlatList
                        data={items}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item, index }) => {
                            if (item.header) {
                                return <Text>{item.name}</Text>
                            } else {
                                return <CheckBox
                                    key={index}
                                    title={item.name}
                                    checked={item.check}
                                    onPress={() => {
                                        items[index].check = !items[index].check;
                                        this.setState({ filter: filter });
                                    }}
                                />
                            }
                        }}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        icon={
                            <Icon
                                name="undo"
                                size={20}
                                color="#9E9E9E"
                            />
                        }
                        type="outline"
                        title="取り消す"
                    />
                    <Button
                        icon={
                            <Icon
                                name="check"
                                size={20}
                                color="white"
                            />
                        }
                        title="決定"
                        onPress={this.submit}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'gray'
    },
    term: {
        flexDirection: 'row',
    },
    bottom: {
        flexDirection: 'row',
        backgroundColor: 'yellow',
        marginBottom: 100
    }
});