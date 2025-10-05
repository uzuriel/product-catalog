import { ShoppingCart, User } from "lucide-react";
import { NavLink, Form } from "react-router";

export default function Navbar({ user }: { user?: any }) {
  return (
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
        {user ? (
          <ShoppingCart />
        ) : (
          <NavLink to="/login" className="text-right">
            <ShoppingCart />
          </NavLink>
        )}

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="cursor-pointer">
            <User />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 text-primary shadow-sm w-32 p-2 z-10 rounded-lg hover:bg-primary hover:text-primary-content text-center cursor-pointer mt-2"
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
  );
}
