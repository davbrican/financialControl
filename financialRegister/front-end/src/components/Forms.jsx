import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from '../contexts/ContextProvider';
import "../style/Forms.css";
import "../style/Home.css";

const Forms = (props) => {

    const [loading, setLoading] = useState(true);
    const {categories, setCategories} = useStateContext();
    const [categoryExists, setCategoryExists] = useState(false);
    const [categoriesContains, setCategoriesContains] = useState([]);
    const [isCorrectAmount, setIsCorrectAmount] = useState(false);
    const [categoryFormFilled, setCategoryFormFilled] = useState(false);

    const [fechaVisible, setFechaVisible] = useState("none");

    /* eslint-disable */
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("http://localhost:5000/categories");
            setCategories(res.data);
            setLoading(false);
        };
        fetchCategories();
    }, []);
    /* eslint-enable */

    const checkCategory = (entry) => {
        setCategoryExists(false);
        const category = entry;
        const categoryExists = categories.some((cat) => cat.category === category);
        setCategoriesContains(categories.filter((cat) => cat.category.toLowerCase().includes(category.toLowerCase()) && category !== ""));
        setCategoryExists(categoryExists);
    }

    const checkAmount = (entry) => {
        setIsCorrectAmount(true);
        const amount = entry;
        if (amount < 0 || amount === "" || amount === "0" || amount === "0.") {
            setIsCorrectAmount(false);
        }
    }

    function validateForm() {
        const description = document.getElementById("concept").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;
        const category = document.getElementById("categories").value;
        if (description === "" || amount === "" || date === "" || category === "") {
            alert("Rellena todos los campos");
        } else {
            const newBill = {
                description: description,
                amount: amount,
                date: date,
                category: category
            }
            axios.post("http://localhost:5000/insertBill", newBill);
            alert("Gasto añadido");
            document.getElementById("concept").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("date").value = "";
            document.getElementById("categories").value = "";
        }
    }

    function validateFormCategory() {
        const category = document.getElementById("categoryForm").value.toLowerCase();
        if (category === "") {
            alert("Rellena todos los campos");
        } else {
            const newCategory = {
                category: category.charAt(0).toUpperCase() + category.slice(1)
            }
            axios.post("http://localhost:5000/insertCategory", newCategory);
            alert("Categoría añadida");
            document.getElementById("categoryForm").value = "";
        }
    }

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
            <div className={props.clase}>
                <h1 style={{color: "orange"}}>Introducir datos</h1>
                <div className="form-line form-left">
                    <div className="subtitle">Introduce tu gasto</div>
                    <div className="input-container ic1">
                        <input id="concept" className="input" type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label for="concept" className="placeholder">Concepto</label>
                    </div>
                    <div className="input-container ic2">
                        <input id="amount" className="input" type="number" placeholder=" " onChange={(e) => checkAmount(e.target.value)}/>
                        <div className="cut"></div>
                        <label for="amount" className="placeholder">Cantidad</label>
                        {isCorrectAmount ? (
                            <div></div>
                        ) : (
                            <div className="error">
                                <p style={{color: 'red', marginTop: 1, marginLeft: 2}}>Introduce un valor numérico correcto</p>
                            </div>
                        )}
                    </div>
                    <div className="input-container ic2">
                        <input id="date" className="input" type="date" placeholder=" " onFocus={() => {setFechaVisible("block")}} onBlur={() => {setFechaVisible("none")}} />
                        <div className="cut cut-short" style={{display: fechaVisible}}></div>
                        <label for="date" className="placeholder" style={{display: fechaVisible}}>Fecha</label>
                    </div>
                    <div className="input-container ic2">
                        <input id="categories" className="input" type="text" placeholder=" " onChange={(e) => checkCategory(e.target.value)}/>
                        <div className="cut"></div>
                        <label for="concept" className="placeholder">Categoría</label>
                        {(categoryExists && isCorrectAmount) ? (
                            <div>
                                <button type="text" className="submit" onClick={() => {validateForm()}}>submit</button>
                            </div>
                        ) : (!categoryExists) ? (
                            <div className="error">
                                <div>
                                    {categoriesContains.map((cat) => {
                                        return <button className="suggestion-button" onClick={() => {document.getElementById("categories").value = cat.category; checkCategory(cat.category)}}>{cat.category}</button>
                                    })
                                    }
                                </div>
                                <p style={{color: 'red', marginTop: 1, marginLeft: 2}}>Escribe una categoría válida</p>
                            </div>
                            )
                            : ( <div> </div> )
                        }
                    </div>
                </div>
                <div className="form-line form-right">
                    <div className="subtitle">Crea una categoria</div>
                    <div className="input-container ic1">
                        <input id="categoryForm" className="input" type="text" placeholder=" " onChange={(e) => {setCategoryFormFilled(e.target.value !== "")}}/>
                        <div className="cut"></div>
                        <label for="categoryForm" className="placeholder">Categoria</label>
                    </div>
                    {
                        !categoryFormFilled ? (
                            <div></div>
                        ) : (
                        <div>
                            <button type="text" className="submit" onClick={() => {validateFormCategory()}}>submit</button>
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
    )
}

export default Forms;