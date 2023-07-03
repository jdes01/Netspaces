import { SpaceDTO } from '@netspaces/contracts';
import { BookingCart, SelectedSpace } from './index';

export default {
  title: 'Components/BookingCart',
  component: BookingCart,
};

const today = new Date();

const selectedSpaces: Array<SelectedSpace> = [
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
  {
    id: '',
    name: 'Espacio bellako',
    initialDate: today,
    finalDate: today,
  },
];

export const BookingCartComponent = () => (
  <BookingCart selectedSpace={selectedSpaces} />
);
