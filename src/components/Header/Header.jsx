<<<<<<< HEAD
// import { NavDropdown } from 'react-bootstrap';
// import logo from '../../assets/images/logo.png';
// import userImg from '../../assets/images/avatar-icon.png';
// import {mediaUrl, baseUrl} from '../../utils/Constants';
// import React, { useEffect, useRef, useContext, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { BiMenu } from 'react-icons/bi';
// import Cookies from 'js-cookie';
// import axios from '../../utils/axios';
// import { verifyToken } from '../../utils/Constants';
// import { logout } from '../../Redux/usernameReducer';
// import { change } from '../../Redux/usernameReducer';
// import AuthContext from '../../context/AuthProvider';

// const navLinks = [
//   {
//     path: '/home',
//     display: 'Home',
//   },
//   {
//     path: '/contact',
//     display: 'Contact',
//   },
//   {
//     path: '/doctors',
//     display: 'Find a Doctor',
//     },
//     {
//     path: '/services',
//     display: 'Services',
//     },
//     {
//       path: '/message',
//       display: 'Inbox',
//       },
      
//   // Additional navigation links here
// ];

// const navLinksLogin = [
//   {
//     path: '/home',
//     display: 'Home',
//   },
//   {
//     path: '/contact',
//     display: 'Contact',
//   },
    
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for showing/hiding profile dropdown
//   const [userImage,setUserImage]=useState(null);
//   const [isHeaderSticky, setIsHeaderSticky] = useState(false);


//   const [isHeaderWhite, setIsHeaderWhite] = useState(false);

//   // const handleStickyHeader = () => {
//   //   window.addEventListener('scroll', () => {
//   //     if (
//   //       document.body.scrollTop > 80 ||
//   //       document.documentElement.scrollTop > 80
//   //   //   ) {
//   //   //     headerRef.current.classList.add('sticky__header');
//   //   //   } else {
//   //   //     headerRef.current.classList.remove('sticky__header');
//   //   //   }
//   //   ) {
//   //       headerRef.current.style.position = 'fixed';
//   //       // headerRef.current.style.top = '0';
//   //       headerRef.current.style.width = '100%';
//   //       headerRef.current.style.zIndex = '1000'; 
//   //       setIsHeaderWhite(true);
//   //     } 
//   //     else {
//   //       headerRef.current.style.position = 'static';
//   //       setIsHeaderWhite(false);
//   //     }
//   //   });
//   // };

//   // useEffect(() => {
//   //   handleStickyHeader();
//   //   return () => window.removeEventListener('scroll', handleStickyHeader);
//   // }, []);
//   const handleStickyHeader = () => {
//     const scrollPosition = window.scrollY;
//     setIsHeaderSticky(scrollPosition > 80);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleStickyHeader);
//     return () => window.removeEventListener('scroll', handleStickyHeader);
//   }, []);

//   const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

//   const dispatch = useDispatch();
//   const username = useSelector((state) => state.username.username);
//   const { auth, setAuth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const userLogout = () => {
//     Cookies.remove('jwt_user');
//     Cookies.remove('role', 'user');
//     Cookies.remove('id');
//     dispatch(logout());
//     dispatch(change(''));
    
//     navigate('/');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = Cookies.get('jwt_user');
//         if (token ) {
//           const res = await axios.post(
//             verifyToken,
//             { token },
//             {
//               headers: { 'Content-Type': 'application/json' },
//             }
//           );
  
          
  
//           const userResponse = await axios.get(`${baseUrl}get-user/${res.data.id}`);
//           const userImagePath = `${userResponse.data.userimage}`;
//           setUserImage(userImagePath);

//           dispatch(change(res.data.username));
//         }
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     };
  
//     fetchData(); // Invoke the async function
  
//   }, [dispatch]); 


//   const toggleProfile = () => {
//     navigate("/profile")
//   };

//   return (
//     <header className="header flex items-center" ref={headerRef} style={{ width: '100%',paddingTop: '20px' }}>
//       <div className="container">
//         <div className="flex items-center justify-between">
//           <div>
//             <img src={logo} alt="" />
//           </div>
//           <div className="navigation" ref={menuRef} onClick={toggleMenu}>
//             <ul className="menu flex items-center gap-[2.7rem]">
//               {username ? (
//                 navLinks.map((link, index) => (
//                   <li key={index}>
                     
//                     <NavLink
//                       to={link.path}
//                       className={(navclass) =>
//                         navclass.isActive
//                           ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                           : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
//                       }
//                     >
//                       {link.display}
//                     </NavLink>
                  
//                   </li>
//                 ))
//               ) : (
//                 navLinksLogin.map((link, index) => (
//                   <li key={index}>
//                     <NavLink
//                       to={link.path}
//                       className={(navclass) =>
//                         navclass.isActive
//                           ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                           : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
//                       }
//                     >
//                       {link.display}
//                     </NavLink>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//           <div className="flex items-center gap-4">
//             <div >
//               <div className="profile-dropdown">
//               {userImage ? (
//                   <img
//                     src={userImage}
//                     className="w-[35px] h-[35px] rounded-full cursor-pointer"
//                     alt=""
//                     onClick={toggleProfile}
//                   />
//                 ) : (
//                   <img
//                     src={userImg}
//                     className="w-[35px] h-[35px] rounded-full cursor-pointer"
//                     alt=""
//                     onClick={toggleProfile}
//                   />
//                 )}
                  
                  
//               </div>
//               {/* <Link to="/">
//                 <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
//                   <img src={userImg} className="w-full rounded-full" alt="" />
//                 </figure>
//               </Link> */}
//             </div>
//             {username ? (
//               <div>
//                 <button
//                   className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
//                   onClick={userLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link to="/login">
//                 <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
//                   Login
//                 </button>
//               </Link>
//             )}
//             <span className="md:hidden" onClick={toggleMenu}>
//               <BiMenu className="w-6 h-6 cursor-pointer" />
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



=======
>>>>>>> 3d271e17940e2f36b1c6a0350ff3aeca561f4970

import { NavDropdown } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar-icon.png';
import {mediaUrl, baseUrl} from '../../utils/Constants';
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import { verifyToken } from '../../utils/Constants';
import { logout } from '../../Redux/usernameReducer';
import { change } from '../../Redux/usernameReducer';
import AuthContext from '../../context/AuthProvider';

const navLinks = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
  {
    path: '/doctors',
    display: 'Find a Doctor',
    },
    {
    path: '/services',
    display: 'Services',
    },
    {
      path: '/message',
      display: 'Inbox',
      },
      
  // Additional navigation links here
];

const navLinksLogin = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
    
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const token = Cookies.get('jwt_user');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for showing/hiding profile dropdown
  const [userImage,setUserImage]=useState(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [count,setCount]=useState([])
  const [userLogin,setUserLogin]=useState (null |token)
  


  const [isHeaderWhite, setIsHeaderWhite] = useState(false);
  const handleStickyHeader = () => {
    const scrollPosition = window.scrollY;
    setIsHeaderSticky(scrollPosition > 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const dispatch = useDispatch();
  const username = useSelector((state) => state.username.username);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const userLogout = () => {
    Cookies.remove('jwt_user');
    Cookies.remove('role', 'user');
    Cookies.remove('id');
    dispatch(logout());
    dispatch(change(''));
    
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('jwt_user');
        setUserLogin(token)
        if (token ) {
          const res = await axios.post(
            verifyToken,
            { token },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          const userResponse = await axios.get(`${baseUrl}get-user/${res.data.id}`);
          const userImagePath = `${userResponse.data.userimage}`;
          setUserImage(userImagePath);
          dispatch(change(res.data.username));
          setCount((prevCount)=>prevCount+1)
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, [token]); 

  // useEffect(()=>{
  //   LoadImage()
  // },[token])

  // const LoadImage = async()=>{
  //   const token = Cookies.get('jwt_user');
  //   const res = await axios.post(
  //     verifyToken,
  //     { token },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );
  //   const userResponse = await axios.get(`${baseUrl}get-user/${res.data.id}`);
  //   const userImagePath = `${userResponse.data.userimage}`;
  //   setUserImage(userImagePath)

  // }
  const toggleProfile = () => {
    navigate("/profile")
  };
  return (
    <header className="header flex items-center" ref={headerRef} style={{ width: '100%',paddingTop: '20px' }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {username ? (
                navLinks.map((link, index) => (
                  <li key={index}>
                     
                    <NavLink
                      to={link.path}
                      className={(navclass) =>
                        navclass.isActive
                          ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                          : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
                      }
                    >
                      {link.display}
                    </NavLink>
                  
                  </li>
                ))
              ) : (
                navLinksLogin.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navclass) =>
                        navclass.isActive
                          ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                          : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div >
              <div className="profile-dropdown">
              {userImage ? (
                  <img
                    src={userImage}
                    className="w-[35px] h-[35px] rounded-full cursor-pointer"
                    alt=""
                    onClick={toggleProfile}
                  />
                ) : (
                  <img
                    src={userImg}
                    className="w-[35px] h-[35px] rounded-full cursor-pointer"
                    alt=""
                    onClick={toggleProfile}
                  />
                )}                 
              </div>
            </div>
            {username ? (
              <div>
                <button
                  className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                  onClick={userLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

