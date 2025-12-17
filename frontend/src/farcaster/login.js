import { sdk } from "@farcaster/miniapp-sdk";

/**
 * Login Farcaster usando Miniapp SDK
 * Devuelve fid + signature + message
 */
export async function farcasterLogin() {
  const message = "Sign in to OnchainKMS";

  /**
   * requestSignIn:
   * - abre Warpcast
   * - firma el mensaje
   * - devuelve fid y signature
   */
  const result = await sdk.actions.requestSignIn({
    message,
  });

  return {
    fid: result.fid,
    signature: result.signature,
    message,
  };
}
