import React, { useEffect } from "react";
import { useStateContext } from '../contexts/ContextProvider'; 
import "../style/Graficas.css";
import "../style/Home.css";

const Graficas = (props) => {


    const { categories, billsByCategory } = useStateContext();
    const [data, setData] = React.useState([]);
    const [backgroundText, setBackgroundText] = React.useState("");
    
    useEffect(() => {
        let totalBillAmount = 0;
        let dataDict = {};

        Object.keys(billsByCategory).forEach((category) => {
            totalBillAmount += billsByCategory[category];
        });


        categories.forEach((category) => {
            let color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            let datas = {amount: (Object.keys(billsByCategory).includes(category.category)) ? Math.round((billsByCategory[category.category]/totalBillAmount)*10000)/100 : 0, color: color};
            dataDict[category.category] = datas;
        });

        setData(dataDict);

        let backgroundText = "conic-gradient(";
        let marker = 0;
        Object.keys(dataDict).forEach((category) => {
            if (dataDict[category].amount !== 0) backgroundText += `${dataDict[category].color} ${marker}% ${marker + dataDict[category].amount}%, `;
            marker += dataDict[category].amount;
        });
        backgroundText = backgroundText.slice(0, -2);
        backgroundText += ")";
        setBackgroundText(backgroundText);

    }, [billsByCategory, categories]);

    return (
        <div className={props.clase}>
            <h1 style={{color: "orange"}}>Gráficas</h1>
            
            <div id="my-pie-chart-container" style={{marginLeft: 20}}>
                <div id="my-pie-chart" style={{background: backgroundText}}></div>
                <div id="legenda">
                    {Object.keys(data).map((category) => {
                        return (
                            <div className="entry">
                                <div id="color-brown" className="entry-color" style={{background: data[category].color}}></div>
                                <div className="entry-text">
                                    <div className="category-legend-text">{category} → </div> 
                                    <div className="category-legend-text">{data[category].amount}%</div>    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
    
}

export default Graficas;
