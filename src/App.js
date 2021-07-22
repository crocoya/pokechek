import MainRouter from './routers/MainRouter';
import FirebaseContext from './services/firebase/Context';

function App() {
  return (
    <div className='app__container'>
      <FirebaseContext>
        <MainRouter />
      </FirebaseContext>
    </div>
  );
}

export default App;
