import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

function useCheckout() {
    const queryClient = useQueryClient();
    const { isLoading: isCheckingOut, mutate: checkout, error } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            id: bookingId,
            status: "checked-out",
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Successfully checked out`);
            queryClient.invalidateQueries({ status: "active" });
        },
        onError: () => {
            toast.error(`There was an Error while Checking out`);
        }
    });

    return { isCheckingOut, checkout, error }
}

export default useCheckout;
