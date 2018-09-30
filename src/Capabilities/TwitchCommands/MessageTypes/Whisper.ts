import { Message, MessageParam, MessageParamSpec } from 'ircv3';
import ChatUser from '../../../ChatUser';
import ChatClient from '../../../ChatClient';
import ChatTools from '../../../Toolkit/ChatTools';

/** @private */
export interface WhisperParams {
	target: MessageParam;
	message: MessageParam;
}

/** @private */
export default class Whisper extends Message<WhisperParams> {
	static readonly COMMAND = 'WHISPER';
	static readonly PARAM_SPEC: MessageParamSpec<Whisper> = {
		target: {},
		message: {
			trailing: true,
			optional: true
		}
	};

	get userInfo(): ChatUser {
		return new ChatUser(this._prefix!, this._tags, this._client as ChatClient);
	}

	get emoteOffsets(): Map<string, string[]> {
		if (!this._tags) {
			return new Map;
		}

		return ChatTools.parseEmotes(this._tags.get('emotes'));
	}
}
