import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { registerUserAction } from '../redux/auth/authReducer';

function SingUpForm() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8,'Password should be 8 characters').required('Password is Required'),
      confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Password must match')
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUserAction({data: values}));
    }
  })

  return (
    <div className='w-full max-w-2xl mx-auto m-16'>
        <div className="max-w-md mx-auto relative flex flex-col p-4 rounded-md text-black bg-white border-x-2 border-gray-200/40">
    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Register with <span className="text-[#FC4F1A]">FindsFont</span></div>
    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Create your free account</div>
    <form 
    onSubmit={formik.handleSubmit}
    className="flex flex-col gap-3">

    <div className="block relative"> 
    <label htmlFor="username" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
    <input 
    type="text" 
    id="username" 
    name='username' 
    value={formik.values.username}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    
    </div>
    <div className="w-full h-[15px] mb-2">
          <div>
            {formik.touched.username && formik.errors.username ? (
              <p className="text-[12px] text-red-800">
                {formik.errors.username}
              </p>
            ) : null}
          </div>
    </div>

    <div className="block relative"> 
    <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
    <input 
    type="text" 
    id="email" 
    name='email' 
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    
    </div>
    <div className="w-full h-[15px] mb-2">
          <div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-[12px] text-red-800">{formik.errors.email}</p>
            ) : null}
          </div>
    </div>

    <div className="block relative"> 
    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
    <input 
    type="password" 
    id="password" 
    name='password' 
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    
    </div>
    <div className="w-full h-[15px]">
          <div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-[12px] text-red-800">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
    </div>        


    <div className="block relative"> 
    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
    <input 
    type="text" 
    id="confirmPassword" 
    name='confirmPassword' 
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-1  ring-[#FC4F1A] outline-0"/>
    
    </div>
    <div className="w-full h-[15px]">
          <div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-[12px] text-red-800">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
        </div>
    
    <button type="submit" className="bg-[#FC4F1A] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal mt-5">Submit</button>

</form>
<div className="text-sm text-center mt-[1.6rem]">Already have an account? <Link className="text-sm text-[#FC4F1A]" to={'/login'}>Login</Link></div>
</div>
    </div>
  )
}

export default SingUpForm