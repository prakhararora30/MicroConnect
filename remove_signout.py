import os

files_to_update = {
    'dashboard.html': [
        '<button id="signout-btn" class="signout-btn" title="Sign Out">Sign Out</button>',
        "const signoutBtn = document.getElementById('signout-btn');",
        "signoutBtn.addEventListener('click', async () => {\n        await signOut(auth);\n        window.location.href = 'login.html';\n      });"
    ],
    'courses.html': [
        '<button id="signout-btn" class="signout-btn" title="Sign Out">Sign Out</button>',
        "const signoutBtn = document.getElementById('signout-btn');",
        "signoutBtn.addEventListener('click', async () => {\n        await signOut(auth);\n        window.location.href = 'login.html';\n      });"
    ],
    'messages.html': [
        '<button id="nav-signout-btn" class="signout-link-btn" title="Sign Out">Sign Out</button>',
        "const navSignoutBtn = document.getElementById('nav-signout-btn');",
        "if (navSignoutBtn) {\n        navSignoutBtn.addEventListener('click', async () => {\n          await signOut(auth);\n          window.location.href = 'login.html';\n        });\n      }"
    ],
    'network.html': [
        '<button id="nav-signout-btn" class="signout-link-btn" title="Sign Out">Sign Out</button>',
        "const navSignoutBtn = document.getElementById('nav-signout-btn');",
        "if (navSignoutBtn) {\n        navSignoutBtn.addEventListener('click', async () => {\n          await signOut(auth);\n          window.location.href = 'login.html';\n        });\n      }"
    ]
}

for filename, replacements in files_to_update.items():
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # normalize to \n
        content = content.replace('\r\n', '\n')
        
        for rep in replacements:
            rep = rep.replace('\r\n', '\n')
            content = content.replace(rep, '')
            # Try with varying indentations if needed
            content = content.replace('      ' + rep, '')
            content = content.replace('        ' + rep, '')
            content = content.replace('      // Sign Out Action\n', '')
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Sign out features removed")
