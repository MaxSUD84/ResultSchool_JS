import React from "react";
import CardWrapper from "../../common/Card";

const withFunctions = (Component) => (props) => {
    const isAuth = () => !!localStorage.getItem("auth")?.includes("token");
    const onLogIn = () => { 
        if(isAuth()) return
        localStorage.setItem("auth", "token")
    }
    const onLogOut = () => { 
        if(!isAuth()) return
        localStorage.removeItem("auth")
    }
    
    return (
        <>
            <CardWrapper>
                <Component {...props}
                    isAuth={isAuth()}
                    onLogIn={onLogIn}
                    onLogOut={onLogOut}
                />
            </CardWrapper>
        </>
    );
};

export default withFunctions;