import { LuBell } from "react-icons/lu";
import useAuth from "../../../Hooks/useAuth";
import useNotifications from "../../../Hooks/useNotifications";

const Notifications = () => {
  const { notifications, markAsRead, isLoading } = useNotifications();
  const { user } = useAuth();

  // Calculate unread notifications for the badge
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleBellClick = () => {
    // console.log("Bell clicked! Unread count:", unreadCount);
    if (unreadCount > 0 && user?.email) {
      markAsRead(); // This triggers the PATCH request to the server
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Bell Button */}
      <button
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle relative z-50"
        onMouseDown={handleBellClick}
      >
        <div className="indicator">
          <LuBell className="text-2xl" />
          {unreadCount > 0 && (
            <span className="badge badge-sm bg-blue-600 border-none text-white indicator-item">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown Content */}
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-80 rounded-xl bg-white border border-gray-100 shadow-xl p-0 overflow-hidden"
      >
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-black">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
              {unreadCount} New
            </span>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-400">
              Loading...
            </div>
          ) : notifications.length > 0 ? (
            <ul className="divide-y divide-gray-50">
              {notifications.map((notif) => (
                <li
                  key={notif._id}
                  className={`px-4 py-4 transition-colors ${
                    notif.isRead ? "bg-white" : "bg-blue-50/50"
                  }`}
                >
                  <p
                    className={`text-sm ${notif.isRead ? "text-gray-600" : "text-gray-900 font-medium"}`}
                  >
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-400 font-medium">
                No notifications yet! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
