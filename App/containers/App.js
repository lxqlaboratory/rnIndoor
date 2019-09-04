import React, { Component } from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Alert,
    InteractionManager,
    ToolbarAndroid,
    Modal,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator';
import {
    PAGE_LOGIN,
    PAGE_PASSWORDFORGET,

} from '../constants/PageStateConstants';

import Login from './Login';
import Monitoring from './Monitoring';
import ReTrack from './ReTrack';
import Alarm from './Alarm';
import Management from './Management';

import {
    updateRootTab
}  from '../actions/TabActions';

var {height, width} = Dimensions.get('window');

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Monitoring;

        switch (route) {
            case '实时监控':
                component = Monitoring;
                break;
            case '轨迹回放':
                component = ReTrack;
                break;
            case '人员报警':
                component = Alarm;
                break;
            case '设备管理':
                component = Management;
                break;
            default:
                break;
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === route}
                title={route}
                titleStyle={{color:'#9e9ca3',fontSize:13}}
                selectedTitleStyle={{color:'#387ef5'}}
                renderIcon={() => <Ionicons name={icon} size={26} color="#aaa"/>}
                renderSelectedIcon={() => <Ionicons name={icon} size={26} color='#387ef5' />}
                onPress={() => {
                    this.setState({ selectedTab: route });
                    this.props.dispatch(updateRootTab({tab:route}));
                }}
                tabStyle={{backgroundColor:'transparent',}}
                onSelectedStyle={{backgroundColor:'#eeecf3',}}
            >

                <View style={{flex:1,}}>
                    <Navigator
                        initialRoute={{ name: route, component:component }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                          }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            return (<Component {...route.params} navigator={navigator} />);
                          }}

                    />
                </View>
            </TabNavigator.Item>
        );
    }


    constructor(props) {
        super(props);
        this.state={
            tab:'Map',
            selectedTab:props.tab.rootTab,
            name:null,
        }
    }

    render() {

        var props=this.props;
        let auth=this.props.auth;
        var {tab}=this.props
        if(auth==true)
        {

            var defaultStyle={
                backgroundColor:'#eeecf3',
                paddingBottom:5,
                paddingTop:5,
                height:60
            }

            var defaultSceneStyle={
            }

            if(tab.hidden==true)
            {
                defaultStyle.height=0
                defaultStyle.paddingBottom=0
                defaultStyle.paddingTop=0
                defaultSceneStyle.paddingBottom=0
            }


            return (

                <TabNavigator  tabBarStyle={defaultStyle} sceneStyle={defaultSceneStyle}>
                    {this._createNavigatorItem('实时监控','md-pin')}
                    {this._createNavigatorItem('轨迹回放','md-locate')}
                    {this._createNavigatorItem('人员报警','md-notifications')}
                    {this._createNavigatorItem('设备管理','md-build')}
                </TabNavigator>
            );
        }else{
                return (<Login/>);
        }
    }
}

const patchPostMessageFunction = function() {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(
    (state) => ({
        tab:state.tab,
        auth:state.user.auth,
        page:state.page,
        alarm:state.alarm,
    })
)(App);
