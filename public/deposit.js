function Deposit(props) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus]  = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
    let user = ctx.user;

    // React.useEffect(() => {
    //     fetch(`/account/findOne/${ctx.email}`)
    //       .then((response) => response.text())
    //       .then((text) => {
    //         try {
    //           const data = JSON.parse(text);
    //           setBalance(data.balance);
    //           console.log("JSON:", data);
    //         } catch (err) {
    //           console.log("err:", text);
    //         }
    //       });
    //   })
  
    return (
        <Card
        bgcolor='success'
        header='Deposit'
        status={status}
        body={show ? 
            (<>
            <DepositForm 
                user={props.user}
                setShow={setShow}
                setStatus={setStatus}
                setAmount={setAmount} 
                />
                
                </> ) : (
            <> <DepositMsg 
                setShow={setShow}
                setStatus={setStatus} />
            </>)}
            />
    )
}

function DepositMsg(props) {
  
    return (<>
    <h5>Deposit Completed</h5>
    {/* <h6>Current Balance: ${balance}</h6> */}
    <button 
        type='submit'
        className='btn btn-light'
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          <h6>  Make Another Deposit</h6>
        </button>
    
    </>);
}

function DepositForm(props) {
    const [amount, setAmount] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [balance, setBalance] = React.useState('');
    
   
    
    function handle() {
        fetch(`/account/update/${email}/${amount}`)
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    // props.setStatus(JSON.stringify(data.amount));
                    props.setShow(false);
                    console.log('where is this JSON:', data);
                    setBalance(data.balance);
                } catch(err) {
                    props.setStatus('Deposit failed')
                    console.log('err:', text);
                }
                
            })
        
        // console.log('this is the amount entered:', amount);
        console.log('trying to get user balance:', balance);
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
        onClick={handle}>
            Deposit
    </button>
    </>
)
}
