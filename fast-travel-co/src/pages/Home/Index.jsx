import { useState } from "react";
import Destinations from "../../components/Home/Destinations";
import InfoSection from "../../components/Home/InfoSection";
import SearchSection from "../../components/Home/SearchSection";

const Index = () => {
  const [searchCriteria, setSearchCriteria] = useState({});

  return (
    <div>
      <SearchSection setSearchCriteria={setSearchCriteria} />
      <Destinations searchCriteria={searchCriteria} />
      <InfoSection />
    </div>
  );
};

export default Index;
