import { X } from "lucide-react";
import { Activity, useState } from "react";
import { useLocation } from "react-router-dom";

const IncomingUserNotificationComponent = () => {
  const [showNotification, setShowNotification] = useState(true);
  const location = useLocation();

  const handleCloseNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <>
      {location.state?.from && (
        <Activity mode={location.state.from === "login" || location.state.from === "signup"}>
          <section className={`w-full z-50  ${showNotification ? "sticky top-0" : "hidden"}`}>
            <div className="relative h-8 flex justify-center items-center bg-secondary">
              <p className="text-lg text-center">{location.state.from === "login" ? `Welcome back ${location.state.username || "anonymous"}` : `Welcome ${location.state.username || "anonymous"}`}</p>
              <X className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" onClick={handleCloseNotification} />
            </div>
          </section>
        </Activity>
      )}
    </>
  );
};

export default IncomingUserNotificationComponent;
