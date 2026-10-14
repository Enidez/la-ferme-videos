import cv2, numpy as np, os
M = os.path.join(os.path.dirname(__file__), 'models')
net = cv2.dnn.readNetFromCaffe(os.path.join(M, 'deploy.prototxt'), os.path.join(M, 'res10.caffemodel'))

def _detect(img, conf=0.32):
    h, w = img.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(img, (300, 300)), 1.0, (300, 300), (104, 177, 123))
    net.setInput(blob); d = net.forward()
    out = []
    for i in range(d.shape[2]):
        c = d[0, 0, i, 2]
        if c < conf: continue
        x0, y0, x1, y1 = (d[0, 0, i, 3:7] * [w, h, w, h]).astype(int)
        if x1 - x0 < 3 or y1 - y0 < 3 or (x1 - x0) > w * 0.9: continue
        out.append([x0, y0, x1, y1])
    return out

def detect(img):
    """full frame + overlapping tiles (catches small crowd faces)"""
    h, w = img.shape[:2]
    boxes = _detect(img, 0.4)
    for ty in range(4):
        for tx in range(2):
            th, tw_ = h // 3, w // 2 + w // 6
            y0 = int(ty * (h - th) / 3); x0 = int(tx * (w - tw_))
            tile = img[y0:y0 + th, x0:x0 + tw_]
            big = cv2.resize(tile, None, fx=2, fy=2)
            for b in _detect(big, 0.32):
                boxes.append([x0 + b[0] // 2, y0 + b[1] // 2, x0 + b[2] // 2, y0 + b[3] // 2])
    return boxes

def blur_boxes(img, boxes, pad=0.45):
    h, w = img.shape[:2]
    for x0, y0, x1, y1 in boxes:
        bw, bh = x1 - x0, y1 - y0
        x0 = max(0, int(x0 - bw * pad)); x1 = min(w, int(x1 + bw * pad))
        y0 = max(0, int(y0 - bh * pad)); y1 = min(h, int(y1 + bh * pad * 1.2))
        if x1 <= x0 or y1 <= y0: continue
        roi = img[y0:y1, x0:x1]
        small = cv2.resize(roi, (max(1, (x1 - x0) // 10), max(1, (y1 - y0) // 10)), interpolation=cv2.INTER_LINEAR)
        img[y0:y1, x0:x1] = cv2.GaussianBlur(cv2.resize(small, (x1 - x0, y1 - y0), interpolation=cv2.INTER_NEAREST), (0, 0), 3)
    return img
