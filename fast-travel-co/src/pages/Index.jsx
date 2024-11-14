import { useState } from "react";
import Destinations from "../components/Destinations";
import FooterSection from "../components/Footer";
import InfoSection from "../components/InfoSection";
import SearchSection from "../components/SearchSection";

const Index = () => {
  const [searchCriteria, setSearchCriteria] = useState({});
  
  return (
    <div>
        <SearchSection setSearchCriteria={setSearchCriteria}/>
        <Destinations searchCriteria={searchCriteria}/>
        <InfoSection />
        <FooterSection />
    </div>
  );
};

export default Index;
