# git

## 删除文件的历史记录

```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch FILE_PATH' --prune-empty --tag-name-filter cat -- --all
git push origin master --force
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```
