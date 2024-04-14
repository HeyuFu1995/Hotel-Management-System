import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

function useRegister() {
    const { mutate: regist, isLoading, error } = useMutation({
        mutationFn: (user) => register(user),
        onSuccess: (data) => {
            console.log(data);
            toast.success("Account Successfully Created!");
        },
        onError: () => {
            toast.error("Account Created Failed!");
        },
    });

    return { regist, isLoading, error };
}

export default useRegister;
