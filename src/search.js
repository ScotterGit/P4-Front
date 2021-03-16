import React, {useState, useEffect} from 'react';
// import yahooFinance from 'yahoo-finance';
// import yahooStockPrices from 'yahoo-stock-prices'

function Search(props) {
    // yahooFinance.quote({
    //     symbol: 'AAPL',
    //     modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
    // }, function (err, quotes) {
    //     console.log(err)
    //     console.log(quotes)
    // });
    const [inputText, setInputText] = useState('');
    const [currentStock, setCurrentStock] = useState();
    const [ticker, setTicker] = useState();
    const [buyQuantity, setBuyQuantity] = useState(0); 
    const [currentWallet, setCurrentWallet] = useState();


    const fetchWallet = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setCurrentWallet(json)
    };

    useEffect(() => {
        console.log('runs once on load')
        fetchWallet()
    }, [])

    const fetchQuote = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/search/${inputText}`);
        let json = await res.json();
        console.log(json)
        setCurrentStock(json);
        setTicker(inputText);
        setInputText('')
    };

    const onInputChange = async (ev) => {
        console.log(ev.currentTarget.value)
        setInputText(ev.currentTarget.value);
    };

    const buyStock = async () => {
        console.log('buying the stock now')
        console.log(currentWallet)
        if(buyQuantity == 0){
            alert('Buy quantity needs to be greater than 0')
        } 
        
        let cashNeeded = buyQuantity * currentStock.data.price;
        console.log('cashNeeded is', cashNeeded)

        if(cashNeeded > currentWallet.value){
            alert('You dont have enough cash')
        } else {
            let body = {
                symbol: ticker,
                quantity: buyQuantity,
                price: currentStock.data.price,
            }

            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {}

            };

            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";

            console.log(options);



            const res = await fetch(`http://localhost:3000/api/v1/portfolio`, options);
            let json = await res.json();
            console.log(json)

            setBuyQuantity(0)

            // alert('Success')

            window.location.reload();
        }

    };
    const onBuyChange = async (ev) => {
        setBuyQuantity(ev.currentTarget.value);
    };


    return (
        <div className={'border-blue-400 p-5'}>

            <div className="grid grid-cols-2">
                <div className={'border border-blue-400 p-5'}>
                    <input onChange={onInputChange} value={inputText.toUpperCase()} type="text" className={'border w-full p-3 rounded-full border-blue-400'}/>
                </div>
                <div className={'border border-blue-400 p-5'}>
                    <span onClick={fetchQuote} className={'bg-gray-600 cursor-pointer p-2 rounded text-white text-xl pl-5 pr-5'}>Get Quote</span>
                </div>
            </div>

            {ticker && <div className="grid grid-cols-2">
                <div className={'border-blue-400 p-5 text-gray-50'}>
                    {/* {currentStock && <h1 className={'text-2xl'}>{currentStock.data}</h1>} */}
                    <h1 className={'text-2xl'}>{ticker} : {currentStock && <span>{currentStock.data.currency} {currentStock.data.price}</span>}</h1>
                </div>
                <div className={'border-blue-400 p-5'}>

                    <span>
                        <input type="number" onChange={onBuyChange} className={'border-blue-400'} value={buyQuantity}/> &nbsp;&nbsp;
                        <span className={'bg-blue-600 cursor-pointer p-2 rounded text-white text-xl pl-5 pr-5'} onClick={buyStock}>Buy</span>&nbsp;&nbsp;&nbsp;
                    </span>

                </div>
            </div>}

        </div>
    );
}

export default Search;