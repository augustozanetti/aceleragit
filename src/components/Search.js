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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();
        console.log("state", this.state);
        fetch(`https://api.github.com/users/${this.state.user}/repos`)
            .then(response => response.json())
            .then(data => {
                const repositories = data.map(item => ({
                    id: item.id, 
                    name: item.name
                    })
                );            
                this.setState({ repositories });
            })
            .catch(error => console.log(error));
    }

    handleChange(event){
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }
    
    render() {
        const { user, repositories } = this.state;
         
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input name="user" value={user} onChange={this.handleChange}/>
                        <button type="submit">Buscar</button>
                    </div>
                </form>
                <RepositoryList data={repositories} />
            </Fragment>
        )
    }
}
