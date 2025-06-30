"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface WarningModalProps {
  user?: any;
  onButtonClick?: () => void;
}

export default function WarningModal({
  user,
  onButtonClick,
}: WarningModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
//   console.log("userId", user.sub);

  useEffect(() => {
    if (user) {
      const modalShown = sessionStorage.getItem(`modalShown`);
      if (!modalShown) {
        setIsOpen(true);
        sessionStorage.setItem(`modalShown`, "true");
      }
    }
  }, [user]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    onButtonClick?.() || router.push(`/profile/${user.sub}`);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative mx-auto p-8 animate-scaleIn">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        <div className="flex flex-col items-center">
          <div className="mb-5 p-4 bg-yellow-50 rounded-full">
            <ExclamationTriangleIcon className="h-14 w-14 text-yellow-500" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
            Completa tu perfil
          </h3>

          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            Para una mejor experiencia en nuestra plataforma, por favor completa
            los datos de tu perfil si no lo has completado.
          </p>

          <div className="flex gap-3 w-full">
            {/* <button
              onClick={closeModal}
              className="flex-1 py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Más tarde
            </button> */}
            <button
              onClick={handleButtonClick}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Ir al perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
