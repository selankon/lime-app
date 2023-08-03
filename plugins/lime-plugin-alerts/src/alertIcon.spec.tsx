import "@testing-library/jest-dom/extend-expect";

import { getPath } from "plugins/lime-plugin-metrics/src/metricsApi";
import {
    getInternetStatus,
    getNodeStatus,
} from "plugins/lime-plugin-rx/src/rxApi";

jest.mock("plugins/lime-plugin-rx/src/rxApi");
jest.mock("plugins/lime-plugin-metrics/src/metricsApi.js");
const mockedNodeStatus = jest.mocked(getNodeStatus);
const mockedInternetStatus = jest.mocked(getInternetStatus);
const mockedPath = jest.mocked(getPath);

// https://github.com/selankon/lime-app/blob/f/implement_new_landing/plugins/lime-plugin-rx/src/sections/internetPath.spec.tsx
describe("align page", () => {
    beforeEach(() => {});

    it.skip("check bell is not shown if no alerts", async () => {});
    it.skip("check bell has the badge if the alerts are never read", async () => {});
    it.skip("check a bell is shown when notifications pending", async () => {});
    it.skip("check that badge appear if new alerts appear", async () => {});
    it.skip("check badge is not shown if less second call has less alerts", async () => {});
    it.skip("alert bell disappear when no more alerts", async () => {});
    it.skip("", async () => {});
});
