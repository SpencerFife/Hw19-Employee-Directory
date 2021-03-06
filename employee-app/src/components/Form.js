import React from 'react';
import './form.css';

function Form(props) {
    
    return (
        <div className="form-group">
            <label htmlFor="firstName">Type in some letters to see employee's first names that include those letters</label>
            <input className="form-control"
                value={props.firstName}
                name="firstName"
                onChange={props.handleInputChange}
                type="text"
                placeholder="First Name"
            />
            <label forhtml="sort">Sort Employees By Ascending or Descending Birth Month</label>
            <select 
            onChange={props.handleSelectChange}
            id="sort">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    )
}
export default Form;