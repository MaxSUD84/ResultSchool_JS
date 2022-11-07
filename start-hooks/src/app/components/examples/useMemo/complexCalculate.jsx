import React, { useEffect, useState, useMemo } from "react";
import CardWrapper from "../../common/Card";
import Divider from "../../common/divider";
import SmallTitle from "../../common/typografy/smallTitle";

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

function runFactorial(n) {
    console.log("Run Factorial");
    return factorial(n);
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100);
    const [otherState, setOtherState] = useState(false);

    const buttonColor = otherState ? "primary" : "secondary";
    // const buttonColor = useMemo(
    //     () => ({
    //         value: otherState ? "primary" : "secondary"
    //     }),
    //     [otherState]
    // );

    useEffect(() => {
        console.log("reder button color");
    }, [buttonColor]);

    const fact = useMemo(() => runFactorial(value), [value]);
    // const fact = runFactorial(value);

    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <Divider />
                <p>Value: {value}</p>
                <p>Result fact: {fact}</p>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState + 10)}
                >
                    Increment
                </button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState - 10)}
                >
                    Decrement
                </button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    // className={"btn ms-md-2 btn-" + buttonColor.value}
                    className={"btn mx-2 btn-" + buttonColor}
                    onClick={() => setOtherState(!otherState)}
                >
                    Изменить цвет
                </button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
