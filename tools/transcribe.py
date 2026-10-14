"""Découpe la voix en phrases avec leurs timings (sherpa-onnx whisper-small).
Usage : python tools/transcribe.py vo.wav  -> affiche (début, fin, "texte") ; recopier ensuite le texte exact du script dans <projet>/segs.js"""
import sherpa_onnx,wave,numpy as np,sys,os,subprocess,tempfile
d=os.path.join(os.path.dirname(__file__),'..','models','sherpa-onnx-whisper-small')
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=f'{d}/small-encoder.int8.onnx',decoder=f'{d}/small-decoder.int8.onnx',tokens=f'{d}/small-tokens.txt',language='fr',task='transcribe',num_threads=8)
tmp=tempfile.mktemp(suffix='.wav');subprocess.run(['ffmpeg','-v','error','-y','-i',sys.argv[1],'-ac','1','-ar','16000',tmp],check=True)
w=wave.open(tmp);sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
e=np.array([np.sqrt(np.mean(x[i:i+160]**2)) for i in range(0,len(x)-160,160)]);thr=max(0.008,np.percentile(e,25)*1.6)
segs=[];start=None;last=None
for i,v in enumerate(e>thr):
    if v:
        if start is None:start=i
        last=i
    elif start is not None and i-last>18:segs.append((start/100,(last+1)/100));start=None
if start is not None:segs.append((start/100,(last+1)/100))
for a,b in segs:
    if b-a<.12:continue
    s=rec.create_stream();s.accept_waveform(sr,x[int(max(0,a-.08)*sr):int((b+.1)*sr)]);rec.decode_stream(s);print(f'({a:.2f},{b:.2f},"{s.result.text.strip()}"),')
