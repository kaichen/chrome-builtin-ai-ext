import { useEffect, useState } from "react";

export function useAI() {
  const [enabled, setEnabled] = useState(false);
  const [ai, setAI] = useState(null);

  useEffect(() => {
    const checkAI = async () => {
      const canCreate = await window.ai.canCreateTextSession();
      setEnabled(canCreate);
      if (canCreate) {
        const session = await window.ai.createTextSession();
        setAI(session);
      }
    };
    checkAI();
  }, []);

  return [ enabled, ai ];
}
