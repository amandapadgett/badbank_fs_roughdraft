function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
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
              user={user}
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

function BalanceMsg() {
  const ctx = React.useContext(UserContext);
    let user = ctx.user;
  return (
    <>
      <h5>Success!</h5>
      <h6>Current Balance: {user.balance}</h6>
      <button
        type="submit"
        className='btn btn-light'
        onClick={() => {
          setShow(true);
          setStatus('');
        }}
      >
        Check Another Account Balance
      </button> <br />
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  let user = ctx.user;

  function handle() {
    let user = ctx.user;
    console.log('this is the user:', user);
    console.log('this is the user balance:', user.balance);

    fetch(`/account/find/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setStatus(JSON.stringify(data.balance));
          setShow(false);
          // setBalance(user.balance);
          
        } catch (err) {
          setStatus('catch caught something');
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
