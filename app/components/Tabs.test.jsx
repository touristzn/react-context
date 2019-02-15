import { shallow } from 'enzyme';
import Tabs from './Tabs.jsx';

const props = {
  activeIndex: 0,
  onTabChange: () => {},
}

// describe('test Tabs component', () => {
  // it('component should render correct activeIndex number', () => {
  //   const wrapper = enzyme.shallow(<Tabs activeIndex={props.activeIndex} onTabChange={props.onTabChange} />);
  //   console.log(wrapper);
  // })
// });