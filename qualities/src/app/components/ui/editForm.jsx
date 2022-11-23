import React from "react";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import colors from "../../constants/colors.json";
import useForm from "../../hooks/useForm";

const EditForm = ({ data, onSubmit }) => {
    const { handleChange, handeleSubmit, form } = useForm(data, onSubmit);
    return (
        <form onSubmit={handeleSubmit}>
            <TextField label="Наименование" name="name" onChange={handleChange} value={form.name || ""} />
            <SelectField label="Цвет" name="color" options={colors} onChange={handleChange} value={form.color || ""} />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default EditForm;
