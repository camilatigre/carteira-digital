import React from 'react';
import Register from './Register';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Register />', () => {
  it('Deveria renderizar a pagina de cadastro', () => {
    const component = shallow(<Register />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
