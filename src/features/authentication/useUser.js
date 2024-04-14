import { useQuery } from "@tanstack/react-query";
import { check } from "../../services/apiAuth";

function useUser() {
    const { isLoading, error, data: user } = useQuery(
        {
            queryKey: ["user"],
            queryFn: check,
            retry: false,
        }
    );

    return { user, isLoading, error, isAuthenticated: user?.session !== undefined };
}

export default useUser;
