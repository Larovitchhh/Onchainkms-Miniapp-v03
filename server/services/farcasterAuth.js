const fetch = require("node-fetch");

async function verifyFarcasterLogin({ fid, signature, message }) {
  const res = await fetch(
    "https://api.neynar.com/v2/farcaster/signin/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.NEYNAR_API_KEY,
      },
      body: JSON.stringify({
        fid,
        signature,
        message,
      }),
    }
  );

  const data = await res.json();
  return data && data.success === true;
}

module.exports = {
  verifyFarcasterLogin,
};
