import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";

export function useFarcasterContext() {
  const [state, setState] = useState({
    loading: true,
    isFarcaster: false,
    fid: null,
    username: null,
    pfp: null,
  });

  useEffect(() => {
    async function loadContext() {
      try {
        const context = await sdk.getContext();

        if (!context?.user) {
          setState({
            loading: false,
            isFarcaster: false,
            fid: null,
            username: null,
            pfp: null,
          });
          return;
        }

        setState({
          loading: false,
          isFarcaster: true,
          fid: context.user.fid,
          username: context.user.username,
          pfp: context.user.pfp || null,
        });
      } catch (err) {
        console.error("Farcaster context error", err);
        setState({
          loading: false,
          isFarcaster: false,
          fid: null,
          username: null,
          pfp: null,
        });
      }
    }

    loadContext();
  }, []);

  return state;
}
