import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder'
import BuilderControls from '../../components/BuilderControls/BuilderControls';


configure({ adapter: new Adapter() })

describe('<BurgerBuilder/>', () => {
  const wrapper = shallow(<BurgerBuilder onIngredientInit={() => {}}/>)

  it('should render <BuilderControls/> elements when receive ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 0 } })
    expect(wrapper.find(BuilderControls)).toHaveLength(1)
  });
})

