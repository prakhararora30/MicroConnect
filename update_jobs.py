import re

with open('jobs.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = '''      onAuthStateChanged(auth, (user) => {
        if (user && user.photoURL && navAvatarImg) {
          navAvatarImg.src = user.photoURL;
        }
      });'''

new_logic = '''      const defaultProfilePhoto = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e0812b'/><path d='M50 28 a 14 14 0 1 0 0.001 0 M32 74 a 18 18 0 0 1 36 0' stroke='%23ffffff' stroke-width='6' fill='none' stroke-linecap='round'/></svg>";

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let currentUserDoc = null;
          try {
            const { getDoc, doc } = await import('./firebase-config.js');
            const collectionsToCheck = ['users', 'students', 'alumni'];
            for (const colName of collectionsToCheck) {
              const snap = await getDoc(doc(db, colName, user.uid));
              if (snap.exists()) {
                currentUserDoc = snap.data();
                break;
              }
            }
          } catch(e) {}
          
          let rawPhoto = null;
          if (currentUserDoc) {
            const photoKeys = ['authorPhotoBase64', 'userPhotoBase64', 'profilePhotoBase64', 'photoBase64', 'photoURL', 'photo_url', 'profilePic', 'profile_pic', 'profileImage', 'profile_image', 'avatar', 'avatarUrl', 'avatar_url', 'photo', 'image', 'userImage', 'user_image', 'userAvatar', 'user_photo'];
            for (const k of photoKeys) {
              if (currentUserDoc[k] && typeof currentUserDoc[k] === 'string' && currentUserDoc[k].trim().length > 0) {
                rawPhoto = currentUserDoc[k];
                break;
              }
            }
          }
          if (!rawPhoto && user.photoURL) rawPhoto = user.photoURL;
          
          if (rawPhoto && navAvatarImg) {
            if (rawPhoto.startsWith('data:image') || rawPhoto.startsWith('http') || rawPhoto.startsWith('gs://')) {
              navAvatarImg.src = rawPhoto;
            } else {
              navAvatarImg.src = data:image/jpeg;base64,\;
            }
          } else if (navAvatarImg) {
            navAvatarImg.src = defaultProfilePhoto;
          }
        }
      });'''

# Normalize newlines
content = content.replace('\r\n', '\n')
old_logic = old_logic.replace('\r\n', '\n')

content = content.replace(old_logic, new_logic)
content = content.replace('>Dashboard</a>', '>Home</a>').replace('>Jobs</a>', '>Job Board</a>')
content = content.replace('</head>', '  <script src="theme.js"></script>\n</head>')

with open('jobs.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("jobs.html successfully updated via python")
