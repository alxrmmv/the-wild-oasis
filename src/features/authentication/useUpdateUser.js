import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUserAPI,
    onSuccess: () => {
      toast.success("User account has been successfully updated");
      //   queryClient.setQueryData("user", user);
      queryClient.invalidateQueries(["user"]);
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCurrentUser, isUpdatingUser };
}
