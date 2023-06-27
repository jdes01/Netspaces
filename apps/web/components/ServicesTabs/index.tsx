import { Tab, TabList } from '@chakra-ui/react';

type ServicesTabsProps = {
  services: string[];
};

export function ServicesTabs({ services }: ServicesTabsProps) {
  return (
    <TabList>
      {services.map((service) => (
        <Tab>{service}</Tab>
      ))}
    </TabList>
  );
}
