import React, { useState, useEffect } from "react";
import Shop from "../Komponensek/Oldalak/shop";

export default function GetAllProduct()
{
    const [foodData, setFoodData] = useState([]);
    const url = `https://localhost:7208/foods`;

    useEffect(() =>
    {
        (async () =>
        {
            try
            {
                const request = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const response = await request.json();
                setFoodData(response.obj);

                if (!request.ok)
                {
                    console.log("Sikertelen betöltés!");
                }
            } catch (error)
            {
                console.error("Hiba történt a betöltés során:", error);
            }
        })();
    }, []);

    const foodElements = foodData.map(food =>
    {


        return (food)


    })

    return { foodElements }
}
