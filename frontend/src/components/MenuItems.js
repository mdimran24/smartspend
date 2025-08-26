import NavDropdown from "./NavDropdown";

const MenuItems = ({ items }) => {
  return (
    <div className="menu-items">
      {items.submenu ? (
        <>
          <NavDropdown title={items.title} submenus={items.submenu} />
        </>
      ) : (
        <a
          className="inline-flex w-full justify-center gap-x-1 rounded-md  bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          href={items.url}
        >
          {items.title}
        </a>
      )}
    </div>
  );
};

export default MenuItems;
