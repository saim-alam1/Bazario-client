const useIsActive = ({ isActive }) =>
  `${
    isActive
      ? "bg-amber-50 text-amber-600 font-medium"
      : "text-[#374151] hover:bg-amber-50 hover:text-amber-600"
  } flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-lg`;

export default useIsActive;
