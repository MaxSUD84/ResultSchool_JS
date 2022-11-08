import React from "react";
import PropTypes from "prop-types";
import ButtonComponent from "./buttonComponent";



const SimpleComponent = ({ onLogIn, onLogOut, isAuth }) => {
    return (
        <>
            <p>&ldquo;isAuth&ldquo; value: {isAuth.toString()}</p>
            {isAuth 
                ?   <ButtonComponent 
                    label="Выйти из системы"
                    isAuth={true}
                    onClick={onLogOut} /> 
                :   <ButtonComponent 
                    label="Войти"
                    isAuth={false}
                    onClick={onLogIn} />
            }               
        </>
    )
}

SimpleComponent.default = {
    isAuth: false
}

SimpleComponent.propTypes = {
    onLogIn: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.bool
}

export default SimpleComponent