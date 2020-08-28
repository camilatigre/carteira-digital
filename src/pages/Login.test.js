import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<Login />', () => {
  it('Deveria renderizar a pagina de login', () => {
    const page = shallow(<Login />);
    expect(toJson(page)).toMatchSnapshot();
  });

  it('trys to loggin when button clicked', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Digite seu E-MAIL'), { target: { value: 'exemple@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Digite sua SENHA'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Entrar'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/home');
  });
});
