import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { Tabs, Tab } from './Tabs.jsx';

const props = {
  activeIndex: 0,
  onTabChange: jest.fn(),
}

let wrapper;

describe('test Tabs and Tab Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Tabs {...props}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </Tabs>
    )
  })

  it('should render the component to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render two Tab component, first one should be active', () => {
    expect(wrapper.find(Tab).length).toEqual(2)
    expect(wrapper.find('.tab-link').length).toEqual(2)
    expect(wrapper.state().activeIndex).toEqual(0)
    expect(wrapper.find('.tab-link').first().hasClass('active')).toEqual(true)
  })
  it('click the 2nd Tab should change the active stauts and trigger the right function', () => {
    wrapper.find('.tab-link').last().simulate('click', { preventDefault: () => {}})
    expect(wrapper.find('.tab-link').first().hasClass('active')).toEqual(false)
    expect(wrapper.find('.tab-link').last().hasClass('active')).toEqual(true)
    expect(wrapper.state().activeIndex).toEqual(1)
    expect(props.onTabChange).toHaveBeenCalledWith(1)
  })
});