
import {
  Box,
  Button,
  Text,
  VStack,
  RadioGroup,
  Spinner,
} from '@chakra-ui/react';
import {
  containerStyle,
  labelStyle,
  buttonStyle,
  selectionBoxStyle,
  fallbackTextStyle,
  arrowStyle,
  optionsBoxStyle,
  optionsListStyle,
  radioItemStyle,
  tagLabelStyle,
} from './CategorySelector.styles';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/storeHooks';
import { fetchCategories } from './categoriesSlice';

type Props = {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string) => void;
};

export const CategorySelector = ({ selectedCategory, onCategoryChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectedOption = list.find((opt) => opt.id.toString() === selectedCategory);

  if (loading) return <Spinner size="md" />;
  if (error) return <Text color="red.500">שגיאה בטעינת קטגוריות</Text>;

  return (
    <Box css={containerStyle}>
      <Text css={labelStyle}>בחר קטגוריה</Text>

      <Button onClick={() => setIsOpen((prev) => !prev)} css={buttonStyle}>
        <Box css={selectionBoxStyle}>
          {selectedOption ? (
            <Text css={tagLabelStyle}>{selectedOption.name}</Text>
          ) : (
            <Text css={fallbackTextStyle}>בחר קטגוריה</Text>
          )}
        </Box>
        <Box css={arrowStyle(isOpen)}>
          <img src="/static/icons/arrow-left-black.svg" alt="toggle" />
        </Box>
      </Button>

      {isOpen && (
        <Box css={optionsBoxStyle}>
          <RadioGroup.Root
            value={selectedCategory ?? ''}
            onValueChange={(details) => {
              if (details.value) {
                onCategoryChange(details.value);
                setIsOpen(false);
              }
            }}
          >
            <VStack {...optionsListStyle}>
              {list.map((opt) => (
                <RadioGroup.Item
                  key={opt.id}
                  value={opt.id.toString()}
                  {...radioItemStyle}
                  _checked={{ fontWeight: 'bold' }}
                >
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemText>{opt.name}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </VStack>
          </RadioGroup.Root>
        </Box>
      )}
    </Box>
  );
};
