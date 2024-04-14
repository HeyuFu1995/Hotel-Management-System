import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreaateAndMutateCabin(cabin) {
    const queryClient = useQueryClient();
    const { mutate: createOrMutateCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isCreating, createOrMutateCabin };
}

export default useCreaateAndMutateCabin;