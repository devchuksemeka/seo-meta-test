import { NotificationCategoryEnum } from "@/constants/notifications";
import NotificationDetail from "./notification-detail";

interface NotificationPageProps {
  params: { id: string };
  searchParams: { category: NotificationCategoryEnum; categoryId: string };
}

export default function NotificationPage(props: NotificationPageProps) {
  return <NotificationDetail {...props} />;
}
