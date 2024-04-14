const URL = import.meta.env.VITE_BASE_URL + "/setting";

export async function getSettings() {
  const res = await fetch(`${URL}/all`);
  if (!res.ok) {
    throw new Error("Something went wrong with fetching settings");
  }
  const data = await res.json();
  return data.at(0);
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  if (!newSetting.id) {
    newSetting.id = 1;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  const res = await fetch(`${URL}/soe`, {
    method: "PATCH",
    body: JSON.stringify(newSetting),
    headers: myHeaders,
  })
  if (!res.ok) {
    throw new Error(`Something went wrong while updating new Cabin`);
  }
  const data = await res.json();
  return data;
}
