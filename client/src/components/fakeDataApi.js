import React from 'react';
import Aux from '../hoc/aux';

//Shares
import * as Constants from '../shares/constants';

const FakeDataApi = (props) => {
    const divider = <span style={{ display: 'inline-block', margin: '10px' }} />
    return (
        <Aux>
            {divider}
            {!props.useApi && (
                <button type='button' className={Constants.sematicUI.refresh}
                    onClick={props.setNewData}>
                    <i className={Constants.sematicUI.refreshIcon} />
                    Refresh Faker
                    </button>
            )}
            {props.useApi && (
                <button type='button' className={Constants.sematicUI.refresh}
                    onClick={props.setApiData}>
                    <i className={Constants.sematicUI.refreshIcon} />
                    New API URL
                </button>
            )}
            {divider}
            <button type='button' className={Constants.sematicUI.change}
                onClick={props.changeData}>
                <i className={Constants.sematicUI.changeIcon} />
                {props.useApi ? 'Use Faker' : 'Use Async API'}
            </button>
            {!props.useApi && (
                <React.Fragment>
                    {divider}
                    <div className={Constants.sematicUI.input}>
                        <input
                            type='text'
                            name='numResults'
                            value={props.numResults}
                            placeholder='# Rows'
                            onChange={props.handleOnChange}
                            style={{ width: '80px' }}
                        />
                        <i className={Constants.sematicUI.rowsIcon} />
                    </div>
                </React.Fragment>
            )}

            {
                /* (props.useApi && props.numResults > 0)
                    ? null
                    : props.showTotalRows() */
            }
        </Aux>
    )
}

export default FakeDataApi;