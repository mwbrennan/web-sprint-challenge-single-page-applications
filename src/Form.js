import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';


const schema = yup.object().shape({
    name: yup.string().required('You forgot your name').min(2, 'name needs to be 2 chars min'),
    size: yup.string().required('you must select a size'),
    sauce: yup.string().required('you must select a sauce'),
    sausage: yup.boolean().defined(),
    pepperoni: yup.boolean().defined(),
    onions: yup.boolean().defined(),
    garlic: yup.boolean().defined(),
    instructions: yup.string().notRequired()
});


export default function OrderForm(props) {
    console.log(props)

    const [ formState, setFormState ] = useState({
        name: '', 
        size: '',
        sauce: '',
        sausage: false,
        pepperoni: false,
        onions: false,
        garlic: false,
        instructions: '',
    });

    const [ errorState, setErrorState ] = useState({
        name: '', 
        size: '',
        sauce: '',
        sausage: '',
        pepperoni: '',
        onions: '',
        garlic: '',
        instructions: '',
    });

    const [ disabled, setDisabled ] = useState() 
    
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrorState({...errorState, [name]: ''}))
            .catch(err => {
                console.log(err)
                setErrorState({...errorState, [name]: String(err)})})
    }

    const change = event => {
        const { checked, value, name, type } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setFormState({...formState, [name]: valueToUse})
    };

    const submit = event => {
        event.preventDefault();
        axios   
            .post('https://reqres.in/api/orders', formState)
            .then(res => {
                console.log('Order Details: ', res.data )
                props.history.push("/");
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        schema.isValid(formState).then(valid => setDisabled(!valid))
    }, [formState])

    return(
        <FormStyle onSubmit={submit}>
            <div>
                <div>{errorState.name}</div>
                <div>{errorState.size}</div>
                <div>{errorState.sauce}</div>
                <div>{errorState.user}</div>
            </div>
            <div>
                <h2>Build your own pizza pie</h2>
            </div>
            <div>
                <label>
                    Name 
                        <input 
                            value={formState.name}
                            onChange={change}
                            name='name'
                            type='text'
                        />
                </label>
                <br></br>
                <label>
                    Size
                    <select onChange={change} value={formState.size} name="size">
                        <option value="">- Select a size -</option>
                        <option value="small">Small</option>
                        <option value="large">Large</option>
                        <option value="extra large">Extra Large</option>
                    </select>
                </label>
                <br></br>
                <label>
                    Sauce
                    <select onChange={change} value={formState.sauce} name="sauce">
                        <option value="">- Select your sauce -</option>
                        <option value="original red">Original Red</option>
                        <option value="garlic ranch">Garlic Ranch</option>
                        <option value="bbq sauce">BBQ Sauce</option>
                    </select>
                </label>
                <br></br>
                <div>
                    <h4>Select Toppings</h4>
                <label>
                    Sausage
                    <input
                        type="checkbox"
                        name="sausage"
                        checked={formState.sausage}
                        onChange={change}
                    />
                </label>
                <br></br>
                <label>
                    Pepperoni
                    <input
                        type="checkbox"
                        name="pepperoni"
                        checked={formState.pepperoni}
                        onChange={change}
                    />
                </label>
                <br></br>
                <label>
                    Onions 
                    <input
                        type="checkbox"
                        name="onions"
                        checked={formState.onions}
                        onChange={change}
                    />
                </label>
                <br></br>
                <label>
                    Garlic
                    <input
                        type="checkbox"
                        name="garlic"
                        checked={formState.garlic}
                        onChange={change}
                    />
                </label>
                </div>
                <br></br>
                <label>
                    Instructions 
                        <input 
                            value={formState.instructions}
                            onChange={change}
                            name='instructions'
                            type='text'
                        />
                </label>
                <br></br>
                <button name='submit' disabled={disabled} >Order Now</button>
            </div>
        </FormStyle>
    )
};

const FormStyle = styled.form`
    background-color: lightgray;
    border-radius: 8px;
    padding: 30px;
    width: 50%;
    margin: auto;

    button{
        margin-top: 20px;
        width: 8rem;
        height: 2rem;
    }

`