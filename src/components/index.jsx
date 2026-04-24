import React, { useState, useRef, useEffect } from "react";
import {
  Route,
  PlusCircle,
  Bookmark,
  UserRound,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

const steps = [
  { id: 1, view: "landing", label: "Towns" },
  { id: 2, view: "direction", label: "Direction" },
  { id: 3, view: "starting-point", label: "Starting" },
  { id: 4, view: "destination", label: "Destination" },
  { id: 5, view: "routes", label: "Routes" },
  { id: 6, view: "trip", label: "Trip" },
];

const Header = ({ currentView, setCurrentView }) => {
  const navigate = useNavigate();
  const savedRoutes = useSelector((state) => state.savedRoutes.routes);

  const currentStep = steps.find((s) => s.view === currentView)?.id ?? 1;
  const { user, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setDropdownOpen(false);
    navigate("/sign-in");
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center space-x-2">
            <Route className="h-6 w-6 md:h-8 md:w-8 text-green-600 shrink-0" />
            <h1 className="hidden xs:block text-base md:text-xl font-bold text-gray-800 sm:block">
              Matatu Finder
            </h1>
          </div>

          <div className="flex items-center shrink-0">
            <button
              onClick={() => navigate("/saved-routes")}
              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer"
              title="Saved Routes"
            >
              <Bookmark className="h-5 w-5 text-gray-600" />
              {savedRoutes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {savedRoutes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/contribute")}
              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title="Contribute"
            >
              <PlusCircle className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-1 p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Account"
              >
                {isLoading ? (
                  <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
                ) : user ? (
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <UserRound className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-100 flex flex-col items-start text-left">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 shrink-0" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/signin");
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <LogIn className="h-4 w-4 shrink-0" />
                        Sign in
                      </button>
                      <button
                        onClick={() => {
                          navigate("/signup");
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <UserPlus className="h-4 w-4 shrink-0" />
                        Create account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-1 lg:space-x-2">
                <div
                  className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold shrink-0 ${
                    currentStep >= step.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <button
                  onClick={() =>
                    currentStep >= step.id && setCurrentView(step.view)
                  }
                  disabled={currentStep < step.id}
                  className={`px-2 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    currentView === step.view
                      ? "bg-green-600 text-white"
                      : currentStep >= step.id
                        ? "text-green-900 hover:bg-green-50 cursor-pointer"
                        : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {step.label}
                </button>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px flex-1 min-w-[8px] ${
                    currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="md:hidden pb-3">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() =>
                    currentStep >= step.id && setCurrentView(step.view)
                  }
                  disabled={currentStep < step.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                    currentStep >= step.id
                      ? "bg-green-600 text-white cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {step.id}
                </button>
                {index < steps.length - 1 && (
                  <div className="h-px flex-1 bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-start mt-1.5">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="w-8 shrink-0 relative">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-light leading-tight text-center ${
                      currentStep >= step.id
                        ? "text-green-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
                {index < steps.length - 1 && <div className="flex-1" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
