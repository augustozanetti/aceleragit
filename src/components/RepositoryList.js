import React from 'react'

function RepositoryList(props) {
    return (
        <ul>
           {props.data.map(item => <li key={item.id}>{item.name}</li>)} 
        </ul>
    )
}

export default RepositoryList;
