export interface UserManagedBusinessResult {
  id: string;
  name: string;
  image: string;
}

export interface UserManagedBusinessProfileSchema {
  id: string;
  userId: string;
  businessId: string;
  business: UserManagedBusinessResult;
}
