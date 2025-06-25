import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(
  {
    ...defaultConfig,
  },
  {
    theme: {
      tokens: {
        colors: {
          brand: {
            500: { value: '#46a2f9' },
            600: { value: '#007ab8' },
          },
          light:{
            500: { value: 'white' },
          },
          text: {
            500: { value: '#231b1b' },
            600: { value: '#303030' },
          },
        },
        spacing: {
          1: { value: '4px' },
          2: { value: '8px' },
          3: { value: '12px' },
          4: { value: '16px' },
          5: { value: '20px' },
        },
        fontSizes: {
          sm: { value: '0.875rem' }, // 14px
          md: { value: '1rem' },     // 16px
          lg: { value: '1.125rem' }, // 18px
          xl: { value: '1.25rem' },  // 20px
        },
        fonts: {
          heading: { value: `'Rubik', sans-serif` },
          body: { value: `'Rubik', sans-serif` },
        },
      },
      semanticTokens: {
        colors: {
          brand: {
            solid: { value: '{colors.brand.500}' },
            contrast: { value: 'white' },
            _hover: { value: '{colors.brand.600}' },
          },
        },
      },
      recipes: {
        Text: {
          base: {
            fontFamily: 'body',
            color: 'colors.text.500',
          },
        },
        Heading: {
          base: {
            fontFamily: 'heading',
            color: 'colors.text.500',
          },
        },
      },
    },
  }
);
