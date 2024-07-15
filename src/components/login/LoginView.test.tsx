import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginView } from './LoginView';

describe('LoginView', () => {
  it('renders header label', () => {
    render(
      <LoginView
        disableLogin={false}
        onPressLogin={jest.fn()}
        onPressRegister={jest.fn()}
      />,
    );

    expect(screen.getByText('Login here')).toBeOnTheScreen();
  });

  it('renders email and password input', () => {
    render(
      <LoginView
        disableLogin={false}
        onPressLogin={jest.fn()}
        onPressRegister={jest.fn()}
      />,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeOnTheScreen();
    expect(passwordInput).toBeOnTheScreen();
  });

  it('renders buttons', () => {
    render(
      <LoginView
        disableLogin={false}
        onPressLogin={jest.fn()}
        onPressRegister={jest.fn()}
      />,
    );

    const signInButton = screen.getByText('Sign in');
    const createAccountButton = screen.getByText('Create new account');

    expect(signInButton).toBeOnTheScreen();
    expect(createAccountButton).toBeOnTheScreen();
  });

  it('handles button click', () => {
    const mockSignInFn = jest.fn();
    const mockRegisterFn = jest.fn();
    const email = 'dipankar@example.com';
    const password = 'secretpassword';

    render(
      <LoginView
        disableLogin={false}
        onPressLogin={mockSignInFn}
        onPressRegister={mockRegisterFn}
      />,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('Sign in');
    const createAccountButton = screen.getByText('Create new account');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);

    fireEvent.press(signInButton);
    expect(mockSignInFn).toHaveBeenCalledWith({
      email: email,
      password: password,
    });

    fireEvent.press(createAccountButton);
    expect(mockRegisterFn).toHaveBeenCalled();
  });
});
