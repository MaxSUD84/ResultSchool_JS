import React, {useEffect} from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";
import Divider from "../common/divider";
import SmallTitle from "../common/typografy/smallTitle";

const ListComponent = ({children}) => {
    return React.Children.map(children, (child, i) => {
        const config = {...child.props, value: i+1 };
        return React.cloneElement(child, config);
    })
}

const Component = ({ value }) => {
    return <div>Компонент списка {value}</div>;
};
Component.propTypes = {
    value: PropTypes.number
}

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            
            <SmallTitle>Решение</SmallTitle>
            <Divider />
            <ListComponent>
                <Component />
                <Component />
                <Component />
            </ListComponent>
        </CollapseWrapper>
    );
};



export default ChildrenExercise;
