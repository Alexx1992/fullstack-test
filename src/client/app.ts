import { EventDataType } from '../types';

interface ITracker {
  track(event: string, ...tags: string[]): void;
}

class Tracker implements ITracker {
  private eventBuffer: EventDataType[] = [];

  constructor() {
    this.checkEventBufferByTimer();

    window.addEventListener('beforeunload', () => {
      if (this.eventBuffer.length) {
        this.sendEventBuffer();
      }
    });
  }

  private checkEventBufferByTimer() {
    setInterval(() => {
      if (this.eventBuffer.length) {
        this.sendEventBuffer();
      }
    }, 1000);
  }

  private checkEventBufferBySize() {
    if (this.eventBuffer.length >= 3) {
      this.sendEventBuffer();
    }
  }

  private sendEventBuffer() {
    const body = JSON.stringify(this.eventBuffer);
    this.eventBuffer = this.eventBuffer.slice(this.eventBuffer.length);

    fetch('http://localhost:8001/track', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '500',
      },
    }).catch(() => {
      this.eventBuffer.push(...JSON.parse(body));
    });
  }

  track(event: string, ...tags: string[]) {
    const eventData: EventDataType = {
      event,
      tags,
      url: location.href,
      title: document.title,
      ts: new Date().toISOString(),
    };

    this.eventBuffer.push(eventData);
    this.checkEventBufferBySize();
  }
}

const tracker = new Tracker();
