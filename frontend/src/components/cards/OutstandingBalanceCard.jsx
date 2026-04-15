function OutstandingBalanceCard({ balance, onPay }) {
  return (
    <div className="min-h-65 border border-gray-400 bg-white p-8">
      <p className="text-base font-medium uppercase text-black">
        Total Outstanding Balance
      </p>

      <h2 className="mt-6 text-6xl font-bold text-black">{balance}</h2>

      <button
        onClick={onPay}
        className="mt-8 rounded-2xl bg-black px-8 py-4 text-base font-medium text-white"
      >
        Pay Outstanding
      </button>
    </div>
  );
}

export default OutstandingBalanceCard;