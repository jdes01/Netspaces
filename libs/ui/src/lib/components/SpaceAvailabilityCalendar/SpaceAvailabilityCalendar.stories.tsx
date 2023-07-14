import { SpaceAvailabilityCalendar } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/SpaceAvailabilityCalendar',
  component: SpaceAvailabilityCalendar,
  argTypes: { onAddSpaceBookHandler: { action: 'clicked' } },
} as Meta<typeof SpaceAvailabilityCalendar>;

type Story = StoryObj<typeof SpaceAvailabilityCalendar>;

export const Primary: Story = {
  args: {},
};
