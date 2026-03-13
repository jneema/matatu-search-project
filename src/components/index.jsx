import React, { useState, useRef, useEffect } from "react";
import {
  Route,
  Bookmark,
  PlusCircle,
  UserRound,
  LogIn,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const useAuth = () => {
  const [user] = useState(null);
  return user;
};

const UserMenu = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        title="Account"
      >
        <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email ?? ""}
            </p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/account");
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-4 w-4 text-gray-400" /> Account settings
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const Header = ({ currentView, setCurrentView }) => {
  const navigate = useNavigate();
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);
  const user = useAuth();

  const getCurrentStep = () => {
    switch (currentView) {
      case "landing":
        return 1;
      case "roads":
        return 2;
      case "destination":
        return 3;
      case "routes":
        return 4;
      case "stages":
        return 5;
      default:
        return 1;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              Matatu Finder
            </h1>
          </div>

          <div className="flex items-center space-x-1">
            {/* saved routes */}
            <button
              onClick={() => navigate("/saved-routes")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer"
              title="Saved Routes"
            >
              <Bookmark className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              {savedRoutes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                  {savedRoutes.length}
                </span>
              )}
            </button>

            {/* contribute */}
            <button
              onClick={() => navigate("/contribute")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title="Contribute"
            >
              <PlusCircle className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            </button>

            {user ? (
              <UserMenu user={user} />
            ) : (
              <button
                onClick={() => navigate("/sign-in")}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Sign in"
              >
                <UserRound className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Tabs - Desktop */}
        <div className="hidden md:flex items-center space-x-4 overflow-x-auto">
          {[
            { step: 1, view: "landing", label: "Towns" },
            { step: 2, view: "roads", label: "Roads" },
            { step: 3, view: "destination", label: "Destination" },
            { step: 4, view: "routes", label: "Routes" },
            { step: 5, view: "stages", label: "Stages" },
          ].map(({ step, view, label }, i, arr) => (
            <React.Fragment key={step}>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  {step}
                </div>
                <button
                  onClick={() => currentStep >= step && setCurrentView(view)}
                  disabled={currentStep < step}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === view
                      ? "bg-green-600 text-white"
                      : currentStep >= step
                        ? "text-green-600 hover:bg-green-50 cursor-pointer"
                        : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {label}
                </button>
              </div>
              {i < arr.length - 1 && (
                <div
                  className={`h-px flex-1 ${currentStep > step ? "bg-green-600" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress Tabs - Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-center space-x-2">
            {[
              { step: 1, view: "landing" },
              { step: 2, view: "roads" },
              { step: 3, view: "destination" },
              { step: 4, view: "routes" },
              { step: 5, view: "stages" },
            ].map(({ step, view }) => {
              const isClickable = currentStep >= step;
              const isActive = currentStep === step;
              return (
                <button
                  key={step}
                  onClick={() => isClickable && setCurrentView(view)}
                  disabled={!isClickable}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-green-600 text-white"
                      : isClickable
                        ? "bg-gray-200 text-green-700 hover:bg-green-100 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {step}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
