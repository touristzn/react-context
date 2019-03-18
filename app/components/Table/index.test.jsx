import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { Table, TableColumn } from './index';

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
  onModify: jest.fn(),
  onCheck: jest.fn(),
};

let wrapper;

describe('test Table and TableColumn Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Table {...props}>
        <TableColumn prop="id" width="50" label="序号" />
        <TableColumn prop="title" label="内容" />
        <TableColumn prop="date" width="150" label="日期" />
        <TableColumn>
          <span onClick={() => {}}>修改</span>
          <span onClick={() => {}}>查看</span>
        </TableColumn>
      </Table>
    )
  })

  it('should render the component to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render correct tr length and td length', () => {
    const th = wrapper.find('table thead tr th');
    console.log(th.length)
    console.log(wrapper.find(Table).children.length)
    expect(wrapper.find('tr')).toHaveLength(props.data.length + 1);
  })
  // it('Whether the TableColumn prop property has props in it', () => {
  //   const itemProp = wrapper.find(Table).first().props();
  //   console.log(itemProp);
  // })
});