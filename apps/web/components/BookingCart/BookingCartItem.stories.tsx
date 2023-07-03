import { BookingCartItem } from './BookingCartItem';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/BookingCartItem',
  component: BookingCartItem,
  argTypes: { onRemoveHandler: { action: 'clicked' } },
} as Meta<typeof BookingCartItem>;

type Story = StoryObj<typeof BookingCartItem>;

const initialDate = new Date();

export const Primary: Story = {
  args: {
    spaceName: 'Espacio Bellako',
    initialDate: initialDate,
    finalDate: initialDate,
  },
};
