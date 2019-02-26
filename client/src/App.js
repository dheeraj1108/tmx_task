import React, { Component } from 'react';
import axios from 'axios';

// Third pary packages
//import faker from 'faker';
import SmartDataTable from 'react-smart-data-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

//Shares
import * as Constants from './shares/constants';
import * as Utility from './shares/utils';


//Component
import ToolbarSearch from './components/toolbarsearch';
import FakeDataApi from './components/fakeDataApi';
import ShowTradeModal from './components/showTradeModal';

//Utility.generateData();

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      useApi: true,
      apiData: '',
      apiIdx: -1,
      numResults: 10,
      data: [],
      rowData: null,
      filterValue: '',
      perPage: 5,
      showOnRowClick: true,
      modalOpen: false
    }

    this.setNewData = this.setNewData.bind(this)
    this.setApiData = this.setApiData.bind(this)
    this.changeData = this.changeData.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnPerPage = this.handleOnPerPage.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
  }

  componentDidMount() {
    const { numResults } = this.state
    this.setNewData(numResults)
    this.setApiData()
  }

  setNewData() {
    var that = this;
    const S3_Bucket = `http://localhost:3600/s3buckettrade`;
    axios.get(S3_Bucket)
      .then(function (response) {
        console.log("User Data ", response.data);
        toast.info(`Loaded ${response.data.length} data from API`);
        that.setState({
          data: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setApiData() {
    var that = this;
    const { numResults } = this.state;
    const dummyData = `http://localhost:3600/trade/${numResults}`;
    axios.get(dummyData)
      .then(function (response) {
        console.log("User Data ", response.data);
        toast.info(`Loaded ${response.data.length} fake data from API`);
        that.setState({
          apiData: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete(event, idx, row) {
    event.preventDefault()
    event.stopPropagation()
    const { data, apiData } = this.state
    const { _id, id } = row
    toast.success(`Successfully Deleted ${row.fullName}`);
    let orgInd
    if (_id) orgInd = apiData.findIndex(({ _id: thisId }) => thisId === _id)
    if (id) orgInd = apiData.findIndex(({ id: thisId }) => thisId === id)
    apiData.splice(orgInd, 1)
    this.setState({ apiData })
  }

  getHeaders() {
    return {
      _id: {
        text: 'Identifier',
        invisible: true,
        filterable: false,
        transform: value => `Row #${value + 1}`,
      },
      avatar: {
        text: 'Profile Pic',
        sortable: false,
        filterable: false,
      },
      _username: {
        invisible: true,
      },
      password_: {
        invisible: true,
      },
      isMarried: {
        invisible: true,
      },
      'address.city': {
        text: 'City',
      },
      'address.state': {
        text: 'State',
      },
      'address.country': {
        text: 'Country',
      },
      url: {
        text: 'Web Page',
        sortable: false,
        filterable: false,
      },
      actions: {
        text: 'Actions',
        sortable: false,
        filterable: false,
        transform: (value, idx, row) => (
          <i
            className={Constants.sematicUI.deleteIcon}
            style={{ cursor: 'pointer' }}
            onClick={e => this.handleDelete(e, idx, row)}
            onKeyDown={e => this.handleDelete(e, idx, row)}
            role='button'
            tabIndex='0'
          />
        ),
      },
      thumbnailUrl: {
        text: 'Thumbnail',
        sortable: false,
        filterable: false,
        isImg: true,
      },
    }
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'numResults') this.setNewData()
    })
  }

  handleOnPerPage({ target: { name, value } }) {
    this.setState({ [name]: parseInt(value, 10) })
  }

  changeData() {
    const { useApi } = this.state
    this.setState({
      useApi: !useApi,
      filterValue: '',
      perPage: 0,
    })
  }

  handleCheckboxChange() {
    const { showOnRowClick } = this.state
    this.setState({ showOnRowClick: !showOnRowClick })
  }

  onRowClick(event, { rowData, rowIndex, tableData }) {
    const { showOnRowClick } = this.state;
    if (showOnRowClick) {
      const { fullName, name, id } = rowData
      let value = fullName || name || id
      if (!value) {
        const [key] = Object.keys(rowData)
        value = `${key}: ${rowData[key]}`
      }
      //window.alert(`You clicked ${value}'s row !`);
      this.setState({
        rowData: rowData,
      })
      console.log("rowData rowData ", this.state.rowData);
      this.showModal();
    } else {
      // The following results should be identical
      console.log(rowData, tableData[rowIndex])
    }
  }

  showModal = () => this.setState({ modalOpen: true });
  closeModal = () => this.setState({ modalOpen: false });
  notify = () => toast.warn('While using async data, the state is controlled internally by the table');
  showTotalRows = () => toast.info(`Total rows in the table: ${this.state.data.length}`);

  render() {
    const { useApi, apiData, data, rowData, filterValue, perPage, numResults, showOnRowClick } = this.state
    const divider = <span style={{ display: 'inline-block', margin: '10px' }} />
    const headers = this.getHeaders()
    return (
      <div className={Constants.sematicUI.segment} style={{ 'marginTop': '65px' }}>
        <ShowTradeModal rowData={rowData} showModal={this.state.modalOpen} closeModal={this.closeModal} />
        <ToastContainer />
        <div className={Constants.sematicUI.menu} style={{ padding: '10px' }}>
          <a href="#" className="header item">
            TMX
          </a>
          <ToolbarSearch
            filterValue={filterValue}
            handleOnChange={this.handleOnChange}
            perPage={perPage}
            handleOnPerPage={this.handleOnPerPage}
            handleCheckboxChange={this.handleCheckboxChange}
            showOnRowClick={showOnRowClick}
            useApi={useApi}
          />

          <FakeDataApi
            useApi={useApi}
            numResults={numResults}
            setNewData={this.setNewData}
            setApiData={this.setApiData}
            changeData={this.changeData}
            handleOnChange={this.handleOnChange}
            notify={this.notify}
            showTotalRows={this.showTotalRows}
          />
        </div>

        <SmartDataTable
          data={useApi ? data : apiData}
          dataKey=''
          headers={headers}
          name='test-table'
          className={Constants.sematicUI.table}
          filterValue={filterValue}
          perPage={perPage}
          sortable
          withToggles
          withLinks
          withHeader
          loader={(
            <div className={Constants.sematicUI.loader} style={{ 'marginTop': '15%' }}>
              Loading...
            </div>
          )}
          onRowClick={this.onRowClick}
          parseBool={{
            yesWord: 'Indeed',
            noWord: 'Nope',
          }}
          parseImg={{
            style: {
              border: '1px solid #ddd',
              borderRadius: '2px',
              padding: '3px',
              width: '60px',
            },
            /* className: 'ui avatar image' */
          }}
          dynamic
          emptyTable={(
            <div className={Constants.sematicUI.message}>
              There is no data available to display.
            </div>
          )}
        />
      </div >
    )
  }

}

export default App;
