import React, { useRef, useState } from 'react'
import eyeOpen from '../assets/pswdShow.png'
import eyeClose from '../assets/pswdHide.png'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../redux/auth/authReducer';
import F from '../assets/F.png'


function LoginForm() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('password');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
  },
    validationSchema: Yup.object({
      email: Yup.string().email('Input a valid email').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('No password provided.'),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUserAction({data: values}));
    }
})

  
  return (
    <div className='w-full max-w-2xl mx-auto m-16'>
      <div className="max-w-md mx-auto relative flex flex-col p-4 rounded-xl text-black bg-white border-4 border-black/10 shadow-sm shadow-black/50">
    <div className='flex justify-center mb-4  mt-4'>
      <img className='w-7 h-7 object-contain' src={F} alt="FindsFontLogo"/>
    </div>
    <div className="text-2xl font-bold font-monsterrat mb-2 text-[#1e0e4b] text-center">Login</div>
    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
<form 
onSubmit={formik.handleSubmit}
className="flex flex-col gap-3">
    <div className="block relative"> 
    <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-semibold mb-2">Email</label>
    <input type="text" 
            id="email" 
            name='email' 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    </div>
    <div className='w-full h-[15px] mb-2'>
      <div>
        {formik.touched.email && formik.errors.email ? <p className='text-[12px] text-red-500'>{formik.errors.email}</p> : null}
      </div>
    </div>

    <div className="block relative"> 
    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-semibold mb-2">Password</label>
    <input 
    onChange={ formik.handleChange} 
    type={type} 
    id="password" 
    name='password' 
    value={formik.values.password}
    onBlur={formik.handleBlur}
    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    <div className='absolute top-[38px] right-3'>
    {formik.values.password !== '' ? <button type='button' onClick={() => {setShow(prev => !prev); setType( show ? 'password' : 'text')}}>

      <img className='w-6 h-6 transition-all duration-200 ease-in-out' src={show ? eyeOpen : eyeClose} alt="showPassword" />
    </button>
    : ''  }
    </div>
    </div>
    <div className='w-full h-[15px] mb-2'>
      <div>
            {formik.touched.password && formik.errors.password ? <p className='text-[12px] text-red-500'>{formik.errors.password}</p> : null}
      </div>
    </div>

    <div>
    <a className="text-sm text-[#FC4F1A]/80" href="#">Forgot your password?
    </a></div>
    <button type="submit" className="bg-[#FC4F1A] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Login</button>

</form>
    <div className="text-sm text-center mt-[1.6rem] mb-4">Don't have an account yet? <Link className="text-sm text-[#FC4F1A]/80" to={'/signup'}>Sign up for free!</Link></div>
    </div>
    </div>
  )
}

export default LoginForm