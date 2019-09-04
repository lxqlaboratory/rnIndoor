import React, {Component} from 'react';
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
    TextInput,
    WebView,
    DeviceEventEmitter
} from 'react-native';
import Modalbox from 'react-native-modalbox';
import SideMenu from 'react-native-side-menu';
import TreeSelect from 'react-native-tree-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Proxy from '../proxy/Proxy'
import Config from '../../config';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';

import treeselectData from '../treselect.json';
import mapSource from '../components/Html/map.png';

var {height, width} = Dimensions.get('window');

class Monitoring extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            //react-native-webview-leaflet
            mapLayers:{
                name: 'base-map',
                checked: 'true',
                type: 'TileLayer',
                baseLayer: true,
                url: mapSource
            },
            currentLocation:[51.51, -0.06],
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleMessage(e) {
    }

    sendMessage(e) {
    }

    render()
    {
        const menu =
            <View style={{backgroundColor:'#fff',flex:1,paddingTop:10}}>
                <TreeSelect
                    data={treeselectData}
                    openIds={['A01']}
                    isShowTreeId={false}
                    itemStyle={{
                        fontSize: 14,
                    }}
                    selectedItemStyle={{
                        fontSize: 14,
                    }}
                    treeNodeStyle={{
                    }}
                    onPress={(selectedLeafs)=>{
                        this.setState({isOpen:false,selectedLeafs:selectedLeafs})
                    }
                    }
                />
            </View>;

        return (
            <SideMenu
            menu={menu}                    //抽屉内的组件
            isOpen={this.state.isOpen}     //抽屉打开/关闭
            openMenuOffset={width*2 / 3}     //抽屉的宽度
            hiddenMenuOffset={0}          //抽屉关闭状态时,显示多少宽度 默认0 抽屉完全隐藏
            edgeHitWidth={40}              //距离屏幕多少距离可以滑出抽屉,默认60
            disableGestures={false}        //是否禁用手势滑动抽屉 默认false 允许手势滑动
            menuPosition={'left'}     //抽屉在左侧还是右侧
            autoClosing={true}       //默认为true 如果为true 一有事件发生抽屉就会关闭
        >
            <View style={styles.container}>

                <TouchableOpacity
                    style={{height:Platform.OS=='ios'?78:48,backgroundColor:'#387ef5',justifyContent:'flex-start',alignItems:'flex-end',padding:10,flexDirection:'row'}}
                    onPress={()=>{
                        this.setState({isOpen:true})
                    }}>
                    <Ionicons name={'md-search'} size={20} color="#fff"/>
                    <Text style={{fontSize:20,color:'#fff',marginLeft:8}}>监控节点选择</Text>
                </TouchableOpacity>

                <WebView
                    ref={monitoringWeb =>
                        this.monitoringWeb = monitoringWeb}
                    style={{flex:1}}
                    automaticallyAdjustContentInsets={true}
                    //source={require('../Html/inverse_address.html')}     //网页数据源
                    source={Platform.OS=='ios'?require('../components/Html/monitoring.html'):{uri:'file:///android_asset/monitoring.html'}}     //网页数据源
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    //接收HTML发出的数据
                    onMessage={this.handleMessage}
                    injectedJavaScript={patchPostMessageJsCode}

                />
            </View>
        </SideMenu>
        );
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
        flex: 1,
        backgroundColor:'#fff'
    },

});

export default  Monitoring
