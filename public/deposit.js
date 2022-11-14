function Deposit(props) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus]  = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
    let user = ctx.user;

    console.log(user.balance);

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
    const ctx = React.useContext(UserContext);
    let user = ctx.user;
   return (
        <>
        <h5>Deposit Completed</h5> <br />
        <h6>Current Balance: {user.balance}</h6>
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
    const [status, setStatus] = React.useState('');
    const ctx = React.useContext(UserContext);
   

    function handleDeposit() {
        // let balance = document.getElementById('balance').value
        let user = ctx.user;
        user.balance = Number(user.balance) + Number(amount);
        
        console.log('this is the amount:', amount);
        console.log('this is the user:', user);
        console.log('this is the user balance:', user.balance);

        fetch(`/account/update/${user.email}/${amount}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus(JSON.stringify(data.amount));
                props.setShow(false);
                console.log('JSON:', data);
              
                
            } catch(err) {
                props.setStatus('Deposit failed')
                console.log('err:', text);
            }
            
        });
      
      }

return (
    <>
    User Email <br/>
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
        id="amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)} /> <br/>

    <button 
        type='submit'
        className="btn btn-light"
        onClick={handleDeposit}>
            Deposit
    </button>
    </>
)
}
