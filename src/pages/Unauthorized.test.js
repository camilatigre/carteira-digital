import React from 'react';
import Unauthorized from './Unauthorized';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Unauthorized />', () => {
  it('Deveria renderizar a pagina de erro de autorização', () => {
    const component = shallow(<Unauthorized />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
