/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

let REQUEST_URL = 'http://10.0.1.150/projects.json';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class PemApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: this.state.data.concat(responseData.content),
                    loaded: true,
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <FlatList
                title={'项目列表'}
                data={this.state.data}
                renderItem={this.renderProject}
                style={styles.list}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading projects...
                </Text>
            </View>
        );
    }

    renderProject(projectItem) {
        var project = projectItem.item;
        return (
            <View style={styles.container}>
                <Text>{projectItem.index}</Text>
                <Text style={styles.projectNO}>{project.projectNO}</Text>
                <View style={styles.rightContainer}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text style={styles.projectName}>{project.accountName}</Text>
                </View>
                <Text style={styles.year}>{project.productDate}</Text>
            </View>
        );
    }
}
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        marginTop:5
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    projectNO: {
        fontSize: 18,
        marginLeft: 5,
        marginBottom: 8,
        textAlign: 'center'
    },
    projectName: {
        fontSize: 14,
        marginBottom: 6,
        textAlign: 'center'
    },
    year: {
        marginRight: 5,
        textAlign: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    list: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    }
});
