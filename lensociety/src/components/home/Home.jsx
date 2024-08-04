import Main from './Main/Main'
import Collection from './Collections/Collection'
import Book from './Book/Book'
import Join from './Join/Join'

const Home = () => {
    return (
      <>
      <div>
        <div className="white-gradient" />
        <Main />
      </div>
      <Collection />
      <Book />
      <Join />
    </>
  )
}

export default Home;
