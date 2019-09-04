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
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modalbox from 'react-native-modalbox';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IndicatorViewPager,PagerTitleIndicator } from 'rn-viewpager'
import ToolBar from '../utils/ToolBar'
import RouteManagement from "../components/Management/RouteManagement";
import TagManagement from "../components/Management/TagManagement";
import MessageManagement from "../components/Management/MessageManagement";

var {height, width} = Dimensions.get('window');

class Management extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            bgColor: new Animated.Value(0),

            //选中
            selectedIndex:1,
        }

    }

    render() {

        return (
            <View style={{flex:1}}>
                <TouchableOpacity
                    style={{height:Platform.OS=='ios'?78:48,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'flex-end',padding:10,flexDirection:'row'}}>
                    <Text style={{fontSize:20,color:'#fff',justifyContent:'center',alignItems:'center'}}>设备管理</Text>
                </TouchableOpacity>
                <View style={{flex:5,backgroundColor:'#eee'}}>
                    <Animated.View style={{opacity: this.state.fadeAnim,height:height-150,paddingBottom:5,}}>
                        <IndicatorViewPager
                            style={{flex:1,flexDirection: 'column-reverse'}}
                            indicator={this._renderTitleIndicator()}
                            onPageScroll={this._onPageScroll.bind(this)}
                        >

                            {<View style={{width:width,height:height,marginTop:10,alignItems:'center',backgroundColor:'#fff'}}><RouteManagement/></View>}
                            {<View style={{width:width,height:height,marginTop:10,alignItems:'center',backgroundColor:'#fff'}}><TagManagement/></View>}
                            {<View style={{width:width,height:height,marginTop:10,alignItems:'center',backgroundColor:'#fff'}}><MessageManagement/></View>}
                        </IndicatorViewPager>
                    </Animated.View>
                </View>
            </View>
        );
    }

    _renderTitleIndicator () {
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                trackScroll={true}
                itemTextStyle={styles.indicatorText}
                itemStyle={{width:width/3}}
                selectedItemStyle={{width:width/3}}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
                titles={['路由', '标签','信标']}
            />
        )
    }

    _onPageScroll (scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position > 1) return
    }

    componentDidMount(){
    }
}

var styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'transparent',
    },
    indicatorContainer: {
        backgroundColor: '#387ef5',
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        color: 0xFFFFFF99
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 0xFFFFFFFF
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'white'
    },
    statusBar: {
        height: 24,
        backgroundColor: 0x00000044
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: 0x00000020,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20
    }

});

const mapStateToProps = (state, ownProps) => {

    const props = {
    }

    return props
}

export default connect(mapStateToProps)(Management);
