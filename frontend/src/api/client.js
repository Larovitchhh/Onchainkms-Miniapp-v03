export async function getMe(fid) {
  const res = await fetch("/api/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fid }),
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
