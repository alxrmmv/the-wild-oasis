import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  if (isLoggingOut) return <SpinnerMini />;

  function handleLogOut() {
    logout();
  }
  return (
    <ButtonIcon>
      {isLoggingOut ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle onClick={handleLogOut} />
      )}
    </ButtonIcon>
  );
}

export default Logout;
