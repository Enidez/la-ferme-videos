import cv2,numpy as np,sys,os
sys.path.insert(0,os.path.dirname(__file__))
import faces
src,dst,keep=sys.argv[1],sys.argv[2],sys.argv[3]=='1'
img=cv2.imread(src);h,w=img.shape[:2];s=1100/max(h,w);img=cv2.resize(img,(int(w*s),int(h*s)),interpolation=cv2.INTER_AREA)
img=faces.blur_boxes(img,faces.detect(img))
g=cv2.cvtColor(cv2.cvtColor(img,cv2.COLOR_BGR2GRAY),cv2.COLOR_GRAY2BGR)
g=cv2.convertScaleAbs(g,alpha=1.15,beta=-12)
if keep:
    hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
    m=((hsv[...,0]>=18)&(hsv[...,0]<=42)&(hsv[...,1]>90)&(hsv[...,2]>90)).astype(np.float32)
    m=cv2.GaussianBlur(m,(0,0),2)[...,None]
    g=(g*(1-m)+img*m).astype(np.uint8)
cv2.imwrite(dst,g,[cv2.IMWRITE_JPEG_QUALITY,90]);print(dst,g.shape)
