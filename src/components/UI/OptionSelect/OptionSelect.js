import React from 'react'
import PropTypes from 'prop-types'
import { paramCase } from 'change-case';

// Test 
const testOptions = ['option 1', 'option 2', 'option 3', 'option 4'];

const OptionSelect = props => {
    const { options, onChangeOption, title } = props;

    const optionItems = testOptions.map(option => (
        <option
            value={option}
            key={paramCase(option)}
        >
            {option}
        </option>
    ));
    
    return (
        <div className="book-shelf-changer">
            <select>
                <option value={title} disabled>{title}</option>
                {optionItems}
            </select>
        </div>
    )
}

OptionSelect.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChangeOption: PropTypes.func.isRequired
}

export default OptionSelect
