
const URL = import.meta.env.VITE_BASE_URL + "/cabin";

async function getCabins() {
    const res = await fetch(`${URL}/all`);
    if (!res.ok) {
        throw new Error("Something went wrong with fetching cabins");
    }
    const data = await res.json();
    return data;
}

async function deleteCabin(id) {
    const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) {
        throw new Error(`Something went wrong while deleting Cabin with id: ${id}`);
    }
    const data = await res.json();
    return data;
}

async function createEditCabin(cabin) {
    if (typeof cabin.image !== "string") {
        const imageName = `${cabin.image.name}`;
        const imagePath = `cabins/${imageName}`;
        cabin.image = imagePath;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const res = await fetch(`${URL}/soe`, {
        method: "PATCH",
        body: JSON.stringify(cabin),
        headers: myHeaders,
    })
    if (!res.ok) {
        throw new Error(`Something went wrong while saving new Cabin`);
    }
    const data = await res.json();
    return data;
}


export { getCabins, deleteCabin, createEditCabin };