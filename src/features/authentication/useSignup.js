import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "New account has been successfully created! Please, verify the account from the user's email address. "
      );
      navigate("/users");
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("There was an error creating new user");
    },
  });

  return { signup, isSigningUp };
}
