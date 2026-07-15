import { WebWorkerMLCEngine } from "@mlc-ai/web-llm/lib/worker";

const engine = new WebWorkerMLCEngine();

self.onmessage = (event) => {
  engine.onmessage(event);
};
