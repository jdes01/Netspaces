import { BookingCartItem } from './BookingCartItem';

export default {
  title: 'Components/BookingCartItem',
  component: BookingCartItem,
};

const initialDate = new Date();

export const BookingCartItemComponent = () => (
  <BookingCartItem
    spaceName={'Espacio Bellaco'}
    initialDate={initialDate}
    finalDate={initialDate}
    onRemoveHandler={() => {}}
  />
);
