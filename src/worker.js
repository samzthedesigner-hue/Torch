import { WebWorkerLoopService } from "@mlc-ai/web-llm";
const chatLoopService = new WebWorkerLoopService();
self.onmessage = (msg) => {
  chatLoopService.onmessage(msg);
};
