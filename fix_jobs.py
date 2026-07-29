import re

with open('jobs.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('navAvatarImg.src = data:image/jpeg;base64,\;', 'navAvatarImg.src = data:image/jpeg;base64,;')

with open('jobs.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax error in jobs.html")
