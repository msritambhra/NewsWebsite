import { Link, useParams } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({ page, selected }) => {

  const title = page.charAt(0).toUpperCase() + page.slice(1);
  let className = selected ? 'headerlink-no-link ' : '';
  className += 'link-title';

  return (
    <Link to={`/${page}`} className={className}>
      {title}
      <div className={selected ? 'headerlink-underline-active' : 'headerlink-underline'}>
        ______________
      </div>
    </Link>
  );
};

const Header = () => {
  
  const page = useParams().page || 'home';
  // console.log(page)
  return (
    <div className='header'>
      <HeaderLink page='home' selected={page === 'home'} />
      <HeaderLink page='world' selected={page === 'world'} />
      <HeaderLink page='politics' selected={page === 'politics'} />
      <HeaderLink page='technology' selected={page === 'technology'} />
    </div>
  );
};

export default Header;