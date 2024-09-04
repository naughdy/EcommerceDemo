import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/Button';

describe('CustomButton', () => {
  it('renders correctly with title and responds to press', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <CustomButton onPress={mockFn} title="Click Me" theme="light" />
    );

    const button = getByText('Click Me');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it('shows loading indicator when disabled', () => {
    const { getByTestId } = render(
      <CustomButton onPress={() => {}} title="Click Me" theme="dark" disabled={true} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
