import First from '/components/MainPage/First.js';
import Second from '/components/MainPage/Second.js';
import Third from '/components/MainPage/Third.js';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// console.log(firebase);
// console.log(authService.currentUser);

function Home() {
  return (
    <>
        <div>
          <First />
          <Second />
          <Third />
        </div>
    </>
  );
}

export default Home;
