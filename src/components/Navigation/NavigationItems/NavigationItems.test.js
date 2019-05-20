import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationItems } from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

/* 測 component 不要測 container */
describe('<NavigationItems/>', () => {
  const wrapper = shallow(<NavigationItems />)

  it('should render two <NavigationItem/> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  });

  describe('if authenticated', () => {
    beforeEach(() => {
      wrapper.setProps({ isAuthenticate: true })
    })

    it('should render two <NavigationItem/> elements if  authenticated', () => {     
      expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });

    it('should render one <NavigationItem/> for Logout', () => {     
      const navigationItem = <NavigationItem link='/Logout'>Logout</NavigationItem>
      expect(wrapper.contains(navigationItem)).toEqual(true)
    });
  })
})

