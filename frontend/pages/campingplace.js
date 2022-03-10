import CampingExplain from '/components/CampingPlace/CampingExplain.js';
import CampingIntro from '/components/CampingPlace/CampingIntro.js';
import CampingMap from '/components/CampingPlace/CampingMap.js';
import CampingReview from '/components/CampingPlace/CampingReview.js';

function campingplace() {
  return (
    <div>
      <CampingExplain />
      {/* <CampingIntro /> */}
      {/* <CampingMap /> */}
      <CampingReview />
    </div>
  );
}

export default campingplace;
