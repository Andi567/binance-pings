import { Spot, WebsocketAPI } from "@binance/connector";

const retries = 20;

const pingSpot = async (): Promise<number> => {
  const client = new Spot();
  const delayArr = [];

  for (let i = 0; i < retries; i++) {
    const t0 = performance.now();
    const pingResponse = await client.ping();

    if (pingResponse.status === 200 && i !== 0)
      delayArr.push(performance.now() - t0);
  }

  return delayArr.reduce((a, b) => a + b, 0) / delayArr.length;
};

const pingWs = async () => {
  // WebsocketAPI
  let t0: number;
  const callbacks = {
    open: (client) => {
      console.debug("Connected with Websocket server");
      t0 = performance.now();
      client.ping({ id: 1 });
    },
    close: () => console.debug("Disconnected with Websocket server"),
    message: () => console.log("WebsocketAPI", performance.now() - t0, "ms"),
  };

  const websocketAPIClient = new WebsocketAPI(null, null, { callbacks });
  setTimeout(() => websocketAPIClient.disconnect(), 10000);
};

(async function main() {
  const spotAvgDelayInMs = await pingSpot();
  console.log("Spot", spotAvgDelayInMs, "ms");

  await pingWs();
})();
