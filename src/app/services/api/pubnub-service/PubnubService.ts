import Pubnub from 'pubnub';
import { RxjsService } from '../rxjs-service/RxjsService';

export abstract class PubnubService<T> extends RxjsService<T> {
  private readonly _pubnub: Pubnub;

  constructor() {
    super();
    this._pubnub = new Pubnub({
      subscribeKey: 'sub-c-853c8ce2-095a-11ec-8f04-0664d1b72b66',
    });
  }

  protected get pubnub(): Pubnub {
    return this._pubnub;
  }

  abstract subscribe(channel: string): void;

  abstract unsubscribe(channel: string): void;
}
