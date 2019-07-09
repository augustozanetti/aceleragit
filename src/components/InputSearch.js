import React from 'react';
import styled from 'styled-components'

const Input = styled.input`
    margin: 10px 5px;
    padding: 0.5em;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

export default function InputSearch({name, value, change}) {
    return <Input name={name} placeholder={name} value={value} onChange={change} />
}
