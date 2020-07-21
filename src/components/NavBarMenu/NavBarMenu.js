import React, { useContext, useState, useEffect, useRef } from 'react';
import { ReactComponent as CaretIcon }      from '../../assets/icons/caret.svg';
import { ReactComponent as CogIcon }        from '../../assets/icons/cog.svg';
import { ReactComponent as ChevronIcon }    from '../../assets/icons/chevron.svg';
import { ReactComponent as ArrowIcon }      from '../../assets/icons/arrow.svg';
import { ReactComponent as BoltIcon }       from '../../assets/icons/bolt.svg';
import { ReactComponent as SearchIcon }     from '../../assets/icons/search.svg';
import { ReactComponent as HomeIcon }       from '../../assets/icons/home.svg';
import { AuthContext }                      from "../../App";
import { NavLink }                          from "react-router-dom";
import * as firebase                        from "firebase";
import useOutsideClick                      from '../hooks/useOutsideClick';
import LoginModal                           from "../User/LoginModal";
import RegisterModal                        from "../User/RegisterModal";
import SearchModal                          from "../SearchModal/SearchModal";
import Modali, { useModali }                from 'modali';
import { CSSTransition }                    from 'react-transition-group';

const NavBarMenu = () => {
  const [open, setOpen] = useState(false);
  const [loginModal, toggleLoginModal] = useModali({
    title: 'Login',
    animated: true
  });
  const [registerModal, toggleRegisterModal] = useModali({
    title: 'Register',
    animated: true
  });
  const [searchModal, toggleSearchModal] = useModali({
    title: 'Search map',
    animated: true
  });
  // console.log('====> open', open);
  const { isLoggedIn } = useContext(AuthContext);
  const currentUrl = window.location.pathname;
  console.log('====> currentUrl', currentUrl);
  const logout = (currentUrl) =>{
    firebase.auth().signOut().then(function() {
      window.location.href="/"
    }).catch(function(error) {});
  }
  const Navbar = (props) => {
    const homeUrl = '/';
    const mapUrl = '/mapview';
    return (
      <nav className={ 'navbar' + (!homeUrl || !mapUrl ? ' wide_nav' : '')}>
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }
  const NavItem = (props) => {
    return (
      <li className="nav-item">
        <div className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </div>
        {open && props.children}
      </li>
    );
  }
  const NavItemSearch = (props) => {
    return (
      <li className="nav-item">
        <div className="icon-button" onClick={toggleSearchModal}>
          {props.icon}
        </div>
      </li>
    );
  }
  const NavItemPlain = (props) => {
    return (
      <li className="nav-item">
        <NavLink to="/">
          <div className="icon-button">
            {props.icon}
          </div>
        </NavLink>
      </li>
    );
  }
  const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const closeDropdownOutsideclickRef = useRef(null);
    useOutsideClick(closeDropdownOutsideclickRef, () => {
      setOpen(!open);
    });

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    const calcHeight = (el) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    const DropdownItem = (props) => {
      return (
        <div className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </div>
      );
    }

    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={(dropdownRef, closeDropdownOutsideclickRef)}>

        {/* MEMU LEVEL === Main */}
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">

            <DropdownItem>
              <NavLink to="/mapview" onClick={() => setOpen(!open)}>View Map</NavLink>
            </DropdownItem>

            { isLoggedIn &&
              <>
                <DropdownItem>
                  <NavLink to="profile" onClick={() => setOpen(!open)}>My Profile</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="menu" onClick={() => setOpen(!open)}>Menu</NavLink>
                </DropdownItem>
                <hr className="hr_grey" />
                <DropdownItem
                  leftIcon={<CogIcon />}
                  rightIcon={<ChevronIcon />}
                  goToMenu="level2">
                  Goto == > Level 2
                </DropdownItem>
                <DropdownItem
                  leftIcon="🦧"
                  rightIcon={<ChevronIcon />}
                  goToMenu="helpandlegals">
                  Help & Legals
                </DropdownItem>
                <hr className="hr_grey" />
                <DropdownItem
                  leftIcon="🦧"
                  rightIcon={<ChevronIcon />}>
                  <NavLink to="" onClick={()=>{logout(); setOpen(!open)}}>Logout</NavLink>
                </DropdownItem>
              </>
            }
            { !isLoggedIn &&
              <>
                <DropdownItem
                  leftIcon="🦧"
                  rightIcon={<ChevronIcon />}>
                  <span className="close_menu_wrapper" onClick={()=>{setOpen(!open)}}>
                    <NavLink to="" onClick={toggleLoginModal}>Login</NavLink>
                  </span>
                </DropdownItem>
                <DropdownItem
                  leftIcon="🦧"
                  rightIcon={<ChevronIcon />}>
                  <span className="close_menu_wrapper" onClick={()=>{setOpen(!open)}}>
                    <NavLink to="" onClick={toggleRegisterModal}>Register</NavLink>
                  </span>
                </DropdownItem>
              </>
            }

            <hr className="hr_grey" />

            <div>
              social icon links
            </div>
          </div>
        </CSSTransition>

        {/* MENU LEVEL === Settings */}
        <CSSTransition
          in={activeMenu === 'level2'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h4>Level 2</h4>
            </DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Leve 2 item [1]</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Leve 2 item [2]</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Leve 2 item [3]</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Leve 2 item [4]</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Leve 2 item [5]</DropdownItem>
            <DropdownItem
              leftIcon={<BoltIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="level3">
              Goto == > Level 3
            </DropdownItem>
          </div>
        </CSSTransition>

        {/* MENU LEVEL === Level 3 */}
        <CSSTransition
          in={activeMenu === 'level3'}
          timeout={500}
          classNames="menu-tertiary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="level2" leftIcon={<ArrowIcon />}>
              <h4>Level 3</h4>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Leve 3 item [1]</DropdownItem>
            <DropdownItem leftIcon="🐸">Leve 3 item [2]</DropdownItem>
            <DropdownItem leftIcon="🦋">Leve 3 item [3]</DropdownItem>
            <DropdownItem leftIcon="🦔">Leve 3 item [4]</DropdownItem>
          </div>
        </CSSTransition>

        {/* MENU LEVEL === Help & Legals */}
        <CSSTransition
          in={activeMenu === 'helpandlegals'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h4>Help & Legals</h4>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">How to use this service</DropdownItem>
            <DropdownItem leftIcon="🐸">Terms & Conditions</DropdownItem>
            <DropdownItem leftIcon="🦋">Privacy Policy</DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  }

  return (
    <>
      <Navbar>
        <NavItem icon={<CaretIcon />}><DropdownMenu></DropdownMenu></NavItem>
        <NavItemPlain icon={<HomeIcon />} />
        <NavItemSearch icon={<SearchIcon />} />
      </Navbar>

      <Modali.Modal {...loginModal}>
        <LoginModal />
      </Modali.Modal>

      <Modali.Modal {...registerModal}>
        <RegisterModal />
      </Modali.Modal>

      <Modali.Modal {...searchModal}>
        <SearchModal />
      </Modali.Modal>
    </>
  );
}

export default NavBarMenu;
