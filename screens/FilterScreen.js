import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem, Button, Icon, CheckBox } from 'react-native-elements';

export default class FilterScreen extends React.Component {
    constructor(props) {
        super(props);
        const { filter } = this.props.route.params;
        this.state = {
            genreList: filter.genreList
        };
    }

    submit = () => {
        const { navigation } = this.props;
        const filter = {
            enable: this.state.genreList.filter(x => x.check).length > 0,
            genreList: this.state.genreList
        };
        //https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state
        this.props.route.params.updateFilter(filter);
        navigation.goBack();
    }


    render() {
        const { genreList, genreCheckList } = this.state;

        return (
            <View style={styles.container}>
                <Text>絞り込み画面</Text>
                <View style={styles.term}>
                    {
                        genreList.map((genre, i) => (
                            <CheckBox
                                key={i}
                                title={genre.name}
                                checked={genre.check}
                                onPress={() => {
                                    genreList[i].check = !genreList[i].check;
                                    this.setState({ genreList: genreList })
                                }}
                            />
                        ))
                    }
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
        backgroundColor: 'yellow'
    }
});