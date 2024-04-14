import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isLoading: isCheckingIn, mutate: checkin, error } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            id: bookingId,
            status: "checked-in",
            isPaid: true,
            ...breakfast,
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Successfully checked in`);
            queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
            navigate("/");
        },
        onError: () => {
            toast.error(`There was an Error while Checking in`);
        }
    });

    return { isCheckingIn, checkin, error }
}

export default useCheckin;
