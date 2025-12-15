export default function Mint({ isFarcaster }) {
  if (!isFarcaster) {
    return <p>Minting is available in the mini app.</p>;
  }

  return (
    <div>
      <h3>Mint</h3>
      <p style={{ opacity: 0.6 }}>
        Mint your verified activity as onchain reputation.
      </p>
    </div>
  );
}
