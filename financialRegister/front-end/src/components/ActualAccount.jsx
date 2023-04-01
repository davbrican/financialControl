import React from 'react'
//import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import "../style/ActualAccount.css";

const ActualAccount = () => {

    const { totalAmount, setTotalAmount } = useStateContext();

    setTotalAmount(4300.12);

    let actualAccount = 3500.87;

    let difference = 100*(actualAccount/totalAmount);

    return (
        <div>
            <div className='actualAccount'>
                <div className='amountContainer'>
                    <div className='inicial-bar bar'></div>
                    <h3 className='inicial head'>Saldo Inicial</h3>
                    <p className='inicial text'>{totalAmount}€</p>
                </div>
                <div className='amountContainer'>
                    <div className='final-bar bar' style={{height: difference, marginTop: 110-difference}}></div>
                    <h3 className='final head'>Saldo Final</h3>
                    <p className='final text'>{actualAccount}€</p>
                </div>
            </div>
        </div>
    )
}

export default ActualAccount;