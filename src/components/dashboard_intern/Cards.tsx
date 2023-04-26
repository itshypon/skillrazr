import React from 'react';
import './css/Cards.css';
import Card from './Card';
import {cardsData} from './Data';

function Cards(){
    return(
        <div className="Cards">
            {cardsData.map((card, id)=>{
                return(
                    <div className="parentContainer">
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            />
                    </div>
                )
            })}
        </div>
    )
}

export default Cards;