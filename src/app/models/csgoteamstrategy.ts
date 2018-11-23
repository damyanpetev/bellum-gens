import { CSGOMap } from './csgomaps';

export interface TeamStrategy {
  Id: string;
  TeamId: string;
  Side: Side;
  Title: string;
  Description: string;
  Url: string;
  Map: CSGOMap;
}

export enum Side {
  TSide,
  CTSide
}
