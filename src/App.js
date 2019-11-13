import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { fetchData } from './action';

function App({ fetchData, isLoading, data }) {
  useEffect(() => {
    fetchData().then(() => console.log('then'))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoading} {JSON.stringify(data)}
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.loading,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
