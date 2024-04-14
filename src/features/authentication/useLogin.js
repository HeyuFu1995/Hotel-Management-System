import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setSession } from "../../hooks/useLocalStorageState";

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, error, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
            setSession(data.session);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            toast.error("Probided email and password can not match");
        },
    });
    return { login, error, isLoading };
}

export default useLogin;