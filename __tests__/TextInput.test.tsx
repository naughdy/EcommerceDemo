import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from '../src/components/TextInput';

describe('CustomTextInput', () => {
  it('renders correctly with placeholder and handles input', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Enter text" theme="light" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();

    fireEvent.changeText(input, 'New text');
    expect(onChangeText).toHaveBeenCalledWith('New text');
  });

  it('applies the correct theme styles', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Enter text" theme="dark" />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.style).toContainEqual(expect.objectContaining({ color: '#fff' }));
  });
});
