import React from "react";
import CardWrapper from "../../common/Card";
import Divider from "../../common/divider";
import SmallTitle from "../../common/typografy/smallTitle";
import TextField from "../../common/form/textField";

const CloneElementExample = () => {
    const handleChange = (target) => {
        console.log("change: ", target)
    }
    const field = <TextField label="email" name= "email"/>

    return (
        <CardWrapper>
            <SmallTitle>Пример</SmallTitle>
            <Divider />
            <div>
                {field}
                {React.cloneElement(field, {onChange: handleChange, label: "Clone email"})}                  
            </div>
        </CardWrapper>
    );
};

export default CloneElementExample;
