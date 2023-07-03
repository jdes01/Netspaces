import { SpaceBookingPanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/SpaceBookingPanel',
  component: SpaceBookingPanel,
  argTypes: { onBookSpaces: { action: 'clicked' } },
} as Meta<typeof SpaceBookingPanel>;

type Story = StoryObj<typeof SpaceBookingPanel>;

const initialDate = new Date();

export const Primary: Story = {
  args: {
    spaces: [
      {
        _id: '234523423',
        workspaceId: '',
        name: '1',
        quantity: 1,
        seats: 2,
        amenitys: [],
      },
      {
        _id: '25634',
        workspaceId: '',
        name: '2',
        quantity: 1,
        seats: 2,
        amenitys: [],
      },
      {
        _id: '235423',
        workspaceId: '',
        name: '3',
        quantity: 1,
        seats: 2,
        amenitys: [],
      },
      {
        _id: '23452',
        workspaceId: '',
        name: '4',
        quantity: 1,
        seats: 2,
        amenitys: [],
      },
    ],
    workspace: {
      _id: '542323',
      name: '',
      companyId: '',
      description: '',
      street: '',
      city: '',
      country: '',
      services: ['WIFI'],
    },
  },
};
