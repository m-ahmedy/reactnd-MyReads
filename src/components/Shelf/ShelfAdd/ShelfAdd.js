import React from 'react'

const ShelfAdd = props => {
    const { onAddShelf, value, onChangeName, valid } = props;

    return (
        <div className="add-shelf">
            <input
                type="text"
                onChange={(e) => onChangeName(e.target.value)}
                value={value}
                placeholder='New shelf'
            />
            <button
                onClick={onAddShelf}
                disabled={!valid}
            >
                Add
            </button>
        </div>
    )
}

export default ShelfAdd
