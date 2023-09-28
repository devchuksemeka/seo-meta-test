export interface Business {
  id: string;
  name: string;
  description?: string;
  image: string;
  phone: string;
  email: string;
  bannerUrl: string;
  services: string[];
  rating: number;
}
