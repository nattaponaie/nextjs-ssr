import App, { Container } from 'next/app';

import Layout from '/components/Layout/Layout';
import { UserContextProvider } from '/contexts/UserContext';
import { appWithTranslation } from '/i18n';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="App">
        <UserContextProvider>
          <Layout {...pageProps}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </Layout>
        </UserContextProvider>
      </div>
    );
  }
}

export default appWithTranslation(MyApp);
