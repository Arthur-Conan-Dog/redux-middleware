import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';

function App({ fetchData, clearData, isLoading, data }) {
  const [requestData, setRequestData] = useState(false);

  useEffect(() => {
    if (requestData) {
      fetchData().finally(() => setRequestData(false))
    }
  }, [requestData, fetchData]);

  return (
    <div>
      <span>{isLoading ? 'Loading...' : JSON.stringify(data)}</span>
      <button onClick={() => setRequestData(true)}>Request Data</button>
      <button onClick={() => clearData()}>Clear Data</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loading,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(actionCreator.fetchData()),
  clearData: () => dispatch(actionCreator.clearData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
