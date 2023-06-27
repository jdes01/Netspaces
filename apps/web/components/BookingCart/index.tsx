import { Grid, VStack, GridItem, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { BookingCartItem } from './BookingCartItem';

type Props = {};

export const BookingCart: React.FunctionComponent<Props> = ({}) => {
  const today = new Date();
  return (
    <Grid
      height={500}
      width={400}
      shadow={'base'}
      borderRadius={20}
      templateRows="repeat(8, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
      padding={4}
    >
      <GridItem
        rowSpan={1}
        colSpan={1}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text>Book your spaces!</Text>
      </GridItem>
      <GridItem rowSpan={6} colSpan={2} padding={1}>
        <VStack overflowY="auto" display={'flex'} pb={2}>
          {
            <>
              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />
              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />
              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />
              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />
              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />

              <BookingCartItem
                spaceName={'espacio!'}
                initialDate={today}
                finalDate={today}
                onRemoveHandler={() => {}}
              />
            </>
          }
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Button size={'md'} width={'100%'} onClick={() => {}}>
          Clear
        </Button>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Button size={'md'} width={'100%'} onClick={() => {}}>
          Book!
        </Button>
      </GridItem>
    </Grid>
  );
};
