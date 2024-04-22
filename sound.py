import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv

freq = 44100

duration = 15

print("Recording...")

recording = sd.rec(int(duration * freq), 
				samplerate=freq, channels=2)

sd.wait()
print("Recording finished...")

write("recording0.wav", freq, recording)
wv.write("audio/recording1.wav", recording, freq, sampwidth=2)
