import React from 'react'
import PropTypes from 'prop-types'
import { sentenceCase } from 'change-case';

const OptionSelect = props => {
    const { options, onChangeOption, title, selectedOption } = props;

    const optionItems = options.map(option => (
        <option
            value={option}
            key={option}
        >
            {sentenceCase(option)}
        </option>
    ));

    return (
        <div className="book-shelf-changer">
            <select
                onChange={onChangeOption}
                defaultValue={selectedOption}
            >
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
