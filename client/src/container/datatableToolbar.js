import React, { Component } from 'react';
//Shares
import * as Constants from './shares/constants';
import * as Utility from './shares/utils';

class TableToolBar extends Comment {

    render() {
        return (
            <div>
                <div className={Constants.sematicUI.segment}>
                    <div className={Constants.sematicUI.input}>
                        <input
                            type='text'
                            name='filterValue'
                            value={filterValue}
                            placeholder='Filter results...'
                            onChange={this.handleOnChange}
                        />
                        <i className={Constants.sematicUI.searchIcon} />
                    </div>
                    {divider}
                    <select
                        name='perPage'
                        value={perPage}
                        className={Constants.sematicUI.select}
                        onChange={this.handleOnPerPage}
                    >
                        <option value='0'>
                            Per Page
            </option>
                        <option value='10'>
                            10
            </option>
                        <option value='25'>
                            25
            </option>
                        <option value='50'>
                            50
            </option>
                        <option value='100'>
                            100
            </option>
                    </select>
                    {divider}
                    {!useApi && (
                        <button type='button' className={Constants.sematicUI.refresh} onClick={this.setNewData}>
                            <i className={Constants.sematicUI.refreshIcon} />
                            Refresh Faker
            </button>
                    )}
                    {useApi && (
                        <button type='button' className={Constants.sematicUI.refresh} onClick={this.setApiData}>
                            <i className={Constants.sematicUI.refreshIcon} />
                            New API URL
            </button>
                    )}
                    {divider}
                    <button type='button' className={Constants.sematicUI.change} onClick={this.changeData}>
                        <i className={Constants.sematicUI.changeIcon} />
                        {useApi ? 'Use Faker' : 'Use Async API'}
                    </button>
                    {!useApi && (
                        <span>
                            {divider}
                            <div className={Constants.sematicUI.input}>
                                <input
                                    type='text'
                                    name='numResults'
                                    value={numResults}
                                    placeholder='# Rows'
                                    onChange={this.handleOnChange}
                                    style={{ width: '80px' }}
                                />
                                <i className={Constants.sematicUI.rowsIcon} />
                            </div>
                        </span>
                    )}
                    {divider}
                    <div className={Constants.sematicUI.checkbox}>
                        <input
                            type='checkbox'
                            name='showOnRowClick'
                            onChange={this.handleCheckboxChange}
                            checked={showOnRowClick}
                        />
                        <label>
                            Show alert on row click
            </label>
                    </div>
                </div>
                <div className={Constants.sematicUI.message}>
                    <p>
                        {useApi
                            ? 'While using async data, the state is controlled internally by the table'
                            : `Total rows in the table: ${data.length}`}
                    </p>
                </div>
            </div>
        )
    }
}

export default TableToolBar;