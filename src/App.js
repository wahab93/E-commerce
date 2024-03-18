import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter as Router } from 'react-router-dom';
import './component/admin/css/adminstyle.css';
import { Navbar } from './component/user/pages/homepage/navbar.js';
import { Footer } from './component/user/pages/homepage/footer';
import ScrollToTop from './component/common/scrolltotop';
import { useDispatch, useSelector } from 'react-redux';
import { Admin } from './component/admin/admin';
import { UserRoutes } from './component/user/userRoutes';
import Preloader from './component/common/preloader';
import 'react-tooltip/dist/react-tooltip.css'
import { CopyRight } from './component/user/pages/homepage/copyRight.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css'; // or import specific styles if needed
import './js/main.js';
import './App.css';
import { useProductContext } from './component/common/api/provider.js';
import { updateColor } from './redux/action/index.js';
import { websiteServices } from './services/websiteServices.js';

function App() {
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [getwebsiteDetails, setGetwebsiteDetails] = useState([]); // Initially, set loading to true
  const { apiGetWebSettingsDetail, companyId } = useProductContext();

  const stateisadmin = useSelector((state) => state.userinfihandler.isAdmin);
  const primaryColor = useSelector(state => state.colorReducer.primaryColor);
  const secondaryColor = useSelector(state => state.colorReducer.secondaryColor);
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    const fetchWebSettings = async () => {
      try {
        const response = await websiteServices.WebSettingsDetail(apiGetWebSettingsDetail);
        if (response.isSuccess) {
          const Records = response.data; // Get the last four records
          setGetwebsiteDetails(Records);
          dispatch(updateColor({ primaryColor: Records.primaryColor, secondaryColor: Records.secondaryColor }));
        } else {
          console.error('API request failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchWebSettings(); // Call the function to fetch web settings
  }, [apiGetWebSettingsDetail, dispatch]);

  useEffect(() => {
    // Simulate a delay to show the preloader
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  const getlogoimage = getwebsiteDetails.imageResponseDTOs?.[0]?.imageName;
  const pageTitle = getwebsiteDetails.webSiteName;

  useEffect(() => {
    // Update CSS variables when primaryColor and secondaryColor change
    document.documentElement.style.setProperty('--primarycolor', primaryColor);
    document.documentElement.style.setProperty('--secondarycolor', secondaryColor);
  }, [primaryColor, secondaryColor]);

  // Function to set favicon dynamically
  const setFavicon = (url) => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = url;
  };

  useEffect(() => {
    // Set favicon when component mounts
    if (getlogoimage) {
      setFavicon(`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getlogoimage}`);
    }
    // Set document title when component mounts
    if(pageTitle){
      document.title = pageTitle;
    } else{
      document.title = 'Website'
    }
  }, [companyId, getlogoimage, pageTitle]);

  return (
    <>
    
      {loading ? (
        <Preloader />
      ) : (
        stateisadmin ? (
          <Router>
            <Admin getwebsiteDetails={getwebsiteDetails} />
          </Router>
        ) : (
          <Router>
            <Navbar getwebsiteDetails={getwebsiteDetails} />
            <ScrollToTop />
            <UserRoutes getwebsiteDetails={getwebsiteDetails} />
            <Footer getwebsiteDetails={getwebsiteDetails} />
            <CopyRight getwebsiteDetails={getwebsiteDetails} />
          </Router>
        )
      )}
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
}

export default App;