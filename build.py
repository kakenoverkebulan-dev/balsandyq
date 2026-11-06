"""Собирает index.html из src/. Запуск: python3 build.py"""
import json, pathlib
r = pathlib.Path(__file__).parent
head = (r/"src/head.html").read_text(encoding="utf-8").replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
app = (r/"src/app.js").read_text(encoding="utf-8")
photos = json.loads((r/"src/photos.json").read_text(encoding="utf-8"))
style_end = head.index("</style>") + len("</style>")
out = (
 '<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
 '<meta name="description" content="BAL SANDYQ — кондитерлік шеберхана в Астане. Десерты, сэты на 8–20 человек, доставка и корпоративные заказы.">\n'
 '<meta property="og:title" content="BAL SANDYQ — кондитерлік шеберхана">\n'
 '<meta property="og:description" content="Десерты и сэты с доставкой по Астане">\n'
 '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
 + head[:style_end] + "\n</head>\n<body>\n" + head[style_end:]
 + "<script>\nconst PHOTOS = " + json.dumps(photos) + ";\n</script>\n<script>\n" + app + "</script>\n</body>\n</html>\n"
)
(r/"index.html").write_text(out, encoding="utf-8")
print("index.html:", len(out)//1024, "KB,", len(photos), "photos")
