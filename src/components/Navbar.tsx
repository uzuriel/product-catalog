import { NavLink, Form } from "react-router";

const Navbar = () => {
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
      <Form method="post" action="/logout" reloadDocument>
        <button
          type="submit"
          title="Logout"
          className="p-2 rounded-full transition cursor-pointer text-primary-content"
        >
          Logout
        </button>
      </Form>
    </header>
  );
};

export default Navbar;
