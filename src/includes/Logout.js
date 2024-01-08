import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Logout = () => {
    const BASE_URL = 'https://backend.alsahaba.sa/api';
    const { state } = useLocation();
    const nav = useNavigate();

    const logout = async () => {
        await axios({
            method: "post",
            url: `${BASE_URL}/logout-all/`,
            headers: { "Authorization": `Token ${state.logInToken}` },
        })
            .then(function (response) {
                nav("/", {
                    state: {
                        currentLanguage: state?.currentLanguage,
                        isLoggedIn: false,
                        user: "patient"
                    },
                });
            })
            .catch(function (response) {
                console.log(response)
            });
    }


    useEffect(() => {
        logout()
    });
}