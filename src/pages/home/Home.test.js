import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { useGlobalState } from '../../common/context/GlobalState';

jest.mock('../../common/context/GlobalState');

describe('<Home />', () => {
  it('Deveria renderizar a pagina inicial', () => {
    useGlobalState.mockReturnValue({
      coins: {
        reais: {
          amount: 100000,
        },
        bitcoins: {
          buy: 64656.45,
          sell: 64656.45,
          amount: 0,
        },
        brita: {
          buy: 5.57,
          sell: 5.57,
          amount: 0,
        },
      },
    });

    const component = shallow(<Home />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
