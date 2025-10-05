import { ShoppingCart, User } from "lucide-react";
import { NavLink, Form } from "react-router";
import { useState } from "react";
import CartOverlay from "./CartOverlay";

export default function Navbar({ user }: { user?: any }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Temporary mock data (replace later with real DB data)
  const cartItems = [
    {
      id: 1,
      name: "AULA Keyboard",
      price: 2999,
      quantity: 1,
      imageUrl: "/keyboard.jpg",
    },
    {
      id: 2,
      name: "AULA Mouse",
      price: 1599,
      quantity: 2,
      imageUrl: "/mouse.jpg",
    },
  ];

  return (
    <>
      <header className="flex flex-row justify-between items-center px-8 py-4">
        <NavLink to="/" end>
          <img src="/logo.svg" alt="Logo" className="h-16 w-24" />
        </NavLink>

        <nav className="hidden *:text-white *:font-poppins lg:flex flex-row gap-8 items-center">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products" end>
            Products
          </NavLink>
          <NavLink to="/about-us" end>
            About AULA
          </NavLink>
        </nav>

        <nav className="flex flex-row text-primary-content gap-8 items-center">
          {/* 🛒 Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer"
            title="View cart"
          >
            <ShoppingCart />
          </button>

          {/* 👤 User dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <User />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 text-primary shadow-sm w-32 p-2 z-10 rounded-lg text-center mt-2"
            >
              {user ? (
                <li>
                  <Form method="post" action="/logout" reloadDocument>
                    <button
                      type="submit"
                      className="text-center w-full cursor-pointer"
                    >
                      Log out
                    </button>
                  </Form>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" className="text-right">
                    Sign In
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {/* 🧺 Overlay */}
      <CartOverlay
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}
