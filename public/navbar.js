function NavBar(props){
  const ctx = React.useContext(UserContext); 
  let user = ctx.user;
  const [show, setShow] = React.useState(true);
  // const [status, setStatus] = React.useState('');
  // const [name, setName] = React.useState('');

 

  function handleLogout() {
    firebase.auth().signOut()
        .then(() => {
            console.log('User signed out of firebase');
            setShow(false);
            alert('User is logged out.');
            window.location.reload(false);
            user.email = null;
            user.password = null;
            user.balance = null;
            user.name = null;
          console.log(user);
        })
        .catch(function(error){
            console.log(error)
        })
   }

  // function handleUserLoggedIn() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   // https://firebase.google.com/docs/reference/js/firebase.User
  //   const uid = user.uid;
  //   setName(user.name)
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });
  //     }


  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
       
          <li className="nav-item">
              <a  href='/' className="nav-link" 
              aria-current="page"
              > Home </a>
              <span>Return Home</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            <span>Create a Bank Account</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
            <span>Account Login</span>
          </li>
          
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
            <span>Make a Deposit</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
            <span>Make a Withdrawal</span>
          </li>
          <li className="nav-item">
            <a className="nav-link"   href="#/balance/">Balance</a>
            <span>View Balance</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
            <span>View All Data</span>
          </li>       
          <li className="nav-item">
            <a className="nav-link" href="#/login/" onClick={handleLogout}>Logout</a>
            <span>Log Out</span>
          </li>       
        </ul>
        </div>
        <span id="activeuser" className="navbar-text">
       
      </span>
     
    </nav>
    </>
  );
}