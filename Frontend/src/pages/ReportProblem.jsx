import React from 'react'

function ReportProblem() {
  return (
    <div className='w-full max-w-4xl mx-auto m-16'>
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-8">Is there something wrong with this website?</h2>
        <div className='w-full flex items-center justify-center'>
        <p className='w-[495px] text-left text-wrap text-gray-800'>Fill out the form below and you will get a response in a short time.<span> You can also write us directly at <a href='mailto:support@findera.com' className='hover:underline font-semibold text-orange-400'>support@findera.com</a></span></p>
        </div>
  <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
    

    <form className="flex flex-col">
      <input type="text" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Full Name"/>
      <input type="email" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email"/>
      {/* <input type="number" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Phone Number"/> */}
      {/* <input type="text" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Company Name"/> */}
      {/* <input type="text" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Job Title"/> */}
      {/* <input type="date" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Date of Birth"/> */}
      <textarea name="message" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Message"></textarea>

      <div className='w-full flex justify-between'>
        <div>ReCaptcha</div>
        <button type="submit" className="w-40  bg-gradient-to-r from-[#fc4f1a] to-orange-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-[#fc4f1a] hover:to-orange-400 transition ease-in-out duration-150">Submit</button>
      </div>
    </form>
  </div>

    </div>
  )
}

export default ReportProblem

