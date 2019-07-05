import React, { Component, Fragment } from 'react';
import RepositoryList from './RepositoryList'

export default class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: "",
            repositories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        fetch(`https://api.github.com/users/${this.state.user}/repos`)
        .then(response => response.json())
        .then((data) => {
            const repositories = data.map(item => ({
                id: item.id, 
                name: item.name
                })
            );
            
            this.setState({ repositories })
        })
        .catch(error => console.log(error));
    }

    handleChange(e){
        this.setState({user: e.target.value});
    }
    
    render() {
        return (
            <Fragment>
                <div>
                    <input value={this.state.user} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Buscar</button>
                </div>
                <RepositoryList data={this.state.repositories} />
            </Fragment>
        )
    }
}
