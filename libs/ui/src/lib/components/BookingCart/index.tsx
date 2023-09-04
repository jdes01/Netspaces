import { Grid, VStack, GridItem, Text, Button, Box } from '@chakra-ui/react';
import React from 'react';
import { BookingCartItem } from './BookingCartItem';
import { SpaceBook } from '../SpaceBookingPanel';

type Props = {
  spaceBooks: Array<SpaceBook>;
  onRemoveHandler: (position: number) => void;
  onClearHandler: () => void;
  onBookHandler: (spaceBooks: Array<SpaceBook>) => void;
};

export const BookingCart: React.FunctionComponent<Props> = ({
  spaceBooks,
  onRemoveHandler,
  onClearHandler,
  onBookHandler,
}) => {
  return (
    <Grid
      height={500}
      width={400}
      shadow={'base'}
      borderRadius={20}
      templateRows="1fr 320px 1fr"
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
      <GridItem rowSpan={1} colSpan={2} padding={1}>
        <VStack overflowY="auto" maxHeight="320" pb={2}>
          {spaceBooks?.map((spaceBook, index) => (
            <BookingCartItem
              key={index}
              spaceName={spaceBook.space.name}
              initialDate={spaceBook.initialDate}
              finalDate={spaceBook.finalDate}
              onRemoveHandler={() => {
                onRemoveHandler(index);
              }}
            />
          ))}
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Button size={'md'} width={'100%'} onClick={onClearHandler}>
          Clear
        </Button>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Button
          size={'md'}
          width={'100%'}
          onClick={() => {
            onBookHandler(spaceBooks);
          }}
        >
          Book!
        </Button>
      </GridItem>
    </Grid>
  );
};
