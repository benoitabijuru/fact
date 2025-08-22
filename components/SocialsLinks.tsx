import Link from 'next/link'
import React from 'react'

const SocialsLinks = () => {
  return (
    <div className="flex space-x-2">
                  <Link href="https://x.com/factcustom" className="group" target="_blank" rel="noopener noreferrer">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                  </Link>
    
                  <Link href="https://www.instagram.com/factltd/" className="group" target="_blank" rel="noopener noreferrer">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z"/>
                        </svg>
                    </div>
                    </Link>
                        
                  <Link href="https://www.facebook.com/profile.php?id=100091942292303" className="group" target="_blank" rel="noopener noreferrer">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                  </Link>
    
                  <Link href="https://www.youtube.com/@FACTLTD-v6x/videos" className="group" target="_blank" rel="noopener noreferrer">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                  </Link>
    
                  {/* <Link href="https://pinterest.com" className="group" target="_blank" rel="noopener noreferrer">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.139.889 2.739.097.118.11.22.085.342l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </div>
                  </Link> */}
                   {/* WhatsApp */}
      <Link href="https://wa.me/+250787197536" className="group" target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all duration-300 group-hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0C5.373 0 0 5.373 0 12a11.94 11.94 0 0 0 1.675 6.03L0 24l6.208-1.627A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.185-1.24-6.183-3.48-8.52zM12 22a9.94 9.94 0 0 1-5.083-1.418l-.362-.214-3.69.967.985-3.593-.237-.368A9.94 9.94 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.043-7.402c-.276-.138-1.635-.805-1.888-.896-.253-.092-.438-.138-.623.138s-.715.896-.877 1.08c-.161.184-.323.207-.599.069-.276-.138-1.165-.429-2.22-1.365-.82-.731-1.373-1.635-1.534-1.911-.161-.276-.017-.429.122-.567.126-.125.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.623-1.5-.853-2.059-.224-.538-.453-.465-.623-.474-.161-.009-.345-.009-.53-.009s-.483.069-.737.345c-.253.276-.968.947-.968 2.309s.992 2.674 1.131 2.86c.138.184 1.951 2.976 4.73 4.178.662.285 1.178.455 1.582.584.664.212 1.27.182 1.748.111.533-.079 1.635-.668 1.865-1.314.23-.646.23-1.199.161-1.314-.069-.115-.253-.184-.529-.322z"/>
          </svg>
        </div>
      </Link>

      {/* LinkedIn */}
      <Link href="https://www.linkedin.com/in/fact-ltd-09a569272/" className="group " target="_blank" rel="noopener noreferrer">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-all duration-300 group-hover:scale-110">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.368 4.268 5.448v6.295zM5.337 7.433a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
          </svg>
        </div>
      </Link>

 </div>
  )
}

export default SocialsLinks