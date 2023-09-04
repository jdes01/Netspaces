import {
  Badge,
  Box,
  Grid,
  Image,
  Stack,
  GridItem,
  Text,
  Button,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React from 'react';

type Props = {
  spaceName: string;
  initialDate: Date;
  finalDate: Date;
  onRemoveHandler: () => void;
};

export const BookingCartItem: React.FunctionComponent<Props> = ({
  spaceName,
  initialDate,
  finalDate,
  onRemoveHandler,
}) => {
  return (
    <Grid
      height={50}
      width={'100%'}
      templateColumns="50px repeat(3, 1fr)"
      gap={1}
      // shadow={'base'}
      // borderRadius={20}
      paddingLeft={3}
    >
      <GridItem
        display={'flex'}
        justifyContent={'baseline'}
        alignItems={'center'}
      >
        <IconButton
          backgroundColor={'transparent'}
          aria-label="Remove item"
          icon={<CloseIcon />}
          size={'xs'}
          onClick={onRemoveHandler}
        ></IconButton>
      </GridItem>
      <GridItem colSpan={1} display={'flex'} alignItems={'center'}>
        <Text>{spaceName}</Text>
      </GridItem>
      <GridItem colSpan={2} display={'flex'} alignItems={'center'}>
        <Text>
          {initialDate.toLocaleDateString()} - {finalDate.toLocaleDateString()}
        </Text>
      </GridItem>
    </Grid>
  );
};
