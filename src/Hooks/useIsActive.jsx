const useIsActive = ({ isActive }) =>
  `${
    isActive
      ? "bg-amber-50 text-[#EA580C] font-medium"
      : "text-[#374151] hover:bg-amber-50 hover:text-amber-600"
  } flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-[18px]  whitespace-nowrap`;

export default useIsActive;
