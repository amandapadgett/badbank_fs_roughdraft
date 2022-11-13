function NavBar(){
  
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
            <a className="nav-link" href="#/Logout/">Logout</a>
            <span>Log Out</span>
          </li>       
             
        </ul>
        </div>
     
    </nav>
    </>
  );
}