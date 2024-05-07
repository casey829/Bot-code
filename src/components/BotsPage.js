import React, { useState, useEffect } from "react";
import axios from "axios"
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [yourBotArmy, setYourBotArmy] = useState([])
  const [allBots, setAllBots] = useState([]);
  const [filters, setFilters] = useState([]);
  
  //Fetch  bots on component mount
  useEffect(() => {
    const fetchAllBots = async () => {
      try {
        const response = await axios.get("http://localhost:8002/bots");
        setAllBots(response.data || []);

      } catch (error) {
        console.error("Error fetching bots:", error)

      }
    };

    fetchAllBots();

  }, []);   

  


  const enlistBot = (bot) => {
    if (!yourBotArmy.find((b) => b.id === bot.id)) {
      setYourBotArmy([...yourBotArmy, bot]);

    }

  };

  const releaseBot = (botId) => {
    const updatedArmy = yourBotArmy.filter((bot) => bot.id !== botId);
    setYourBotArmy(updatedArmy);

  };

  const dischargeBot = async (botId) => {
    try {
      await axios.delete(`http://localhost:8002/bots/${botId}`);
    
      const updatedArmy = yourBotArmy.filter((bot) => bot.id !== botId);
      setYourBotArmy(updatedArmy);

    } catch (error) {
      console.error("Error discharging bot:", error);

    }

  };

  
  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const filteredBots = allBots.filter((bot) => {
    if (filters.length === 0) {
      return true;    
    }
    return filters.includes(bot.bot_class);

  });


  return (
    <div>
      <YourBotArmy bots={yourBotArmy} releaseBot={releaseBot} dischargeBot={dischargeBot} />
      <BotCollection bots={filteredBots} enlistBot={enlistBot} />
      <div>
        <h2>Filter by Class:</h2>
        <label>
          <input
            type="checkbox"
            value="Assault"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Assault
        </label>
        <label>
          <input
            type="checkbox"
            value="Defender"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Defender
        </label>
        <label>
          <input
            type="checkbox"
            value="Support"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Support
        </label>
        <label>
          <input
            type="checkbox"
            value="Medic"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Medic
        </label>
        <label>
          <input
            type="checkbox"
            value="Witch"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Witch
        </label>
        <label>
          <input
            type="checkbox"
            value="Captain"
            onChange={(e) =>
              handleFilterChange(
                e.target.checked
                  ? [...filters, e.target.value]
                  : filters.filter((filter) => filter !== e.target.value)
              )
            }
          />
          Captain
        </label>
        
      </div>

    </div>
  )
}

export default BotsPage;