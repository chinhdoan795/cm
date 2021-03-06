import React, {createContext, useContext, useEffect, useState} from "react";

const MetronicSplashScreenContext = createContext<any>(null);

export function MetronicSplashScreenProvider({children}: any) {
  const [count, setCount] = useState(0);
  let visible = count > 0;
  
  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");
    
    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");
      
      return () => {
        splashScreen.classList.add("hidden");
      };
    }
    
    // Hide SplashScreen
    let timeout: any;
    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
      }, 1000);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);
  
  return (
    <MetronicSplashScreenContext.Provider value={setCount}>
      {children}
    </MetronicSplashScreenContext.Provider>
  );
}

export function LayoutSplashScreen({visible = true}) {
  // Everything are ready - remove splashscreen
  const setCount = useContext<any>(MetronicSplashScreenContext);
  
  useEffect(() => {
    if (!visible) {
      return;
    }
    
    setCount((prev: number) => {
      return prev + 1;
    });
    
    return () => {
      setCount((prev: number) => {
        return prev - 1;
      });
    };
  }, [setCount, visible]);
  
  return null;
}
