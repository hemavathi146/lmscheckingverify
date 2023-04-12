import React from "react";

export default function () {
  return (
    <footer className="fixed bottom-0 text-sm w-full bg-white border-t border-gray-300 text-center">
      <div className="flex flex-wrap justify-between py-1">
        <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
          <h4 className="text-gray-800 font-bold mb-2 px-0">Contact Us</h4>
          <p>ecarr.gardner@gmail.com</p>
          <p>(904) 417-3257</p>
          <p>1234 Main St., Suite 100</p>
          <p>Anytown, USA 12345</p>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 mb-1 py-8">
          <h4 className="text-black font-bold mb-1">Connect with Us</h4>
          <div className="flex"></div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
          <h4 className="text-gray-800 font-bold mb-2">Legal</h4>
          <ul className="list-none">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Site Map</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
