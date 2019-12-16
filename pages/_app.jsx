import App, { Container } from 'next/app';

import Layout from '/components/Layout/Layout';

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
        <Layout {...pageProps}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </div>
    );
  }
}

export default MyApp;
