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
import {  Cell,DataTable,Header,HeaderCell,Row,EditableCell,CheckableCell,} from 'react-native-data-table'
import SideMenu from "./Monitoring";
import ToolBar from "./Management";

var {height, width} = Dimensions.get('window');

class Alarm extends Component {

    constructor(props){
        super(props);
        this.state = {
            alarmList:[
                {"item1": 1, "item2" : 154, "item3" : '路径违规', "item4":'07-05 18:19:57',"item5": 75785700, "item6" : 4554, "item7" : '删除'},
                {"item1": 2, "item2" : 1, "item3" : '人数超员', "item4":'07-03 00:00:00',"item5": 1, "item6" : 1, "item7" : '删除'},
            ]
        };
    }

    render(){

        var alarmListView=null;
        var alarmList = this.state.alarmList;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (alarmList !== undefined && alarmList !== null && alarmList.length > 0)
        {
            alarmListView = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(alarmList)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style={{height:Platform.OS=='ios'?78:48,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'flex-end',padding:10,flexDirection:'row'}}>
                    <Text style={{fontSize:20,color:'#fff',justifyContent:'center',alignItems:'center'}}>人员报警</Text>
                </TouchableOpacity>
                {this.renderHeader()}
                {alarmListView}
            </View>
        )
    }

    renderHeader() {
        return (
            <Header>
                <HeaderCell style={styles.headerCell} key="1" text="编号" width={1} />
                <HeaderCell style={styles.headerCell} key="2" text="卡片" width={1}/>
                <HeaderCell
                    style={styles.headerCell}
                    key="3"
                    text="详情"
                    width={1}
                    isAscending={false}
                />
                <HeaderCell
                    style={styles.headerCell}
                    key="4"
                    text="时间"
                    width={1}
                    isAscending={false}
                />
                <HeaderCell
                    style={styles.headerCell}
                    key="5"
                    text="X轴"
                    width={1}
                    isAscending={false}
                />
                <HeaderCell
                    style={styles.headerCell}
                    key="6"
                    text="Y轴"
                    width={1}
                    isAscending={false}
                />
            </Header>
        );
    }

    renderRow(item) {
        let rowStyle = item.no %2 === 0  ? styles.whiteRow : styles.row;
        return (
            <Row style={rowStyle}>
                <Cell style={styles.cell} width={1}>
                    {item.item1}
                </Cell>
                <Cell style={styles.cell} width={3}>
                    {item.item2}
                </Cell>
                <Cell style={styles.cell} width={3}>
                    {item.item3}
                </Cell>
                <Cell style={styles.cell} width={3}>
                    {item.item4}
                </Cell>
                <Cell style={styles.cell} width={3}>
                    {item.item5}
                </Cell>
                <Cell style={styles.cell} width={3}>
                    {item.item6}
                </Cell>
            </Row>
        );
    }

    onCheckablePress() {}

    onColumnSort() {}

    componentDidMount(){
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
    },
    headerCell: {
        height: 40,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        justifyContent: 'center',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    alignTextLeft: {
        marginLeft: 20,
        textAlign: 'left',
    },
    whiteRow: {
        height: 35,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    row: {
        height: 35,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    alignTextCenter: {
        textAlign: 'center',
        justifyContent: 'center',
    },
});


const mapStateToProps = (state, ownProps) => {

    const props = {
    }

    return props
}

export default connect(mapStateToProps)(Alarm);
