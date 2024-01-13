import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import Login from './Login';
import Button from './Button';

function Banner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };

    const token = getCookie('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto flex flex-wrap flex-row sm:justify-between justify-center py-6 relative z-20">
      <div className="flex flex-wrap flex-row w-full md:w-3/4 justify-around items-center">
        <Link to="/" className="focus:outline-none">
          <img src={Logo} alt="Recipe King" className="logo" />
        </Link>
        <div className="flex items-center mx-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-96 shadow-sm appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1"
          />
          <Button text="Search" type="button" onClick={handleSearch} />
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center sm:mt-4 md:mt-0">
        <nav>
          <ul>
            <li>
              {isAuthenticated ? (
                <NavLink to="/profile">
                  <Button text="Profile" type="button" />
                </NavLink>
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )}
            </li>
          </ul>
        </nav>
        <Link to="/register">
          <Button text="Sign Up" type="button" />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
