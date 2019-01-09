import { SteamUser } from './steamuser';
import { CSGOTeam } from './csgoteam';
import { UserNotification } from './usernotifications';

export interface ApplicationUser {
  SteamUser: SteamUser;
  Teams: CSGOTeam [];
  TeamAdmin: CSGOTeam [];
  Notifications: UserNotification [];
}