import React from 'react';
import {Text,ListView} from 'react-native';

export default class MyComponent extends React.Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(
                {'1':{'1':['row 1', 'row 1'],
                '2':['row 2', 'row 2'],
                '3':['row 3', 'row 3']},
                '2':{'1':['1','2','3']}
                }),
        };
    }
    renderRow(item) {
        return <Text>{item}</Text>
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                //renderScrollComponent={rowData}
                pageSize={1}
                initialListSize={1}
            />
        );
    }
}