/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useEffect, useState } from "react";

import type { WebAppInitData } from "@/src/types";

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
function useTelegramInitData() {
  const [data, setData] = useState<WebAppInitData | any>({});

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(new URLSearchParams(window.Telegram.WebApp.initData));

    const initData: Record<string, string> = {};

    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(initData);
  }, []);

  return data;
}

export default useTelegramInitData;