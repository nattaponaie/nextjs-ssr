import style from './home.scss';

const HomePage = () => {
  return (
    <h1 className={style.homePanel}>
      Hello World
    </h1>
  );
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default HomePage;
