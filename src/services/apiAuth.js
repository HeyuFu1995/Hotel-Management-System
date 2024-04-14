import { setSession } from "../hooks/useLocalStorageState";

const URL = import.meta.env.VITE_BASE_URL + "/user";

async function login({ email, password }) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const userInfo = {
        email,
        password,
    }
    const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userInfo),
    });
    //login fail
    if (401 === res.status) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const data = await res.json();
    const session = await res.headers.get("userInfo");
    return { data, session };
}

async function register(newUser) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const res = await fetch(`${URL}/register`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newUser),
    });
    const data = await res.json();
    return data;
}

async function update(user) {
    if (typeof user.avatar === "object" && user.avatar !== null) {
        user.avatar = `avatar-${user.id}-${Math.random()}.${user.avatar.type.split("/")[1]}`;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const res = await fetch(`${URL}/update`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
}

async function check() {
    const res = await fetch(`${URL}/check`);
    if (401 === res.status) {
        const msg = await res.text();
        console.warn(msg);
        setSession(null);
        return null;
    }
    const data = await res.json();
    const session = await res.headers.get("userInfo");
    return { data, session };
}

async function logout() {
    const res = await fetch(`${URL}/logout`);
    if (res.ok) {
        setSession(null);
    }
    else {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export { login, check, logout, register, update };