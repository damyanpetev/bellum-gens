import { CSGOTeam } from './csgoteam';
import { UserNotification } from './usernotifications';
import { Availability } from './playeravailability';
import { PlaystyleRole } from './playerrole';
import { CSGOMapPool } from './csgomaps';

export interface AppUserSummary {
  Id: string;
  AvatarMedium: string;
  UserName: string;
  Roles: [];
}

export interface ApplicationUser {
  id: string;
  avatarIcon: string;
  avatarMedium: string;
  avatarFull: string;
  username: string;
  realname: string;
  customURL: string;
  steamPrivate: boolean;
  headshotPercentage: number;
  killDeathRatio: number;
  accuracy: number;
  teams: CSGOTeam [];
  teamAdmin: CSGOTeam [];
  notifications: UserNotification [];
  email: string;
  searchVisible: boolean;
  availability: Availability [];
  primaryRole: PlaystyleRole;
  secondaryRole: PlaystyleRole;
  mapPool: CSGOMapPool [];
  externalLogins: string [];
  Roles: string [];
}

export interface UserPreferences {
  email: string;
  searchVisible: boolean;
  newEmail?: boolean;
}
