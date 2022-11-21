// # Using npm
// npm install --save @sentry/react @sentry/tracing

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://examplePublicKey@o0.ingest.sentry.io/0", // заменить на сгенерированную ссылку
        integrations: [new BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
    // and
    Sentry.captureMessage("Something went wrong");
}

const logger = {
    init,
    log,
};

export default logger;
