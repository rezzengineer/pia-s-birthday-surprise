import { useState } from "react";
import LockScreen from "@/components/LockScreen";
import MainPage from "@/components/MainPage";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return <MainPage />;
};

export default Index;
