import React from "react";
import BotCard from "./BotCard";


function YourBotArmy({ bots, releaseBot, dischargeBot }) {
  const handleRelease = (botId) => {
    releaseBot(botId);

  };


  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {bots.map((bot) => (
            <div key={bot.id} className="column" >
             <BotCard bot={bot} onRelease={() => handleRelease(bot.id)} dischargeBot={dischargeBot} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;