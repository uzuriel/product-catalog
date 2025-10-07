import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { CartOverlayProps } from "~/types";

export default function CartOverlay({
  isOpen,
  onClose,
  cartItems: initialCartItems,
}: CartOverlayProps) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Sync state with parent props
  useEffect(() => {
    setCartItems(initialCartItems);
  }, [initialCartItems]);

  // Close overlay when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // --- Update quantity in DB ---
  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 0) return;

    if (newQuantity === 0) {
      const confirmDelete = confirm(
        "Quantity is 0. Do you want to remove this product from your cart?"
      );
      if (!confirmDelete) return;
      await handleDelete(productId);
      return;
    }

    await fetch(`/api/cart/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Notify navbar to refresh cart badge
    window.dispatchEvent(new Event("cart:update"));
  };

  // --- Delete product instantly ---
  const handleDelete = async (productId: number) => {
    const confirmDelete = confirm("Remove this product from your cart?");
    if (!confirmDelete) return;

    await fetch(`/api/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });

    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    window.dispatchEvent(new Event("cart:update"));
  };

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-base-100 w-96 h-full p-6 overflow-y-auto shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-primary hover:text-secondary cursor-pointer"
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

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="btn btn-xs btn-outline"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-xs btn-outline"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* 🗑️ Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 border-t pt-4">
          <p className="font-semibold text-right text-lg">
            Total: ₱{total.toLocaleString()}
          </p>

          <form
            method="post"
            action="/api/cart"
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to checkout?"))
                e.preventDefault();
            }}
          >
            <input type="hidden" name="intent" value="checkout" />
            <button className="btn btn-primary w-full mt-4">Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
}
