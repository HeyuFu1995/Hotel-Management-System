import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, error, isLoading: isUpdating } = useMutation({
        mutationFn: (user) => update(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Profile updated success");
        },
        onError: (e) => {
            console.log(e);
            toast.error("Profile updated failed");
        },
    });

    return { updateUser, error, isUpdating };
}

export default useUpdateUser;
