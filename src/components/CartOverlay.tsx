// components/CartOverlay.tsx
import { X } from "lucide-react";
import { useEffect } from "react";
import type { CartOverlayProps } from "~/types";

export default function CartOverlay({
  isOpen,
  onClose,
  cartItems,
}: CartOverlayProps) {
  // Close overlay when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-base-100 w-96 h-full p-6 overflow-y-auto shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-primary hover:text-secondary"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-primary">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-200 pb-3"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₱{item.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 border-t pt-4">
          <p className="font-semibold text-right text-lg">
            Total: ₱
            {cartItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString()}
          </p>

          <button className="btn btn-primary w-full mt-4">Checkout</button>
        </div>
      </div>
    </div>
  );
}
