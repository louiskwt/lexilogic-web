import React, {createContext, useContext, useEffect, useState} from "react";

type DeviceContextType = {
  isMobile: boolean;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === null) throw new Error("useDevice must be used withint a DeviceProvider");
  return context;
};

export const DeviceProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return <DeviceContext.Provider value={{isMobile}}>{children}</DeviceContext.Provider>;
};
