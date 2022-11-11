function Balance(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState('');

  const ctx = React.useContext(UserContext);
  console.log(ctx);
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
              setBalance={setBalance}
            />
          </>
        ) : (
          <>
            {' '}
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
            <h5>Your Balance Is: ${balance}</h5>
          </>
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Recheck Balance
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          setBalance(data.balance);
          console.log('JSON: ', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err: ', text);
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
        value={props.user.email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light' onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
