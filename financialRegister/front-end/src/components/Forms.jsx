import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from '../contexts/ContextProvider';

const Forms = () => {

    /*
    const [loading, setLoading] = useState(true);
    const [setCategories] = useStateContext();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("http://localhost:5000/categories");
            setCategories(res.data);
            setLoading(false);
        };
        fetchCategories();
    }, []);
    */

    return (
        <div>
            <h1 style={{paddingLeft: 20, color: "orange"}}>Introducir datos</h1>
            <div>
                <form>
                    <label>
                        Concepto:
                        <input type="text" name="concept" />
                    </label>
                    <label>
                        Cantidad:
                        <input type="text" name="amount" />
                    </label>
                    <label>
                        Fecha:
                        <input type="text" name="date" />
                    </label>
                    <label>
                        Categoría:
                        <select>
                            <option value="comida">Comida</option>
                            <option value="transporte">Transporte</option>
                            <option value="ropa">Ropa</option>
                            <option value="hogar">Hogar</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Forms;