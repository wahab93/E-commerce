import React, { useState } from 'react'
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';


export const Register = () => {
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPass, setRegPass] = useState('');
    const [regConfirmPass, setRegConfirmPass] = useState('');
    const navigatation = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('regUser') || '[]');
        const filter = data.find((curElem) => {
            return curElem.regemail === regEmail;
        });
        if (!regName && !regEmail && !regPass && !regConfirmPass) {
            swal('Error', 'Please Fill all these Fields', 'error')
        } else if (regPass !== regConfirmPass) {
            swal('Error', 'Your Enter Wrong Password', 'error')
        } else if (filter) {
            alert('This Email already Inuse, Please choose another one.');
        } else {
            const getNewUser = { regname: regName, regemail: regEmail, regpass: regPass, regConfirmPass: regConfirmPass }
            data.push(getNewUser);
            localStorage.setItem('regUser', JSON.stringify(data));
            swal("Registration Success", "Your registration is successful!", "success");
            setRegName('');
            setRegEmail('');
            setRegPass('');
            setRegConfirmPass('');
            navigatation('/login');
        }
    }
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className="col-md-6 bg-light shadow p-5 my-5">
                    <h4 className='text-center'>Please Register</h4>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="email">Name</label>
                            <input type='text' placeholder='Enter Your Name'
                                className='form-control'
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div><label className='form-label' htmlFor="email">Email</label></div>
                            <input className='form-control' type='email' placeholder='Enter Your Email'
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div><label className='form-label' htmlFor="pass">Password</label></div>
                            <input className='form-control' type='password' placeholder='Enter Your password'
                                value={regPass}
                                onChange={(e) => setRegPass(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div><label className='form-label' htmlFor="pass">Confirm Password</label></div>
                            <input className='form-control' type='password' placeholder='Re-Enter Your password'
                                value={regConfirmPass}
                                onChange={(e) => setRegConfirmPass(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Link type="submit" className="primary-btn w-25 ms-0" onClick={registerUser}>Register</Link>
                            <span className='d-block'>
                                Already have Account <span className='mx-2'>|</span>
                                <Link to='/login'>Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}