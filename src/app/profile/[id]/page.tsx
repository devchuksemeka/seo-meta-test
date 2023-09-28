import { NotificationCategoryEnum } from "@/constants/notifications";
import Profile from "./profile";

interface ProfilePageProps {
  params: { id: string };
  searchParams: { category: NotificationCategoryEnum; categoryId: string };
}

export default function NotificationPage(props: ProfilePageProps) {
  return <Profile {...props} />;
}
