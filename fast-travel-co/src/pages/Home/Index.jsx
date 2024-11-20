/* eslint-disable react/prop-types */
import Destinations from "../../components/Home/Destinations";
import InfoSection from "../../components/Home/InfoSection";

const Index = ({ searchCriteria }) => {
  return (
    <div>
      <Destinations searchCriteria={searchCriteria} />
      <InfoSection />
    </div>
  );
};

export default Index;