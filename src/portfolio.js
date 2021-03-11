import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const [currentWallet, setCurrentWallet] = useState();
    const [currentPortfolio, setCurrentPortfolio] = useState();

    //*************Here is the hook for - maybe this isn't needed since you are declaring sellStock below  */
    // const [sellStock, setSellStock] = useState();
    const [sellQuantity, setSellQuantity] = useState(0); 

    //************************************ */
    

    const fetchWallet = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setCurrentWallet(json)
    };

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

    //***************************you copied this code from SEARCH.JS for the buyStock function**********************************/

    const sellStock = async () => {
        console.log('selling stock now') 
    }

    const onSellChange = async (ev) => {
        setSellQuantity(ev.currentTarget.value);

    }

    //***************************below is the buyStock code*******************************************************************/

    // const butStock = async () => {
    //     console.log('buying the stock now')
    //     console.log(currentWallet)
    //     if(buyQuantity == 0){
    //         alert('Buy quantity needs to be greater than 0')
    //     } 
        
    //     let cashNeeded = buyQuantity * currentStock.data.price;
    //     console.log('cashNeeded is', cashNeeded)

    //     if(cashNeeded > currentWallet.value){
    //         alert('You dont have enough cash')
    //     } else {
    //         let body = {
    //             symbol: ticker,
    //             quantity: buyQuantity,
    //             price: currentStock.data.price,
    //         }

    //         let options = {
    //             method: 'POST',
    //             body: JSON.stringify(body),
    //             headers: {}

    //         };

    //         options.headers["Accept"] = "application/json, text/plain, */*";
    //         options.headers["Content-Type"] = "application/json;charset=utf-8";

    //         console.log(options);



    //         const res = await fetch(`http://localhost:3000/api/v1/portfolio`, options);
    //         let json = await res.json();
    //         console.log(json)

    //         setBuyQuantity(0)

    //         alert('Success')
    //     }

    // };

    //********************************end buyStock function******************************************/

    return (
        <div className={'border p-5'}>

            <h1 className={'text-xl font-bold'}>Portfolio</h1>
            {currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Value</th>
                </thead>
                <tbody>
                    {currentPortfolio.map((item, idx) => {
                        return <tr key={idx}>
                        <td className={'border text-center'}>{item.symbol}</td>
                        <td className={'border text-center'}>{item.quantity}</td>
                        <td className={'border text-center'}>{item.price} &nbsp;&nbsp;

                        {/* *********************************Heres what i'm adding******************************************************** */}
                        <input type="number" onChange={onSellChange} className={'border'} value={'sellStock'}/>&nbsp;&nbsp;
                        <span className={'bg-red-600 cursor-pointer rounded text-white text-s pl-2 pr-2'} onClick={sellStock}>Sell</span></td>

                    </tr>
                    
                    })}

                </tbody>
            </table>}

            {!currentPortfolio && <h1>Loading...</h1>}

            <br/>
            <br/>
            <br/>

            {currentWallet && <h1 className={'text-xl font-bold'}>Current Wallet Value: ${currentWallet.value}</h1>}

        </div>
    );
}

export default Portfolio;

