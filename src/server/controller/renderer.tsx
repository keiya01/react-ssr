import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { Provider } from "react-redux";
import { ChunkExtractor } from "@loadable/server";
import Helmet from "react-helmet";
import { ServerStyleSheet } from "styled-components";
import { setStore } from "../../client/redux/store";
import Router from "../../client/components/Router";
import renderStaticHTML from "../renderStaticHTML";

const statsFile =
  process.env.NODE_ENV === "production"
    ? "../../../../client/loadable-stats.json"
    : "../../../../dist/client/loadable-stats.json";

export const handleRender = (req: Request, res: Response) => {
  const { store } = setStore();

  const context = {};

  const App: React.FC = () => (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <div id="root">
          <Router />
        </div>
      </StaticRouter>
    </Provider>
  );

  const extractor = new ChunkExtractor({ statsFile });
  const tree = extractor.collectChunks(<App />);

  const body = renderToString(tree);
  const helmetContent = Helmet.renderStatic();
  const helmetHead = {
    meta: helmetContent.meta.toString(),
    title: helmetContent.title.toString()
  };
  const styles = new ServerStyleSheet().getStyleTags();
  const nonce = res.locals.nonce;
  const scripts = extractor.getScriptTags({ nonce });
  const preloadedState = JSON.stringify(store.getState());

  res.send(
    renderStaticHTML({
      body,
      meta: helmetHead.meta,
      title: helmetHead.title,
      styles,
      scripts,
      nonce,
      preloadedState
    })
  );
};
