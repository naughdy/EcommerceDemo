import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BasicHeader from '../src/components/Header';

describe('BasicHeader', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(
      <BasicHeader title="Test Title" theme="light" />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('triggers left icon click function', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <BasicHeader title="Test Title" theme="light" leftIconName="arrow-left" leftIconClick={mockFn} />
    );

    fireEvent.press(getByTestId('left-icon'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('triggers right icon click function', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <BasicHeader title="Test Title" theme="light" rightIconName="arrow-right" rightIconClick={mockFn} />
    );

    fireEvent.press(getByTestId('right-icon'));
    expect(mockFn).toHaveBeenCalled();
  });
});
