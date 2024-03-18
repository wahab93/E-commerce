import React, { useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // useNavigate is used to programmatically navigate to another route
import { useDispatch } from 'react-redux'; // useDispatch is used to dispatch actions to the Redux store
import { useProductContext } from '../common/api/provider';
import { accountServices } from '../../services/accountServices';
import usePageTitle from './usePageTitle'; // A custom hook to set page title
import { useFormik } from 'formik'; // A form management hook from Formik library
import { loginSchema } from '../../schemas'; // A Yup schema for form validation

export const Login = () => {
    usePageTitle('Login'); // Set page title to 'Login'
    const { companyId, login } = useProductContext(); // Extracting 'companyId' and 'login' from context
    const [isLoading, setIsLoading] = useState(false); // State to manage loading state of the form
    const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility
    const dispatch = useDispatch(); // Store dispatch hook
    const navigate = useNavigate(); // Navigation hook
    const initialValues = { // Initial values for form fields
        userId: 0,
        userName: "",
        companyId: companyId,
        firstName: "string",
        lastName: "string",
        userPassword: "",
        userEmail: "admin@gmail.com",
        isActive: true,
        isAdmin: true,
        message: "string"
    };

    // Formik hook for form management
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues, // Initial values for form fields
        validationSchema: loginSchema, // Schema for form validation
        onSubmit: async (values, action) => { // Function to handle form submission
            setIsLoading(true); // Set loading state to true

            try {
                // Call the login service to authenticate user
                const res = await accountServices.login(login, values);
                const payload = res.data;

                if (payload && payload.isAdmin) { // If user is admin, navigate to dashboard
                    setIsLoading(false); // Set loading state to false
                    navigate('/dashboard'); // Navigate to dashboard
                } else if (payload) { // If user is not admin, navigate to home page
                    setIsLoading(false); // Set loading state to false
                    navigate('/'); // Navigate to home page
                }

                dispatch({ // Dispatch login action
                    type: 'LOGIN', // Action type
                    payload // Action payload
                });

                swal("Success", "Login Successful!", "success"); // Show success message
            } catch (error) { // Handle error
                setIsLoading(false); // Set loading state to false
                swal("Error!", 'Invalid Login', "error"); // Show error message
            }
        }
    });

    // Function to toggle password visibility
    const togglePass = (e) => {
        e.preventDefault(); // Prevent default action
        setPasswordShown(!passwordShown); // Toggle password visibility
    }

    return (
        <div className='container py-md-5 py-3 px-4 px-md-0 mt-5'>
            <div className='row justify-content-center mt-5'>
                <div className="col-md-6 p-md-5 p-2 my-5">
                    <h2 className='text-center display-6 c-secondarycolor'>Please Login</h2>
                    <form method='POST' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Email</label>
                            <input className='form-control' type="text" placeholder='Name' name='userName'
                                value={values.userName} // Bind form field to formik values
                                onChange={handleChange} // Handle form field changes
                                onBlur={handleBlur} // Handle form field blur events
                            />
                            {errors.userName && touched.userName ? <span className='text-danger mt-2 d-block'>{errors.userName}</span> : null}
                        </div>
                        <div className='mb-3 position-relative'>
                            <label htmlFor="" className='form-label'>Password</label>
                            <input className='form-control pe-5'
                                type={passwordShown ? 'text' : 'password'} // Toggle password field type
                                placeholder='Passsword' name='userPassword'
                                value={values.userPassword} // Bind form field to formik values
                                onChange={handleChange} // Handle form field changes
                            />
                            {errors.userPassword && touched.userPassword ? <span className='text-danger mt-2 d-block'>{errors.userPassword}</span> : null}
                            <span className='passwordshowhide' onClick={togglePass}>
                                {passwordShown ? (
                                    <i className='fa fa-eye-slash fs-5'></i>
                                ) : (
                                    <i className='fa fa-eye fs-5'></i>
                                )}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4 logintbn">
                            <button type="submit" className={`btn border border-secondarycolor rounded-pill px-3 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                {isLoading ? (
                                    <div className="spinner-border c-primarycolor" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <span className='d-block'>
                                Not have Account <span className='mx-2'>|</span>
                                <Link to='/register'>Register</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}