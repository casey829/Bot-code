import React from "react";


const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
 };

 function BotCard({ bot, onClick,  dischargeBot, onRelease }) {
  const handleClick = () => {
    if (bot.enlisted && typeof onRelease === "function") {
      onRelease();        // Trigger onRelease (releaseBot) if the bot is enlisted
    } else if (!bot.enlisted && typeof onClick === "function") {
    onClick();     // Trigger onClick (enlistBot) if the bot is not enlisted

    }

  };


  const handleDischarge = async () => {
    try {
      await dischargeBot(bot.id);

    } catch (error) {
      console.error("Error discharging bot:", error);

    }

  };

  
  return (
    <div className="ui column">
      <div className="ui card" onClick={handleClick} >
        <div className="image">
          <img alt="oh no!" src={bot.avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {bot.name}
            <i className={botTypeClasses[bot.bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{bot.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {bot.health}
          </span>

          <span>
            <i className="icon lightning" />
            {bot.damage}
          </span>
          <span>
            <i className="icon shield" />
            {bot.armor}
          </span>
            <span>
              <div className="ui centre aligned segment basic">
                <button className="ui mini red button" onClick={handleDischarge} >
                x
                </button>
              </div>
            </span>
        
          
        </div>
      </div>
    </div>
  );
}

export default BotCard;