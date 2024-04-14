import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
    const { bookingid: id } = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBooking(id),
        retry: false,
    })
    return { isLoading, error, booking };
}

export default useBooking;
