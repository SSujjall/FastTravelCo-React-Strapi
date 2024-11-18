const FooterSection = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 mt-8">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">fasttravelco.</h2>
            <ul className="text-black space-y-1">
              <li>
                <p>Washington</p>
              </li>
              <li>
                <p>1234 Address</p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
            <div>
              <h5 className="font-bold mb-2">About</h5>
              <ul className="text-black space-y-1">
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Travel Pro</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-2">Company</h5>
              <ul className="text-black space-y-1">
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-2">Support</h5>
              <ul className="text-black space-y-1">
                <li>
                  <a href="#">Accessibility</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-2">Newsletter</h5>
              <p>Subscribe to our newsletter</p>
              {/* Flex container for input and button */}
              <div className="flex rounded-full overflow-hidden border px-2 h-10 items-center bg-white">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className=" text-xs h-8 placeholder-gray-400 w-full focus:outline-none"
                />
                <button className="px-2 py-2 text-xs h-6 flex items-center rounded-full bg-red-500 text-white hover:bg-red-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} fasttravelco. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
