const useIsActive = ({ isActive }) =>
  `${
    isActive
      ? "bg-blue-50 text-[#2563EB] font-medium"
      : "text-[#374151] hover:bg-blue-50 hover:text-[#2563EB]"
  } flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-lg`;

export default useIsActive;
