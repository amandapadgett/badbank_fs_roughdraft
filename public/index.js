function Spa(){
  // const { user } = React.useAuthListener();

  return (
    <HashRouter>     

        <UserContext.Provider value={{user: {email: ''}}}>
        <NavBar />   

          <div className="container" style={{padding: "20px"}}>

            <Route path="/" exact component={Home} />

            <Route path="/createaccount/" component={CreateAccount} />

            <Route path="/login/" component={Login} />

            <Route path="/deposit/" component={Deposit} />

            <Route path="/withdraw/" component={Withdraw}/ >

            <Route path="/balance/" component={Balance} />

            <Route path="/alldata/" component={AllData} />

          </div>
        </UserContext.Provider>

    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
