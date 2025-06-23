import { UserInfoList } from "../ui/UserInfoList";
import { UserProfileActions } from "../actions/UserProfileActions";
import type { PropsUserProfileInfoSection } from "../../types";

export const UserProfileInfoSection = ({ user, onEditClick, onLogoutClick }: PropsUserProfileInfoSection) => (
  <>
    <UserInfoList user={user} />
    <UserProfileActions onEditClick={onEditClick} onLogoutClick={onLogoutClick} />
  </>
);
