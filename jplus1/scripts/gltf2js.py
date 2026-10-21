# Convertit chaque objet glTF (assets/models/<id>/<id>_1k.gltf + .bin + textures) en un seul fichier assets/models/<id>.js
# (window.MODELS['<id>'] = glTF avec buffers et images en data-URI) : lisible par GLTFLoader.parse() sans fetch de fichier local.
import json,os,base64,mimetypes,glob
os.chdir(os.path.join(os.path.dirname(__file__),'..','assets','models'))
for d in sorted(x for x in os.listdir('.') if os.path.isdir(x)):
    g=glob.glob(f'{d}/*.gltf')[0];base=os.path.dirname(g);j=json.load(open(g))
    uri=lambda p:f"data:{mimetypes.guess_type(p)[0] or 'application/octet-stream'};base64,"+base64.b64encode(open(os.path.join(base,p),'rb').read()).decode()
    for b in j.get('buffers',[]):b['uri']=uri(b['uri'])
    for im in j.get('images',[]):
        if 'uri' in im:im['uri']=uri(im['uri'])
    open(f'{d}.js','w').write(f"(window.MODELS=window.MODELS||{{}})[{json.dumps(d)}]={json.dumps(j,separators=(',',':'))};")
    print(d,round(os.path.getsize(f'{d}.js')/1e6,1),'Mo')
