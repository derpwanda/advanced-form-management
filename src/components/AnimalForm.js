import React /* { useState } */ from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const AnimalForm = props => {
    console.log(props);
    return (
        <Form>
            {props.errors.species && <p>{props.errors.species}</p>}
            <Field type='text' name='species' placeholder='Species' />
            <Field type='number' name='age' placeholder='age' />
            <Field component='select' name='diet'>
                <option value='' disabled>
                    Select Diet:
                </option>
                <option value='carnivore'>Carnivore</option>
                <option value='herbivore'>Herbivore</option>
                <option value='omnivore'>Omnivore</option>
            </Field>

            <label>
                <Field type='checkbox' name='vaccinations' />
                <span>Vaccinations</span>
            </label>

            <Field component='textarea' name='notes' placeholder='notes' />

            <button type='submit'>Submit</button>
        </Form>
    );
};

// export default Animal Form;
export default withFormik({
    // the 'values' object on comes from Formik (read docs), it can be named anything, you just need to be consistent
    mapPropsToValues: values => {
        //makes these inputs controlled, sets the values automatically for us
        return {
            //always pass through something even if it's an empty string
            //these keys line up with the "name" attribute on our Fields
            species: values.species || "default value",
            age: values.age || "",
            diet: values.diet || "",
            vaccinations: values.vaccinations || false,
            notes: values.notes || ""
        };
    },
    validationSchema: yup.object().shape({
        species: yup.string().required("species required"),
        age: yup
            .number()
            .required("age required")
            .positive(),
        diet: yup.string().required("diet required"),
        vaccinations: yup
            .boolean()
            .oneOf([true] /* "Animal must be vaccinated" */)
    }),
    handleSubmit: values => {
        // console.log(values);
        axios
            .post("https://reqres.in/api/animals", values)
            .then()
            .catch(err => {
                console.log("Error", err);
            });
    }
})(AnimalForm);
//curly brackets pass through object configuration
