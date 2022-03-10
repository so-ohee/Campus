import CampingExplain from '/components/CampingPlace/CampingExplain.js';
import CampingIntro from '/components/CampingPlace/CampingIntro.js';
import CampingMap from '/components/CampingPlace/CampingMap.js';

function campingplace() {
  return (
    <div>
      <CampingExplain />
      {/* <CampingIntro /> */}
      <CampingMap />
    </div>
  );
}

export default campingplace;
