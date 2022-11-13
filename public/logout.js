function Logout() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    return (
        <>
        <Card
        bgcolor='secondary'
        header="Log Out of Your Account"
        status={status}
        body={ show ?
        <LogOutForm 
            setUser={setUser}
            setShow={setShow}
            setStatus={setStatus} />
            :
        <LogOutMsg 
            setShow={setShow}
            setStatus={setStatus} /> }
        />
        </>
    )
}

function LogOutMsg() {
    React.useEffect(() => {
        const createaccount = document.getElementById("nav-createaccount");
        const login = document.getElementById("nav-login");
        const logout = document.getElementById("nav-logout");
        const deposit = document.getElementById("nav-deposit");
        const withdraw = document.getElementById("nav-withdraw");
        const alldata = document.getElementById("nav-alldata");

        createaccount.style.display = "block";
        login.style.display = "block";
        logout.style.display = "none";
        deposit.style.display = "none";
        withdraw.style.display = "none";
        alldata.style.display = "none";
        
    }, []);

    return (
        <>
        <h5>Successfully Logged Out</h5>
        <h6>To Log in Again:</h6>
        <button className="btn btn-light"><a href="#/login/">Login</a></button>
        </>
    )
}

function LogOutForm(props) {
    const [user, setUser] = React.useState('');
   const ctx = React.useContext(UserContext);

   function handleLogout() {
    console.log("logging user out");
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('signed out of firebase')
        })
        .catch(function(error){
            console.log(error)
        })
   }

   return (
    <>
    <div className="logout-confirm">
    Are you sure you want to log out of BadBank?
    </div>
    <button
        type="submit"
        className='btn btn-light'
        onClick={handleLogout} >
            Log Me Out
        </button>
    </>
   );
}