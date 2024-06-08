import { useState, useEffect } from "react";

export function useChromeVersion(): [string, number] {
  const [fullVersion, setFullVersion] = useState("");
  const [majorVersion, setMajorVersion] = useState(0);

  useEffect(() => {
    const regex = /Chrome\/(\d+\.\d+\.\d+\.\d+)/;
    const match = navigator.userAgent.match(regex);

    if (match && match.length >= 2) {
      const fullVersionStr = match[1];
      const majorVersionNum = parseInt(fullVersionStr.split(".")[0], 10);

      setFullVersion(fullVersionStr);
      setMajorVersion(majorVersionNum);
    }
  }, []);

  return [fullVersion, majorVersion];
}
