function Withdraw(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus]  = React.useState('');
  const [amount, setAmount] = React.useState('');

  console.log(amount)
      
  return (
      <Card
      bgcolor='warning'
      header='Withdraw'
      status={status}
      body={show ? 
          (<>
          <WithdrawForm 
              user={props.user}
              setShow={setShow}
              setStatus={setStatus}
              setAmount={setAmount} />
              
              </> ) : 
              <> <WithdrawMsg 
                  setShow={setShow}
                  setStatus={setStatus} />
              </>}
              />
  )
}

function WithdrawMsg(props) {
//   const [balance, setBalance] = React.useState('');

  return (<>
  <h5>Withdrawal Complete</h5>
  <h6>Current Balance: need help here</h6>
  <button 
      type='submit'
      className='btn btn-light'
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
          Make Another Withdrawal
      </button>
  
  </>);
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handle() {
      fetch(`/account/update/${email}/${-amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(JSON.stringify(data.amount));
              props.setShow(false);
              console.log('JSON:', data);
             
          } catch(err) {
              props.setStatus('Withdrawal failed')
              console.log('err:', text);
          }
  });

}

return (
  <>
  User <br/>
  <input 
      type="input"
      className="form-control"
      placeholder="Enter account email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /> 
      <br />


  Amount <br />
  <input
      type='number'
      className='form-control'
      placeholder='Enter Amount'
      value={amount}
     
      onChange={e => setAmount(e.currentTarget.value)} /> <br/>

  <button 
      type='submit'
      className="btn btn-light"
      disabled={amount === '' || amount <= 0 || isNaN(amount)}
      onClick={handle}>
         Withdraw
  </button>
  </>
)
}
