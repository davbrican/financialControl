import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Bills.css";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

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
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Gastos por tipos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
        <tr>
            <td>Fecha</td>
            <td>Concepto</td>
            {categories.map((category) => (
                <td>{category.category}</td>
            ))}
            </tr>
            {bills.map((bill) => (
                <tr>
                    <td className="bill date">{bill.date}</td>
                    <td className="bill description">{bill.description}</td>
                    <td className="bill amount">{bill.amount}€</td>
                    <td></td>
                </tr>
            ))}
        </table>
      )}
    </div>
  );
};

export default Bills;
