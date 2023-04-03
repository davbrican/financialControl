import React, { useEffect } from "react";
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import "../style/ActualAccount.css";

const ActualAccount = () => {

    const { totalAmount, setTotalAmount, totalBills } = useStateContext();

    useEffect(() => {
        const fetchTotalAmount = async () => {
            const res = await axios.get("http://localhost:5000/monthRegister/04/2023");
            setTotalAmount(res.data[0].initialAmount);
        };
        fetchTotalAmount();
    }, []);


    let actualAccount = totalAmount - totalBills;

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