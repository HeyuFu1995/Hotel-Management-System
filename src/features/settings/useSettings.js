import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useSetting() {
    const { isLoading, error, data: setting } = useQuery({
        queryFn: getSettings,
        queryKey: ["settings"],
    });

    if (error) {
        toast.error(error.message);
    }

    return { isLoading, error, setting };
}

export default useSetting;