import React from 'react'

const createViewByYear = data =>{
    let itens = [];
    const reposPerYears = data.map(item => item.created_at.substr(0,4)).reduce((allYears, year) =>{
        if (year in allYears) {
            allYears[year]++;
          }
          else {
            allYears[year] = 1;
          }
          return allYears;
        
    }, {});

    for (const year in reposPerYears) {
        itens.push(<h1>Ano: {year} / Repositórios: {reposPerYears[year]} </h1>);
    }

    return itens;
}

const RepositoryPerYear = ({data = [] }) => {
    
        if(data.length){
           return createViewByYear(data)
        }   
        return <div></div>
    
}

export default RepositoryPerYear;