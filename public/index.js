function Spa() {
  const [user, setUser] = React.useState({});

  return (
    <HashRouter>     
        {/* <UserContext.Provider value={{user: {email: ''}}}> */}
        <NavBar setUser={setUser} user={user}/>   

          <div className="container" style={{padding: "20px"}}>

            <Route path="/" exact component={Home} />

            <Route path="/CreateAccount/" component={CreateAccount} />

            <Route path="/login/" component={Login} >
                <Login setUser={setUser}/> </Route>

            <Route path="/deposit/" component={Deposit} >
            <Deposit user={user}/> </Route>

            <Route path="/withdraw/" component={Withdraw} >
            <Withdraw user={user}/> </Route>

            {/* <Route path="/transactions/" component={Transactions} /> */}

            <Route path="/balance/" component={Balance} >
            <Balance user={user}/> </Route>

            <Route path="/alldata/" component={AllData} />

          </div>
        {/* </UserContext.Provider> */}

    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
