import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Bills.css";
import { useStateContext } from '../contexts/ContextProvider';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [billsByCategory, setBillsByCategory] = useState({});
  const { setTotalBills } = useStateContext();

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
  }, []);

  return (
      <div className="bills">
        <h1 style={{paddingLeft: 20, color: "orange"}}>Gastos por tipos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="bill-table">
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
                  <td align="right">{billsByCategory[category.category] || 0} €</td>
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
