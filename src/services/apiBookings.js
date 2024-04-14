import { PAGE_SIZE } from "../ui/Pagination";
import { getToday } from "../utils/helpers";
const URL = import.meta.env.VITE_BASE_URL + "/booking";

async function getBookings({ filter, sortBy, page }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  const res = await fetch(`${URL}/all`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      [filter?.field]: filter?.value,
      sortField: sortBy.field,
      direction: sortBy.direction,
      pageNo: page,
      pageSize: PAGE_SIZE,
    }),
  });
  if (!res.ok) {
    throw new Error("Something went wrong with fetching Bookings");
  }
  const data = await res.json();
  return { records: data.records, count: data.total };
}


async function getBooking(id) {
  const res = await fetch(`${URL}/${id}`)
  if (!res.ok) {
    throw new Error(`Something went wrong with fetching Booking with Booking id: ${id}`);
  }
  const data = await res.json();
  return data;
}

async function updateBooking(id, obj) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  const res = await fetch(`${URL}/soe`, {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(obj),
  });
  if (!res.ok) {
    throw new Error("Something went wrong with fetching Bookings");
  }
  const data = await res.json();
  return data;
}

async function deleteBooking(id) {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE"
  })
  if (!res.ok) {
    throw new Error(`Something went wrong with deleting Booking with Booking id: ${id}`);
  }
  const data = await res.json();
  return data;
}

async function getBookingsAfterDate(date) {
  const today = getToday({ end: true });

  const res = await fetch(`${URL}/between?startDate=${date}&endDate=${today}`);
  if (!res.ok) {
    throw new Error(`Something went wrong with getting afterDate`);
  }
  const data = await res.json();
  return data;
}

async function getStaysAfterDate(date) {
  const today = getToday();
  const res = await fetch(`${URL}/stay?startDate=${date}&endDate=${today}&guestId=1`);
  if (!res.ok) {
    throw new Error(`Bookings could not get loaded`);
  }
  const data = await res.json();
  return data;
}

async function getStaysTodayActivity() {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("*, guests(fullName, nationality, countryFlag)")
  //   .or(
  //     `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
  //   )
  //   .order("created_at");

  // // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  // if (error) {
  //   console.error(error);
  //   throw new Error("Bookings could not get loaded");
  // }
  // return data;
}

export { getBookings, getBooking, updateBooking, deleteBooking, getBookingsAfterDate, getStaysAfterDate, getStaysTodayActivity };

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.


// // Returns all STAYS that are were created after the given date


//   return data;

// // Activity means that there is a check in or a check out today





