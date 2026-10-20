# Extrait les images des extraits cités (30 i/s), floute les particuliers.
# Plans « Lisnard » : on floute tout sauf le plus grand visage (lui, personnalité publique).
# Plans « étudiante » : on floute tous les visages. Boîtes reportées d'une image à l'autre si rien n'est détecté.
import cv2,numpy as np,os,sys,subprocess,tempfile
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'../../../tools'));import faces
E=os.path.join(os.path.dirname(__file__),'..')
def frames(src,t0,t1,crop=None,W=720):
    d=tempfile.mkdtemp();vf=(f'crop={crop},' if crop else '')+f'scale={W}:-2,fps=30'
    subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-to',str(t1),'-i',src,'-vf',vf,'-q:v','2',d+'/%04d.jpg'],check=True)
    return [os.path.join(d,f) for f in sorted(os.listdir(d))]
def area(b):return (b[2]-b[0])*(b[3]-b[1])
def run(name,src,t0,t1,lis,crop=None,W=720,ref=None):
    out=os.path.join(E,'clips',name);os.makedirs(out,exist_ok=True)
    fs=frames(src,t0,t1,crop,W);last=[];n=0
    for i,f in enumerate(fs):
        img=cv2.imread(f);t=t0+i/30;bx=faces.detect(img)
        if not bx:bx=last
        last=bx
        keep=any(a<=t<b for a,b in lis)
        if keep and bx:
            big=max(bx,key=area);bx=[b for b in bx if b is not big and not (abs((b[0]+b[2])/2-(big[0]+big[2])/2)<(big[2]-big[0])*.6 and abs((b[1]+b[3])/2-(big[1]+big[3])/2)<(big[3]-big[1])*.6)]
        img=faces.blur_boxes(img,bx);cv2.imwrite(os.path.join(out,'%04d.jpg'%(i+1)),img,[cv2.IMWRITE_JPEG_QUALITY,88]);n+=1
    print(name,n,'images')
Q=os.path.join(E,'source/quotidien_lisnard_LCI_19oct.mp4');P=os.path.join(E,'source/x/pujadas_extrait_0-80s.mp4')
job=sys.argv[1]
if job=='q':run('q',Q,7.3,14.2,[(8.45,11.0),(13.4,14.3)])
if job=='p2':run('p2',P,67.6,70.0,[(68.0,70.1)],crop=sys.argv[2])
