# macos 手动配置权限

```bash
/usr/bin/sqlite3 ~/Library/application\ Support/com.apple.TCC/TCC.db "REPLACE INTO access VALUES('kTCCServiceMicrophone','com.AVerMedia.RECentral-Express',0,2,0,1,NULL,NULL,NULL,'UNUSED',NULL,0,1608354323);"
/usr/bin/sqlite3 ~/Library/application\ Support/com.apple.TCC/TCC.db "REPLACE INTO access VALUES('kTCCServiceMicrophone','com.obsproject.obs-studio',0,2,0,1,NULL,NULL,NULL,'UNUSED',NULL,0,1608354323);"
```

```bash

/usr/bin/sqlite3 ~/Library/application\ Support/com.apple.TCC/TCC.db "REPLACE INTO access VALUES('kTCCServiceCamera','com.AVerMedia.RECentral-Express',0,2,0,1,NULL,NULL,NULL,'UNUSED',NULL,0,1608354323);"

sudo /usr/bin/sqlite3 ~/Library/application\ Support/com.apple.TCC/TCC.db "REPLACE INTO access VALUES('kTCCServiceAll','com.AVerMedia.RECentral-Express',0,2,0,1,NULL,NULL,NULL,'UNUSED',NULL,0,1608354323);"
```
