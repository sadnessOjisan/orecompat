# orecompat

empty title splash pwa

When you want to use a splash launch view, [pwacompat](https://github.com/GoogleChromeLabs/pwacompat) is usefull.
This create splash view for iOS.
But this lib show title under your splash.
If this is not for your design, you may want to detele it.
But pwacompat impl is `const title = manifest['name'] || manifest['short_name'] || document.title;`, will fill some title under your splash.
That is why I changed it to `const title = ""`.
