# Voice (Pipecat STT/TTS)

This folder is a scaffold for integrating **Pipecat** for speech-to-text (STT) and text-to-speech (TTS) with the Weave Hacks app.

**API keys:** Pipecat itself does not use an API key; it’s an open-source framework. The **services** you use inside a Pipecat pipeline do require keys: STT (e.g. Whisper → `OPENAI_API_KEY`), TTS (e.g. OpenAI TTS, Cartesia, ElevenLabs), and transports (e.g. Daily → `DAILY_API_KEY`). See `voice/.env.example` for typical variables.

## Intended flow

1. **Voice in**: User speaks → Pipecat STT → text → send text to the main app (e.g. as the chat message). The existing workflow (research → map) runs with that text.
2. **Voice out** (optional): After the workflow returns, assistant text → Pipecat TTS → audio → play to user.

## Options

- **Browser-only**: Use the Web Speech API (`SpeechRecognition` / `speechSynthesis`) in the client for STT/TTS without a separate service. No Pipecat.
- **Pipecat service**: Run a Pipecat pipeline (e.g. with WebRTC or Daily transport) that:
  - Accepts audio from the client (WebSocket/WebRTC).
  - Runs STT (e.g. Whisper), sends transcript to your backend or client.
  - For TTS: receives response text, runs TTS, streams audio back.

## Pipecat setup

1. **Install** (Python 3.10+):

   ```bash
   cd voice
   pip install -r requirements.txt
   ```

2. **Configure**: Copy `voice/.env.example` to `voice/.env` and set the keys for the services you use (e.g. `OPENAI_API_KEY` for Whisper STT, transport keys if you use Daily/Twilio).

3. **Run an example**: Use the [Pipecat examples](https://github.com/pipecat-ai/pipecat/tree/main/examples), e.g.:
   - [13-whisper-transcription.py](https://github.com/pipecat-ai/pipecat/blob/main/examples/foundational/13-whisper-transcription.py) – STT with Whisper.
   - Run with a transport (Daily, Twilio, or WebRTC) so the client can send audio and receive transcript (or TTS audio).

4. **Wire to this app**: From the Pipecat pipeline, on final transcript call your backend (e.g. the same workflow the chat uses) or post the text to the frontend so it can run the existing workflow. For TTS, send the assistant reply text into the Pipecat pipeline and stream the resulting audio to the client.

## References

- [Pipecat docs](https://docs.pipecat.ai/) – overview, pipeline, transports.
- [Speech to Text](https://docs.pipecat.ai/guides/learn/speech-to-text), [Text to Speech](https://docs.pipecat.ai/guides/learn/text-to-speech).
- [Pipecat examples](https://github.com/pipecat-ai/pipecat/tree/main/examples).
