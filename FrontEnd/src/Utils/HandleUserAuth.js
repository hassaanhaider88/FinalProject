import BackEnd_URI from "./BackEnd_URI"
export const handleUserLogin = async (formData) => {
    try {
        if (!formData.email || !formData.password) {
            return null;
        }
        // const response = await fetch(`${BackEnd_URI}/api/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // });
        // const data = await response.json();
        // here will be real data later
        const data = {
            success: true,
            message: "Login successfully",
            data: {
                name: "test",
                email: "test@test.com",
                role: "admin",
                enrolledCourses: [],
                createdCourses: [],
            }
        }
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const handleUserRegister = async (formData) => {
    try {
        if (!formData.name || !formData.email || !formData.password) {
            return null;
        }

        // const response = await fetch(`${BackEnd_URI}/api/register`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        // const data = await response.json();
        const data = {
            success: true,
            message: "Register successfully",
            data: {
                name: "test",
                email: "test",
                role: "admin",
                enrolledCourses: [],
                createdCourses: [],
            }
        }
        return data;

    } catch (error) {
        console.log(error)
    }
}