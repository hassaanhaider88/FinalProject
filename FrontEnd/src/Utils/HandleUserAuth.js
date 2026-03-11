import BackEnd_URI from "./BackEnd_URI";

export const handleUserLogin = async (formData) => {
    try {
        if (!formData.email || !formData.password) {
            return null;
        }
        const response = await fetch(`${BackEnd_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });
        const data = await response.json();
        // here will be real data later

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const handleUserRegister = async (formData) => {
    try {
        if (!formData.name || !formData.email || !formData.password) {
            return null;
        }

        let response = await fetch(`${BackEnd_URI}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }),
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const handleUserLogOut = async (token) => {
    try {
        const res = await fetch(`${BackEnd_URI}/api/auth/user/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Application: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLocalStorageUser = async (token) => {
    try {
        if (!token) {
            return null
        }
        let response = await fetch(`${BackEnd_URI}/api/auth/loged-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}