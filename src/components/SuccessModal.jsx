import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function SuccessModal({ open, onClose, title, message, showLogin }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4" />
        <h2 className="font-bold text-2xl mb-2 text-[#8a7462]">{title}</h2>
        <p className="text-[#655548] mb-6">{message}</p>
        <div className="flex flex-col gap-2">
          <button
            className="bg-[#cc9fa4] text-white font-bold py-3 rounded-lg shadow hover:bg-[#a67a80] transition"
            onClick={onClose}
          >
            Fechar
          </button>
          {showLogin && (
            <button
              className="bg-green-500 text-white font-bold py-3 rounded-lg shadow hover:bg-green-600 transition"
              onClick={onClose}
            >
              Fazer Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
