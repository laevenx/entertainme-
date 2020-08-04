import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import AddData from './pages/AddData'
import MovieDetail from "./components/MovieDetail";
import SeriesDetail from "./components/SeriesDetail";
import MovieEdit from "./pages/MovieEdit";
import SerieEdit from "./pages/SerieEdit";

const { Header } = Layout;

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/movies">Movies</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/series">Series</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/add">New Movies/Series</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/series">
            <Series />
          </Route>
          <Route exact path='/series/edit/:id' component={SerieEdit} />
          <Route exact path='/movies/edit/:id' component={MovieEdit}/>
          <Route exact path='/add' component={AddData}/>
          <Route exact path='/movies/:id' component={MovieDetail}/>
          <Route exact path='/series/:id' component={SeriesDetail}/>
          
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
