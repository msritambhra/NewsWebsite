import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './Header1.css';

const HeaderLink = ({ page, selected }) => {

  const title = page.charAt(0).toUpperCase() + page.slice(1);
  let className = selected ? 'headerlink-no-link ' : '';
  className += 'link-title';

  return (
    <Link  to={`/${page}`} className={className}>
      {title}
      {/* <div className={selected ? 'headerlink-underline-active' : 'headerlink-underline'}>
        ______________
      </div> */}
    </Link>
  );
}; 

const Header = () => {
  
  const page = useParams().page || 'home';
  
  const [isActive, setActive] = useState(false);

  const toggleHandler = () =>{
      setActive(!isActive);
  }
  return (
        <nav>
            <div className="hamburger" onClick={toggleHandler}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            
            <div className={isActive?('nav-links open'):'nav-links'}>
                <div><HeaderLink page='home' selected={page === 'home'} /></div>
                <HeaderLink page='home' selected={page === 'home'} />
                <HeaderLink page='world' selected={page === 'world'} />
                <HeaderLink page='politics' selected={page === 'politics'} />
                <HeaderLink page='technology' selected={page === 'technology'} />
            </div>
        </nav>
  );
};

export default Header;
