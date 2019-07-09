import React, { Component, Fragment } from 'react';
import RepositoryList from './RepositoryList';
import InputSearch from './InputSearch';

export default class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: '',
            repository: '',
            language: '',
            searchType: 'user',
            repositories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();

        const {user, repository, language} = this.state
        let api = `https://api.github.com/users/${user}/repos`;

        if(this.state.searchType === 'repo'){
            let textLanguage = language ? `+language:${language}` : '';

            api = `https://api.github.com/search/repositories?q=${repository}${textLanguage}` 
        }

        fetch(api)
            .then(response => response.json())
            .then(data => {
                let repositories = [];
                let setRepositories = items => repositories = items.map(item => ({ id: item.id, name: item.name }));
                
                if(data.message || (this.state.searchType == 'repo' && !data.items)){
                    alert('pesquisa inválida');
                    return;
                }

                setRepositories(data.items || data);

                this.setState({ repositories });
            });
    }

    handleChange(event){
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }
    
    render() {
        const { user, repository, language, searchType, repositories } = this.state;
         
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <InputSearch name="user" value={user} change={this.handleChange}/>
                        <InputSearch name="repository" value={repository} change={this.handleChange}/>
                        <InputSearch name="language" value={language} change={this.handleChange}/>
                        <input type="radio" name="searchType" value="user" checked={searchType === 'user'} onChange={this.handleChange} /> User
                        <input type="radio" name="searchType" value="repo" checked={searchType === 'repo'} onChange={this.handleChange}/> Repository/Language
                        <button type="submit">Buscar</button>
                    </div>
                </form>
                <RepositoryList data={repositories} />
            </Fragment>
        )
    }
}
