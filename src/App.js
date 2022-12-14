import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Account } from './components/Account';
import { Discs } from './components/Discs';
import { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DiscDetails } from './components/DiscDetails';

function App(props) {
  const [dropdown, setDropDown] = useState(true);
  const [dropDownArray, setDropDownArray] = useState([]);
  const [dropped, setDropped] = useState('');
  const [recentPostArray, setRecentPostArray] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [discsArray, setDiscsArray] = useState(null);
  const [discsArrayAll, setDiscsArrayAll] = useState(null);
  const [selectedDisc, setSelectedDisc] = useState(null);
  const [currTopicArray, setCurrTopicArray] = useState([]);
  const [possiblePages, setPossiblePages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchDiscArray, setSearchDiscArray] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [manualSearch, setManualSearch] = useState(null);
  const [searched, setSearched] = useState(false);
  const [bagDiscs, setBagDiscs] = useState(null);

  useEffect(() => {
    let discPage = [];
    if (discsArrayAll !== null) {
      let filteredArray = [];
      let currArray = discsArrayAll;
      if (searchFilter.length > 0) {
        if (manualSearch !== null) {
          filteredArray = manualSearch;
        }
        for (let i = 0; i < searchFilter.length; i++) {
          filteredArray = currArray.filter((disc) => {
            return disc[searchFilter[i].main] === searchFilter[i].sub;
          });
          if (manualSearch !== null) {
            filteredArray = manualSearch;
          }
          currArray = filteredArray;
          if (i !== searchFilter.length - 1) {
            filteredArray = [];
          }
        }
      } else {
        filteredArray = discsArrayAll.filter((disc) => {
          return disc;
        });
        if (manualSearch !== null) {
          filteredArray = manualSearch;
        }
      }
      let numPages = Math.ceil(filteredArray.length / 42);
      setPossiblePages(numPages);
      for (let i = currPage * 42 - 42; i < currPage * 42; i++) {
        if (filteredArray[i]) {
          discPage.push(filteredArray[i]);
        }
      }
      setSearchDiscArray(discPage);
    }
  }, [discsArrayAll, currPage, searchFilter, searched]);

  useEffect(() => {
    if (loggedUser) setBagDiscs(loggedUser.userDiscs);
  }, [loggedUser ? loggedUser.userDiscs : false]);

  const getDiscs = async () => {
    const response = await axios.get('https://discitapi.herokuapp.com/disc');
    let discPage = [];
    for (let i = 0; i < 20; i++) {
      discPage.push(response.data[i]);
    }
    setDiscsArrayAll(response.data);
    setDiscsArray(discPage);
  };

  const getRecentPostArray = async () => {
    const response = await axios.get(
      'https://dgb-server.herokuapp.com/api/recentPosts'
    );
    setRecentPostArray(response.data);
  };

  const getCurrTopicPostArray = async () => {
    const response = await axios.get(
      `https://dgb-server.herokuapp.com/api/posts-by-topic/${selectedDisc.name_slug}`
    );
    setCurrTopicArray(response.data);
  };

  useEffect(() => {
    getRecentPostArray();
    getDiscs();
  }, []);

  useEffect(() => {
    if (selectedDisc !== null) {
      getCurrTopicPostArray();
    }
  }, [selectedDisc]);

  return (
    <div className="App">
      <Header
        {...props}
        logged={logged}
        loggedUser={loggedUser}
        setLogged={setLogged}
        setLoggedUser={setLoggedUser}
        navigate={useNavigate()}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              {...props}
              setSelectedDisc={setSelectedDisc}
              getRecentPostArray={getRecentPostArray}
              getDiscs={getDiscs}
              discsArray={discsArray}
              setDiscsArray={setDiscsArray}
              recentPostArray={recentPostArray}
              setRecentPostArray={setRecentPostArray}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              navigate={useNavigate()}
              bagDiscs={bagDiscs}
              setBagDiscs={setBagDiscs}
            />
          }
        />

        <Route
          exact
          path="/signup"
          element={
            <Signup
              {...props}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              navigate={useNavigate()}
              setBagDiscs={setBagDiscs}
            />
          }
        />

        <Route
          exact
          path="/login"
          element={
            <Login
              {...props}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              navigate={useNavigate()}
            />
          }
        />

        <Route
          eaxct
          path="/disc/details/:discName"
          element={
            <DiscDetails
              {...props}
              selectedDisc={selectedDisc}
              setSelectedDisc={setSelectedDisc}
              discsArray={discsArray}
              setDiscsArray={setDiscsArray}
              navigate={useNavigate()}
              recentPostArray={currTopicArray}
              setRecentPostArray={setCurrTopicArray}
              getRecentPostArray={getRecentPostArray}
              style={'view'}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              setBagDiscs={setBagDiscs}
            />
          }
        />

        <Route
          eaxct
          path="/viewDiscs"
          element={
            <Discs
              {...props}
              selectedDisc={selectedDisc}
              setSelectedDisc={setSelectedDisc}
              dropDown={dropdown}
              setDropDown={setDropDown}
              dropDownArray={dropDownArray}
              setDropDownArray={setDropDownArray}
              dropped={dropped}
              setDropped={setDropped}
              manualSearch={manualSearch}
              setManualSearch={setManualSearch}
              discsArrayAll={discsArrayAll}
              discsArray={searchDiscArray}
              currPage={currPage}
              setCurrPage={setCurrPage}
              possiblePages={possiblePages}
              setSearched={setSearched}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setSearchDiscArray={setSearchDiscArray}
              setDiscsArray={setDiscsArray}
              style={'view'}
              pageAble={true}
              navigate={useNavigate()}
              recentPostArray={currTopicArray}
              setRecentPostArray={setCurrTopicArray}
              getRecentPostArray={getRecentPostArray}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              bagDiscs={bagDiscs}
              setBagDiscs={setBagDiscs}
              searched={searched}
            />
          }
        />

        <Route
          eaxct
          path="/disc/details/:discName"
          element={
            <DiscDetails
              {...props}
              selectedDisc={selectedDisc}
              setSelectedDisc={setSelectedDisc}
              discsArray={discsArray}
              setDiscsArray={setDiscsArray}
              navigate={useNavigate()}
              recentPostArray={currTopicArray}
              setRecentPostArray={setCurrTopicArray}
              getRecentPostArray={getRecentPostArray}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              setBagDiscs={setBagDiscs}
            />
          }
        />

        <Route
          exact
          path="/account"
          element={
            <Account
              {...props}
              setSelectedDisc={setSelectedDisc}
              getRecentPostArray={getRecentPostArray}
              logged={logged}
              loggedUser={loggedUser}
              setLogged={setLogged}
              setLoggedUser={setLoggedUser}
              navigate={useNavigate()}
              bagDiscs={bagDiscs}
              setBagDiscs={setBagDiscs}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
