import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhyChooseUs from '../WhyChooseUs';
import { ChakraProvider } from '@chakra-ui/react';

describe('WhyChooseUs Component', () => {
  it('renders heading and 4 benefit cards', () => {
    render(
      <ChakraProvider>
        <WhyChooseUs />
      </ChakraProvider>
    );

    // Main heading
    expect(screen.getByText('Why Choose Calmpus?')).toBeInTheDocument();

    // Check for benefit headings
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument();
    expect(screen.getByText('Secure Payments')).toBeInTheDocument();
    expect(screen.getByText('Affordable Prices')).toBeInTheDocument();
    expect(screen.getByText('Quality Products')).toBeInTheDocument();
  });

  it('renders 4 icons', () => {
    render(
      <ChakraProvider>
        <WhyChooseUs />
      </ChakraProvider>
    );

    const icons = screen.getAllByRole('img'); // Chakra icons render with role img
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });
});
