const BIZ_MANAGER = "biz_manager";
export type UserRoles = "biz_manager";

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  image: string;
  profileUrl: string;
  bannerUrl?: string;
  firstname: string;
  lastname: string;
  address: string;
  role: UserRoles;
}
