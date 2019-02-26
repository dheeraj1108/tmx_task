import React from 'react';

//Shares
import * as Constants from '../shares/constants';
//import * as Utility from '../shares/utils';

const ToolbarSearch = (props) => {
    const optionsValues = [
        { value: 0, title: "per page" },
        { value: 10, title: "10" },
        { value: 25, title: "25" },
        { value: 50, title: "50" },
        { value: 100, title: "100" }
    ]
    const divider = <span style={{ display: 'inline-block', margin: '10px' }} />
    return (
        <div className={Constants.sematicUI.input}>
            <input
                type='text'
                name='filterValue'
                value={props.filterValue}
                placeholder='Filter results...'
                onChange={props.handleOnChange}
            />
            <i className={Constants.sematicUI.searchIcon} />

            {divider}
            <select
                name='perPage'
                value={props.perPage}
                className={Constants.sematicUI.select}
                onChange={props.handleOnPerPage}
            >
                {optionsValues.map((val, ind) => {
                    return <option key={ind} value={val.value}>{val.title} </option>
                })}
            </select>
        </div>
    )
}

export default ToolbarSearch;