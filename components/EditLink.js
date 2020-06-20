import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class EditLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPushed: false
        }
    }

    completeClick = () => {
        this.setState({ isPushed: false });
        this.props.editClick(false);
    }

    editClick = () => {
        this.setState({ isPushed: true });
        this.props.editClick(true);
    }

    render() {
        if (this.state.isPushed) {
            return (<Text style={styles.link} onPress={this.completeClick}>完了</Text>)
        } else {
            return (<Text style={styles.link} onPress={this.editClick}>編集</Text>)
        }
    }
}

const styles = StyleSheet.create({
    link: {
        color: '#03A9F4'
    }
});