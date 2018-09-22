import React from 'react';
import {Text,ListView} from 'react-native';

export default class MyComponent extends React.Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                ['row 1', 'row 1'],
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
                'row 1', 'row 1',
            ]),
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