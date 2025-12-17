import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export function useFarcasterContext() {
  const [loading, setLoading] = useState(true);
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        // Detectar si estamos dentro de Farcaster
        const context = await sdk.context;

        if (context) {
          setIsFarcaster(true);
          setUsername(context.user?.username || null);

          // 🔑 ESTA ES LA LÍNEA CRÍTICA
          sdk.actions.ready();
        }
      } catch (e) {
        // Web / embed normal
        setIsFarcaster(false);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return { loading, isFarcaster, username };
}
