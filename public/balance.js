function Balance(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');
  // const [balance, setBalance] = React.useState('');

  const ctx = React.useContext(UserContext);
  let user = ctx.user;


  return (
    <Card
      bgcolor='info'
      header='Balance'
      status={status}
      body={
        show ? (
          <>
            <BalanceForm
              user={props.user}
              setShow={setShow}
              setStatus={setStatus}
              // setBalance={setBalance}
            />
          </>
        ) : (
          <>
           
            <BalanceMsg 
              setShow={setShow}
              setStatus={setStatus} /> 
           
          </>
        )
      }
    />
  );
}
 

function BalanceMsg(props) {
  const ctx = React.useContext(UserContext);
  let user = ctx.user;

  return (
    <>
      <h5>{user.name}</h5>

      <h6>Your Current Balance: ${user.balance}</h6>
      {/* <button
        type="submit"
        className='btn btn-light'
        // onClick={clearForm}
      ><a href="#/balance/">
        Check Another Account Balance</a>
      </button> <br /> */}
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  

  function handle() {
    let user = ctx.user;
    
    console.log('this is the user top balance:', user.balance);
    ctx.user.email = user.email;

    fetch(`/account/find/${user.email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.balance));
          props.setShow(false);
          // setBalance(user.balance);
          console.log('this is the bottom user:', user);
        } catch (err) {
          setStatus('');
          console.log('the freaking err: ', text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button 
        type='submit' 
        className='btn btn-light' 
        onClick={handle}>
        Check Balance
      </button> <br />
    </>
  );
}
