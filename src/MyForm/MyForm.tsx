import React from 'react'
import {TextField, Button} from "@material-ui/core";
import {Form, Formik} from "formik";

interface Values {
    player1Name: string;
    player2Name: string;

}

interface Props {

    onSubmit: (values: Values) => void;

}

const MyForm: React.FC<Props> = ({onSubmit}) =>{
    return (
        <Formik initialValues={{player1Name: '', player2Name: ''}} onSubmit={(values) => {
            onSubmit(values)
        }}>
            {({values, handleChange, handleBlur}) => (
                <Form>
                    <div>
                    <TextField
                        placeholder="Player X"
                        name="player1Name"
                        value ={values.player1Name}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                    </div>
                    <div>
                    <TextField
                        placeholder="Player O"
                        name="player2Name"
                        value ={values.player2Name}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>

            )}</Formik>);
}

export default MyForm;