import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { isToday } from "date-fns";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();


  if (isLoading || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  const todayActivities = stays.filter(stay => (stay.status === "unconfirmed" && isToday(new Date(stay.startDate))) || (stay.status === 'checked-in' && isToday(new Date(stay.endDate))));

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity todayActivities={todayActivities} />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
