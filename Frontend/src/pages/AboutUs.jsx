import React from 'react'
import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <div className='w-full max-w-4xl mx-auto border-x-2 px-5 bg-gray-300/10 m-16'>
        <p><a className='text-orange-400 font-semibold hover:underline' href='www.findsfont.com'>FindsFont.com</a> is a free digital font download website that distributes free downloadable and free for commercial use fonts. You can find high quality font families with many styles available. You can either download a single style such as a TTF or OTF file, or download all available styles in zip format. On Fontmirror, you can browse fonts by category, and each of the font family listed is visualizing well for you such as a live character preview in a web browser, showing all supported characters, all info in the font family, and more. Each font published on the Fontmirror contains information on its publisher / designer, license information, and any external links to purchase the full version.</p> 
        <p>
        Fontmirror.com adds new fonts every day, you can see the fresh uploads in the <Link to={'/'} className='font-semibold text-orange-400 hover:underline'>home page.</Link>
        </p>
        <p>
        The website is available globally, and is English-only.
        </p>
    </div>
  )
}

export default AboutUs