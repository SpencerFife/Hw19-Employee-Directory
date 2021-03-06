import React from 'react';
import Form from './Form';
import API from '../utils/API';
import ResultTable from './ResultTable';

class SearchResultContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: ``,
            results: [],
            filteredResults: []
        };
    }

    //When this component mounts search the API for employees
    componentDidMount() {
        this.searchEmployees();
    }

    searchEmployees() {
        API.search()
            .then(res => {
                this.setState({ results: res.data.results, filteredResults: res.data.results })
            })
            .catch(err => console.log(err));
    };
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const filteredResults = this.state.results.filter(result => {
            return result.name.first.toLowerCase().includes(value.toLowerCase())
        })
        this.setState({
            [name]: value,
            filteredResults
        });
    };
    handleSelectChange = (event) => {
        const value = event.target.value;
        let sortedResults = [];

        if (value === 'ascending') {
            sortedResults = [...this.state.filteredResults].sort((a, b) => a.dob.date.slice(5,7) - b.dob.date.slice(5,7))
            
        } else {
            sortedResults = [...this.state.filteredResults].sort((a, b) => b.dob.date.slice(5,7) - a.dob.date.slice(5,7))
        }
        this.setState({
            filteredResults: sortedResults
        })
    }
    
    render() {
        return (
            <div>
                <Form
                    firstName={this.state.firstName}
                    handleSelectChange={this.handleSelectChange}
                    handleInputChange={this.handleInputChange}
                />
                <ResultTable results={this.state.filteredResults} search={this.state.search} />
            </div>
        );
    }
}
export default SearchResultContainer;