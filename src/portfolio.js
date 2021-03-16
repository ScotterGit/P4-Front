import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const [currentWallet, setCurrentWallet] = useState();
    const [currentPortfolio, setCurrentPortfolio] = useState();

    //*************Here is the hook for - maybe this isn't needed since you are declaring sellStock below  */
    // const [sellStock, setSellStock] = useState();
    // to:
    const [sellQuantity, setSellQuantity] = useState(0); 

    //************************************ */
//*********************setuinputText is from search.js*****************************/    
// to:
    // const [inputText, setInputText] = useState('');
//*******************************************************************************/

    const fetchWallet = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setCurrentWallet(json)
    };
// I had added this to go with the above fetchWallet, but it is not needed*************************
    // useEffect(() => {
    //     console.log('runs once on load')
    //     fetchWallet()
    // }, [])
// *******************************************************
    const fetchPortfolio = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio`);
        let json = await res.json();
        console.log('this is the portfolio json', json)
        setCurrentPortfolio(json);
    };

    useEffect(() => {
        console.log('runs once on load')
        fetchWallet()
        fetchPortfolio()
    }, [])

    //***************************copied from SEARCH.JS for the buyStock function**********************************/

    // to:
    // const onInputChange = async (ev) => {
    //     console.log(ev.currentTarget.value)
    //     setInputText(ev.currentTarget.value);
    // };

    //*************Updated my code to code from class:**********/
    const sellStock = async (id) => {
        console.log('selling stock now', id) 
        await fetch(`http://localhost:3000/api/v1/portfolio/${id}`,{method: 'DELETE'})
        alert('Success')
        window.location.reload();
    };

    //     console.log(currentWallet)
    //     // if(sellQuantity > {item.quantity}){
    //     //     alert('You do not have that much to sell')
    //     // }
    //     let cashBack = buyQuantity * currentStock.data.price
    // }

    // const onSellChange = async (ev) => {
    //     setSellQuantity(ev.currentTarget.value);

    return (
        <div className={'border border-blue-400 p-5'}>

            <h1 className={'text-xl font-bold text-gray-50'}>Portfolio</h1>
            {currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border border-blue-400 text-gray-50'}>Stock</th>
                    <th className={'border border-blue-400 text-gray-50'}>Quantity</th>
                    <th className={'border border-blue-400 text-gray-50'}>Value</th>
                </thead>
                <tbody>
                    {currentPortfolio.map((item, idx) => {
                        return <tr key={idx}>
                        <td className={'border border-blue-400 text-center text-gray-50'}>{item.symbol}</td>
                        <td className={'border border-blue-400 text-center text-gray-50'}>{item.quantity}</td>
                        <td className={'border border-blue-400 text-center text-gray-50'}>{item.price} &nbsp;&nbsp;


                        &nbsp;&nbsp;
                        <span className={'bg-red-600 cursor-pointer rounded text-white text-s pl-2 pr-2'} onClick={() => {
                            sellStock(item.id)
                            }}>Sell</span></td>
{/*****************************************************************************/}
                    </tr>
                    
                    })}

                </tbody>
            </table>}

            {!currentPortfolio && <h1>Loading...</h1>}

            <br/>
            <br/>
            <br/>

            {currentWallet && <h1 className={'text-xl font-bold text-gray-50'}>Current Wallet Value: ${currentWallet.value}</h1>}

        </div>
    );
}

export default Portfolio;

