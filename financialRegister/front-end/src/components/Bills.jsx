import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Bills.css";
import { useStateContext } from '../contexts/ContextProvider';
import parseNumber from "../utils/parseNumber";
import "../style/Home.css";

const Bills = (props) => {
  const [loading, setLoading] = useState(true);
  const { setTotalBills, bills, setBills, categories, setCategories, billsByCategory, setBillsByCategory } = useStateContext();


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
      setLoading(false);
      fetchBills();
    };
    const fetchBills = async () => {
      const res = await axios.get("http://localhost:5000/bills");
      setBills(res.data);
      let dicBillsByCategory = {};
      let totalBillsAccount = 0;
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];        
        if (Object.keys(dicBillsByCategory).includes(element.category)) {
          dicBillsByCategory[element.category] += element.amount;
        } else {
          dicBillsByCategory[element.category] = element.amount;
        }
        totalBillsAccount += element.amount;
      }
      setTotalBills(totalBillsAccount);
      setBillsByCategory(dicBillsByCategory);
      setLoading(false);
    };
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
      <div className={props.clase}>
        <h1 style={{paddingLeft: 20, color: "orange"}}>Gastos por tipos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="bill-table" style={{marginLeft: 20}}>
          <tr className="titles-bill-table">
            <td>Fecha</td>
            <td>Concepto</td>
            {categories.map((category) => (
                <td>{category.category}</td>
            ))}
          </tr>
          <tr className="money-bill-table">
              <td></td>
              <td></td>
              {categories.map((category) => (
                  <td align="right">{parseNumber(billsByCategory[category.category])} €</td>
              ))}
          </tr>
          {bills.map((bill) => (
            <tr>
                <td className="bill date">{bill.date}</td>
                <td className="bill description">{bill.description}</td>
                {bill.amounts.map((amount) => (
                    <td className="bill amount" align="right">{amount}</td>
                ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};


export default Bills;
