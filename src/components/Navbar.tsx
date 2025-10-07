import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import { NavLink, Form } from "react-router";
import CartOverlay from "./CartOverlay";

export default function Navbar({ user }: { user?: any }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // 🧠 Fetch user's cart
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart", { credentials: "include" });
      const data = await res.json();
      const items = data.cart || [];
      setCartItems(items);

      // Count unique product IDs
      const uniqueProductIds = new Set(items.map((item: any) => item.id));
      setCartCount(uniqueProductIds.size);
    };

    fetchCart();

    // Re-fetch when overlay is opened or cart updates
    if (isCartOpen) fetchCart();

    window.addEventListener("cart:update", fetchCart);
    return () => window.removeEventListener("cart:update", fetchCart);
  }, [isCartOpen]);

  console.log("Navbar user:", user);

  return (
    <header className="flex flex-row justify-between items-center px-8 py-4">
      <NavLink to="/" end>
        <img src="/logo.svg" alt="Logo" className="h-16 w-24" />
      </NavLink>

      {/* 🧭 Navigation Links */}
      <nav className="hidden *:text-white *:font-poppins lg:flex flex-row gap-8 items-center">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products" end>
          Products
        </NavLink>
      </nav>

      {/* 🛒 User Section */}
      <nav className="flex flex-row text-primary-content gap-8 items-center relative">
        {user ? (
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer hover:opacity-80"
            title="View Cart"
          >
            <ShoppingCart className="w-6 h-6" />

            {/* 🧮 Badge count */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-highlight-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        ) : (
          <NavLink to="/login" className="cursor-pointer hover:opacity-80">
            <ShoppingCart className="w-6 h-6" />
          </NavLink>
        )}

        {/* 👤 User Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer flex flex-row gap-2 items-center"
          >
            <User />
            {user && <span>{user.username}</span>}
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 text-primary shadow-sm w-32 p-2 z-10 rounded-lg mt-2 text-center"
          >
            {user ? (
              <li>
                <Form method="post" action="/logout" reloadDocument>
                  <button
                    type="submit"
                    className="text-center w-full cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg py-1"
                  >
                    Log out
                  </button>
                </Form>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="block hover:bg-primary hover:text-primary-content rounded-lg py-1"
                >
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* 🧩 Cart Overlay */}
      <CartOverlay
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </header>
  );
}
