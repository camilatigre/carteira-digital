import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('Deveria renderizar o App', () => {
  const app = shallow(<App />);
  expect(toJson(app)).toMatchSnapshot();
});
