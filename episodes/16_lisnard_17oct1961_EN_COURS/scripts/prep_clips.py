# Extrait les images des extraits cités (30 i/s), en VRAIE vidéo (jamais d'image figée sur une voix, règle d'Enidez),
# et floute les particuliers : plans « personnalité » -> tout sauf le plus grand visage ; plans « particulier » -> tous les visages
# + zones fixes (visages ratés par le détecteur). Extraits d'émission télé : aucun flou (NOFLOU). Boîtes reportées d'une image à l'autre si rien n'est détecté.
import cv2,os,sys,subprocess,tempfile,shutil
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'../../../tools'));import faces
E=os.path.join(os.path.dirname(__file__),'..')
def frames(src,t0,t1,crop=None,W=720):
    d=tempfile.mkdtemp();vf=(f'crop={crop},' if crop else '')+f'scale={W}:-2,fps=30'
    subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-to',str(t1),'-i',src,'-vf',vf,'-q:v','2',d+'/%04d.jpg'],check=True)
    return [os.path.join(d,f) for f in sorted(os.listdir(d))]
def area(b):return (b[2]-b[0])*(b[3]-b[1])
def run(name,src,t0,t1,keep=(),boxes=(),crop=None,W=720,cut=None,nob=()):
    out=os.path.join(E,'clips',name);shutil.rmtree(out,ignore_errors=True);os.makedirs(out)
    fs=frames(src,t0,t1,crop,W);last=[]
    for i,f in enumerate(fs):
        img=cv2.imread(f);h,w=img.shape[:2];t=t0+i/30;bx=faces.detect(img) or last;last=bx
        if any(a<=t<b for a,b in keep) and bx:
            big=max(bx,key=area);bx=[b for b in bx if b is not big and not (abs((b[0]+b[2])/2-(big[0]+big[2])/2)<(big[2]-big[0])*.6 and abs((b[1]+b[3])/2-(big[1]+big[3])/2)<(big[3]-big[1])*.6)]
        fixed=[[int(x0*w),int(y0*h),int(x1*w),int(y1*h)] for a,b,x0,y0,x1,y1 in boxes if a<=t<b]
        if NOFLOU or any(a<=t<b for a,b in nob):bx=[];fixed=[]   # émission télé : on ne floute rien (Enidez, 20/10)
        img=faces.blur_boxes(img,bx)
        if fixed:img=faces.blur_boxes(img,fixed,pad=0)
        if cut:img=img[0:cut]
        cv2.imwrite(os.path.join(out,'%04d.jpg'%(i+1)),img,[cv2.IMWRITE_JPEG_QUALITY,88])
    print(name,len(fs),'images')
Q=os.path.join(E,'source/quotidien_lisnard_LCI_19oct.mp4');P=os.path.join(E,'source/x/pujadas_extrait_0-80s.mp4')
MAN=(4.9,8.45,.42,0,.98,.24)          # homme au 2e plan derrière l'étudiante (gros plan)
MAN2=(11.0,13.4,.42,0,.98,.24)
NOFLOU=True   # extraits d'émission télé : aucun flou
job=sys.argv[1]
if job=='hook':run('hook',Q,3.3,8.8,keep=[(8.45,9)],boxes=[MAN],nob=[(4.9,8.45)])                      # question -> « Non mais je m'en fous, madame »
if job=='q':run('q',Q,8.8,14.2,keep=[(8.45,11.0),(13.4,14.3)],boxes=[MAN2],cut=680,nob=[(11.0,13.4)])   # suite : rien à foutre / cirer / pas né
if job=='p1':run('p1',P,44.3,48.4,keep=[(44.3,47.6)],crop='1100:1080:350:0',cut=590,nob=[(47.5,48.5)])   # Pujadas à l'image, voix de Lisnard hors champ
if job=='p2':run('p2',P,67.6,69.95,keep=[(68.0,70.1)],crop='1100:1080:60:0',cut=590,nob=[(67.6,68.0)])
