import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DiaLog from './index';

describe('<DiaLog />', () => {
  it('renders', () => {
    const renderer = new ShallowRenderer();
    const tree = 
      renderer.render(
        <DiaLog
          ref={(ele) => {this.dom = ele;}}
          visible={false}
          title="对话框"
          buttons={[
            {text: '取消', func: jest.fn()},
            {text: '保存', func: jest.fn()},
          ]}
        >
          内容...
        </DiaLog>
      );
    expect(tree).toMatchSnapshot();
  });
});