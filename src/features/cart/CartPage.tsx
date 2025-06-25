import {
  Box,
  Button,
  Input,
  NumberInput,
  Text,
  VStack,
  Heading,
  Grid,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CategorySelector } from '../categories/CategorySelector';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/storeHooks';
import { addItem } from '../cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import type { CartItem } from '../cart/types';
import type { RootState } from '../../app/store';

export const CartPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [productError, setProductError] = useState(false);
  const [quantity, setQuantity] = useState('1');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state: RootState) => state.categories.list);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const onlyHebrew = input.replace(/[^א-ת\s]/g, '');

    setProductName(onlyHebrew);

    const isInvalid = input !== onlyHebrew || onlyHebrew.trim().length < 2;
    setProductError(isInvalid);
  };

  const handleAddToCart = () => {
    if (!selectedCategory || !productName.trim() || productError) return;

    const numericQuantity = parseInt(quantity, 10);
    if (isNaN(numericQuantity) || numericQuantity < 1) return;

    const category = categories.find((cat) => String(cat.id) === selectedCategory);
    if (!category) return;

    dispatch(
      addItem({
        id: uuidv4(),
        name: productName.trim(),
        quantity: numericQuantity,
        categoryId: selectedCategory,
        categoryName: category.name,
      })
    );

    setProductName('');
    setQuantity('1');
    setProductError(false);
  };

  const groupedByCategory = cartItems.reduce<Record<string, CartItem[]>>((acc, item) => {
    if (!acc[item.categoryName]) acc[item.categoryName] = [];
    acc[item.categoryName].push(item);
    return acc;
  }, {});

  return (
    <Box w="full" maxW="lg" mx="auto" mt={8}>
      <Text p={4} fontSize="xl" textAlign="center" fontWeight="bold">
        בחר מוצרים
      </Text>

      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <VStack gap={4} mt={6} align="stretch">
        <Box>
          <Input
            placeholder="שם מוצר"
            value={productName}
            onChange={handleProductChange}
            disabled={!selectedCategory}
            borderColor={productError ? 'red.500' : undefined}
          />
          {productError && (
            <Text fontSize="xs" color="red.500" mt={1}>
              נא למלא שם מוצר באותיות עבריות בלבד (לפחות 2 אותיות)
            </Text>
          )}
        </Box>

        <NumberInput.Root
          value={quantity}
          onValueChange={(e) => setQuantity(e.value)}
          min={1}
          disabled={!selectedCategory}
        >
          <NumberInput.Control />
          <NumberInput.Input placeholder="כמות" />
        </NumberInput.Root>

        <Button
          onClick={handleAddToCart}
          disabled={!selectedCategory || !productName || productError}
          colorScheme="blue"
        >
          הוסף לסל
        </Button>
      </VStack>

      <Grid
        mt={10}
        gap={6}
        templateColumns={{ base: '1fr', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        {Object.entries(groupedByCategory).map(([categoryName, products]) => (
          <Box key={categoryName} borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="md" mb={2}>{categoryName}</Heading>
            <VStack align="start" gap={2}>
              {products.map((prod) => (
                <Text key={prod.id}>• {prod.name} – {prod.quantity}</Text>
              ))}
            </VStack>
          </Box>
        ))}
      </Grid>

      {cartItems.length > 0 && (
        <Button
          colorScheme="green"
          mt={6}
          w="full"
          onClick={() => navigate('/orderPage')}
        >
          המשך להזמנה
        </Button>
      )}
    </Box>
  );
};
