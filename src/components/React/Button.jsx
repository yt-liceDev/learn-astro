export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-600 font-bold text-slate-100 px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-slate-200"
      disabled={disabled}
    >
      {children}
    </button>
  )
}
