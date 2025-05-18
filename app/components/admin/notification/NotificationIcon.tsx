"use client";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { NotificationsNoneOutlined as Notification } from "@mui/icons-material";
import { useUI } from "@/app/components/admin/ui/UIContext";
import { useGetNotificationsQuery } from "@/lib/admin/store/services/notification.service";
const NotificationIcon = () => {
  const { openRightSidebar } = useUI();
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetNotificationsQuery({});
  return (
    <IconButton
      className="w-10 h-10 border border-primary-800"
      onClick={openRightSidebar}
    >
      <Badge
        color="primary"
        variant="dot"
        //invisible={notifications.length === 0}
        invisible={notificationsData?.pendingCount ? true : false}
      >
        {/* {props.children} */}
        <Notification />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;
