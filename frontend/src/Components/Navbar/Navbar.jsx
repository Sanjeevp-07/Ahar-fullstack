import React, { useEffect , useState } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profileImg from "../Assets/profile.png"; 

const Navbar = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      getData();
    }, 200)
    }, [location]);

/*   const getData = async() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData && parsedData.isLoggedIn) {
        setUserData(parsedData.userData);
      } else {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }; */

  const getData = async () =>{
    const data = await JSON.parse(localStorage.getItem('userData'));
    if(data && data.isLoggedIn){
      setUserData(data.userData);
    }
  }

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">Ahar</div>
        <ul className="nav-links">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/Profile'>Profile</Link></li>
          <li><Link to='/NGOs'>NGOs</Link></li>
          <li><Link to='/Volunteers'>Volunteers</Link></li>
        </ul>
      </div>
      <div className="nav-buttons">
        <button className="primary-btn">Donate Now</button>

        {userData ? (
          <>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} style={{ display: 'flex' }}>
              <img className="Profile" src={profileImg} alt='Profile' />
              <span className='name'>{userData.name}</span>
            </Link>
            <button onClick={logout} className="secondary-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to='/Signup1'><button className="secondary-btn">SignUp</button></Link>
            <Link to='/Login1'><button className="secondary-btn">Login</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
