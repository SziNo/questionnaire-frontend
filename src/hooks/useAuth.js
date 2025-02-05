import useStore from "@/store/zustandStore";

const useAuth = () => {
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setIsAdmin = useStore((state) => state.setIsAdmin);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return { logout };
};

export default useAuth;
