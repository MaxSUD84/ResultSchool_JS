import chroma from "chroma-js";

export const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : undefined,
            color: isDisabled
                ? "#ccc"
                : isSelected
                ? chroma.contrast(color, "white") > 2
                    ? "white"
                    : "black"
                : data.color,
            cursor: isDisabled ? "not-allowed" : "default",

            ":active": {
                ...styles[":active"],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined
            }
        };
    },
    multiValueLabel: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            color: "white"
        }; //color.alpha(0.1).css()
    },
    multiValue: (styles, { data }) => {
        // const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: data.color
        };
    },
    multiValueRemove: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            color: "yellow",
            backgroundColor: color.brighten().hex(),
            ":hover": {
                backgroundColor: data.color,
                color: "white"
            }
        };
    }
};

// Стили по умолчанию
// export const colourOptions = [
//     { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
//     { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
//     { value: "purple", label: "Purple", color: "#5243AA" },
//     { value: "red", label: "Red", color: "#FF5630", isFixed: true },
//     { value: "orange", label: "Orange", color: "#FF8B00" },
//     { value: "yellow", label: "Yellow", color: "#FFC400" },
//     { value: "green", label: "Green", color: "#36B37E" },
//     { value: "forest", label: "Forest", color: "#00875A" },
//     { value: "slate", label: "Slate", color: "#253858" },
//     { value: "silver", label: "Silver", color: "#666666" }
// ];

const bootstrapColor = [
    { label: "primary", color: "#0D6EFD" },
    { label: "secondary", color: "#6C757D" },
    { label: "success", color: "#198754" },
    { label: "danger", color: "#DC3545" },
    { label: "warning", color: "#FFC107" },
    { label: "info", color: "#0DCAF0" },
    { label: "light", color: "#F8F9FA" },
    { label: "dark", color: "#212529" }
];

export const getColourOptions = (data) => {
    return data.map((dataElem) => ({
        // console.log(dataElem);
        value: dataElem.color,
        label: dataElem.label,
        name: dataElem.label,
        _id: dataElem.value,
        color: bootstrapColor.filter((bc) => bc.label === dataElem.color)[0]
            ?.color
    }));
};

/*
    color: "primary", label: "Нудила"

    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" }
*/
