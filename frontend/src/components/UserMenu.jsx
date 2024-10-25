import { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'; 

const UserMenu = ({ role, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {role && (
        <div>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white text-lg transition-all hover:text-[#f89f2b] hover:font-semibold"
          >
            {
                isDropdownOpen ?  <MdArrowDropUp className="ml-2 text-xl" /> :  <MdArrowDropDown className="ml-2 text-xl" /> 
            }
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
