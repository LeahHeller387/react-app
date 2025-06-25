// src/theme/recipes/button.recipe.ts
import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: 'md',
    fontWeight: 'semibold',
  },
  variants: {
    visual: {
      solid: {
        bg: 'colors.brand.500',
        color: 'white',
        _hover: {
          bg: 'colors.brand.600',
        },
      },
    },
  },
  defaultVariants: {
    visual: 'solid',
  },
});
