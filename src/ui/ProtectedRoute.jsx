import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //Load the authenticated user
  const { user, isAuthenticated, isLoadingUser, isFetching } = useUser();
  const navigate = useNavigate();

  //If there is NO authenticated user, redirect to the login
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser && !isFetching) navigate("/login");
  }, [user, isAuthenticated, navigate, isLoadingUser, isFetching]);

  //While loading show a spinner
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //If ther IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
