import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Table, TableColumn } from './index';

describe('<Table />', () => {
  const props = {
    data: [
      {
        "id": 1,
        "title": "去云南旅游",
        "price": 200,
        "date": "2018-08-01",
        "category": {
          "id": 1,
          "name": "旅行",
          "type": "outname",
        },
      },
      {
        "id": 2,
        "title": "去云南旅游",
        "price": 300,
        "date": "2018-08-01",
        "category": {
          "id": 1,
          "name": "旅行",
          "type": "outname",
        },
      },
    ],
    width: '100%',
  };

  it('renders', () => {
    const renderer = new ShallowRenderer();
    const tree = 
      renderer.render(
        <Table {...props}>
         <TableColumn prop="id" width="50" label="序号" />
         <TableColumn prop="title" label="内容" />
         <TableColumn prop="date" width="150" label="日期" />
         <TableColumn>
           <span>修改</span>
           <span>查看</span>
         </TableColumn>
       </Table>
      );
    expect(tree).toMatchSnapshot();
  });
});