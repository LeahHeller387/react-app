
import {
  Box,
  Heading,
  Input,
  VStack,
  Button,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../app/storeHooks';
import { useDispatch } from 'react-redux';
import { clearCart } from '../cart/cartSlice';
import { submitOrder } from '../../services/orderService';

export const OrderPage = () => {
  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.items);
  const categories = useAppSelector((state) => state.categories.list);

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    email: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    address: false,
    email: false,
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const hasError = {
    fullName: touched.fullName && form.fullName.trim() === '',
    address: touched.address && form.address.trim() === '',
    email: touched.email && !isValidEmail(form.email),
  };

const isFormValid =
  form.fullName.trim() !== '' &&
  form.address.trim() !== '' &&
  isValidEmail(form.email);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
const dispatch = useDispatch();

const handleSubmit = async () => {
  if (!isFormValid) {
    setTouched({
      fullName: true,
      address: true,
      email: true,
    });
    return;
  }

  try {
    await submitOrder({
      ...form,
      items: cartItems,
    });

    alert('ההזמנה נשלחה בהצלחה');
    setForm({ fullName: '', address: '', email: '' });
    dispatch(clearCart());
    navigate('/');
  } catch (error) {
    alert('אירעה שגיאה בשליחה לשרת');
    console.error(error);
  }
};


  const grouped = cartItems.reduce<Record<string, Record<string, number>>>((acc, item) => {
    const categoryName =
  categories.find((cat) => String(cat.id) === item.categoryId)?.name ?? 'קטגוריה לא ידועה';


    if (!acc[categoryName]) acc[categoryName] = {};
    acc[categoryName][item.name] = (acc[categoryName][item.name] || 0) + item.quantity;

    return acc;
  }, {});

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading size="lg" mb={6}>סיכום הזמנה</Heading>

      {Object.entries(grouped).map(([categoryName, products]) => (
        <Box key={categoryName} mb={4}>
          <Text fontWeight="bold" mb={1}>{categoryName}</Text>
          {Object.entries(products).map(([productName, total]) => (
            <Text key={productName}>• {productName} – {total}</Text>
          ))}
        </Box>
      ))}

      <VStack gap={4} mt={6}>
        {/* שדה שם מלא */}
        <Box w="full">
          <Text fontSize="sm" fontWeight="medium" mb={1}>שם מלא</Text>
          <Input
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
            borderColor={hasError.fullName ? 'red.500' : undefined}
          />
          {hasError.fullName && (
            <Text color="red.500" fontSize="xs" mt={1}>שדה חובה</Text>
          )}
        </Box>

        <Box w="full">
          <Text fontSize="sm" fontWeight="medium" mb={1}>כתובת מלאה</Text>
          <Input
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
            borderColor={hasError.address ? 'red.500' : undefined}
          />
          {hasError.address && (
            <Text color="red.500" fontSize="xs" mt={1}>שדה חובה</Text>
          )}
        </Box>

        <Box w="full">
          <Text fontSize="sm" fontWeight="medium" mb={1}>אימייל</Text>
          <Input
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            borderColor={hasError.email ? 'red.500' : undefined}
          />
          {hasError.email && (
            <Text color="red.500" fontSize="xs" mt={1}>נא להזין מייל תקין</Text>
          )}
        </Box>

        <Button
          colorScheme="green"
          w="full"
          mt={2}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          שלח הזמנה
        </Button>
      </VStack>
    </Box>
  );
};
