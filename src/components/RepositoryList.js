import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
    list-style-type: none;
`;

const Li = styled.li`
    height: 40px;
    font-size: 18px;
`;

function RepositoryList(props) {
    return (
        <Ul>
           {props.data.map(item => <Li key={item.id}>{item.name}</Li>)} 
        </Ul>
    )
}

export default RepositoryList;
