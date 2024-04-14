import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {
    isLoading,
    cabins,
  } = useCabins();

  const [searchParams] = useSearchParams();
  let filteredCabins;
  const filterValue = searchParams.get("discount") || "all";
  if (filterValue === "all") {
    filteredCabins = cabins || [];
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || [];
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0) || [];
  }

  const sortByValue = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortCabins}
          render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

