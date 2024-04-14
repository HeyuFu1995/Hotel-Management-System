import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { mutate: update, isLoading: isUpdating } =
        useMutation({
            mutationFn: updateSetting,
            onSuccess: () => {
                toast.success("Setting successfully edited");
                queryClient.invalidateQueries({
                    queryKey: ["settings"]
                });
            },
            onError: (err) => toast.error(err.message),
        });

    return { update, isUpdating };
}

export default useUpdateSetting;