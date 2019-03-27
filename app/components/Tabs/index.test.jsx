import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Tabs, Tab } from '.';

describe('<Tabs />', () => {
  const props = {
    activeIndex: 0,
    onTabChange: jest.fn(),
  };

  it('renders', () => {
    const renderer = new ShallowRenderer();
    const tree = 
      renderer.render(
        <Tabs {...props}>
          <Tab>1</Tab>
          <Tab>2</Tab>
        </Tabs>
      );
    expect(tree).toMatchSnapshot();
  });
});
