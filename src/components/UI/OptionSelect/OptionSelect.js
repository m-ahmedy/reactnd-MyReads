import React from 'react'
import PropTypes from 'prop-types'

const OptionSelect = props => {
    // Options passed here as camelCase
    const { options, onChangeOption, title, selectedOption } = props;

    const optionItems = options.map(option => (
        <option
            value={option.key}
            key={option.key}
        >
            {option.name}
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
