import React from "react";
import "./Sidebar.scss";

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  subItems?: SubItem[];
}

interface SubItem {
  label: string;
  path: string;
};

interface SidebarProps {
  menuItems: SidebarItem[];
  accountMenuItems: SidebarItem[];
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  // state for clicked (active) and hovered (mouse hover to show submenu)
  // dashboard links
  const [activeItemLabel, setActiveItemLabel] = React.useState<string>("");
  const [hoveredItemLabel, setHoveredItemLabel] = React.useState<string>("");

  // the following state is used to tracking the absolute position of the submenu
  const [subMenuCoordinates, setSubMenuCoordinates] = React.useState<[number, number]>([0, 0]);

  const handleItemClicked = (itemLabel: string) => {
    // also router push
    setActiveItemLabel(itemLabel);
  };

  const handleMouseEnterItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, itemLabel: string) => {
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.offsetTop, event.currentTarget.offsetLeft);
    setHoveredItemLabel(itemLabel);
    setSubMenuCoordinates([event.currentTarget.offsetTop, event.currentTarget.offsetLeft + event.currentTarget.offsetWidth]);
  };

  const handleMouseLeaveItem = () => {
    setHoveredItemLabel("");
  };

  // createMenuItems is a helper to avoid repetition
  const createMenuItems = (menuItems: SidebarItem[]): JSX.Element[] => {
    return menuItems.map((item) => {
      // handle missing icon
      let iconStyle = `${item.icon} fa-fw icon`;
      if (!item.icon || item.icon.length === 0) {
        iconStyle = "fa fa-fw icon icon-hidden";
      }
      return (
        <li
          key={item.label}
          className={activeItemLabel === item.label ? "active": ""}
          onClick={() => handleItemClicked(item.label)}
          onMouseEnter={(event) => handleMouseEnterItem(event, item.label)}
          onMouseLeave={() => handleMouseLeaveItem()}>
          <i className={iconStyle}></i>
          {item.label}
        </li>
      );
    });
  };

  // position submenu based on coordinates of currently hovered on menuItem
  const createSubMenu = (menuItems: SidebarItem[]): JSX.Element => {
    // choose hovered on item
    const selected = menuItems.find((item) => item.label === hoveredItemLabel);
    return (
      <div className="sub-menu" style={{
        position: "absolute",
        top: subMenuCoordinates[0],
        left: subMenuCoordinates[1],
      }}>
        <h1>{selected && selected.label}</h1>
      </div>
    );
  };

  const navLinks = createMenuItems(props.menuItems);
  const accountLinks = createMenuItems(props.accountMenuItems);
  const subMenu = createSubMenu([...props.menuItems, ...props.accountMenuItems]);

  return (
    <>
      <div className={"sidebar-panel uk-offcanvas-bar" + (props.isOpen ? "uk-offcanvas-bar-show": "")}>
        <ul className="uk-nav uk-nav-side uk-nav-offcanvas">
          {navLinks}

          <div className="section-title">Account</div>
          {accountLinks}
        </ul>
      </div>
      {subMenu}
    </>
  );
};

export default Sidebar;
