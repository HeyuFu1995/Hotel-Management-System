import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ['cabin'],
        queryFn: getCabins,
    });

    if (error) {
        toast.error(error.message);
    }

    return { isLoading, cabins, error };
}

export default useCabins;