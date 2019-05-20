import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationItems } from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

/* 測 component 不要測 container */
describe('<NavigationItems/>', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('should render two <NavigationItem/> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  });

  it('should render two <NavigationItem/> elements if  authenticated', () => {
    wrapper.setProps({ isAuthenticate: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  });
})

