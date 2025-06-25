import type {
  BoxProps,
  ButtonProps,
  TextProps,
  StackProps,
} from '@chakra-ui/react';

export const containerStyle: BoxProps = {
  w: 'full',
  mx: 'auto',
  position: 'relative',
  mt: 'spacing.5',
};

export const labelStyle: TextProps = {
  fontSize: 'sm',
  position: 'absolute',
  top: '-10px',
  right: '12px',
  bg: 'white',
  px: 'spacing.1',
  zIndex: 1,
};
export const buttonStyle: ButtonProps = {
  w: 'full',
  variant: 'outline',
  justifyContent: 'space-between',
  minH: '45px',
  fontWeight: 'normal',
  bg: 'white',
  color: 'text.500',
  borderColor: 'black',
};


export const selectionBoxStyle: BoxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'spacing.2',
};

export const fallbackTextStyle: TextProps = {
  color: 'text.500', // במקום 'colors.text.600'
};


export const arrowStyle = (isOpen: boolean): BoxProps => ({
  transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
  transition: 'transform 0.2s',
});

export const optionsBoxStyle: BoxProps = {
  p: 2,
  mt: 1,
  border: '1px solid #f0f0f0',
  borderRadius: 'md',
  boxShadow: 'md',
};

export const optionsListStyle: StackProps = {
  align: 'start',
  gap: 'spacing.2',
};

export const radioItemStyle: BoxProps = {
  fontSize: 'sm',
};

export const tagStyle: BoxProps = {
  borderRadius: 'md',
  bg: 'white',
  color: 'text.500',
  border: '1px solid',
  borderColor: 'text.500',
};


export const tagLabelStyle: TextProps = {
  fontSize: 'md',
};
