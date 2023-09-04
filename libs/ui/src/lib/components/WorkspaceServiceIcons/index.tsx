import { FaWifi, FaParking } from 'react-icons/fa';
import { MdOutlineKitchen } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { BiCoffeeTogo } from 'react-icons/bi';
import { AiOutlinePrinter } from 'react-icons/ai';
import React, { ReactElement } from 'react';

export enum WorkspaceServicesIconCodes {
  WIFI = 'WIFI',
  KITCHEN = 'KITCHEN',
  COFFEE = 'COFFEE',
  PRINTER = 'PRINTER',
  PARKING = 'PARKING',
}

export function iconMapper(label: string): ReactElement<any, any> | undefined {
  if (label === 'WIFI') return <FaWifi />;
  if (label === 'KITCHEN') return <MdOutlineKitchen />;
  if (label === 'COFFEE') return <BiCoffeeTogo />;
  if (label === 'PRINTER') return <AiOutlinePrinter />;
  if (label === 'PARKING') return <FaParking />;
}
