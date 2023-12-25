import { WebsocketAPI } from "@binance/connector-typescript";

const API_KEY = "";
const API_SECRET = "";

const callbacks = {
  open: (client: WebsocketAPI) => client.exchangeInfo(),
  close: () => console.debug("Disconnected from WebSocket server"),
  message: (data: string) => console.info(JSON.parse(data)),
};

const websocketAPIClient = new WebsocketAPI(API_KEY, API_SECRET, { callbacks });
setTimeout(() => websocketAPIClient.disconnect(), 20000);
