import CampingExplain from '/components/CampingPlace/CampingExplain.js';
import CampingIntro from '/components/CampingPlace/CampingIntro.js';
import CampingMap from '/components/CampingPlace/CampingMap.js';
import CampingReview from '/components/CampingPlace/CampingReview.js';
import CampingUse from '/components/CampingPlace/CampingUse.js';

function campingplace() {
  return (
    <div>
      <CampingExplain />
      {/* <CampingIntro /> */}
      {/* <CampingMap /> */}
      {/* <CampingReview /> */}
      <CampingUse />
    </div>
  );
}

export default campingplace;
