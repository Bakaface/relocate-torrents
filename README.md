# Installation with npm:
```shell
  npm i -g relocate-torrents
```
# Usage
Simply run `relocate-torrents` in shell and set your params.
### Resume directory path
Full path to your current resume directory. Example:
```
Resume directory path: /home/user/.config/transmission/resume-backup/
```
### Files root path
Full path to root directory which you gonna replace. Example:
```
Files root path:   `/home/user/Downloads/`
```
### New root path
Full path to new root directory. Example:
```
New root path:   `D:/downloads`
```
### Rewrite resume files?
Answer `y` if you wanna rewrite existing .resume files or `n` to specify path to new directory. Example:
```
Rewrite resume files? (y/n):   `y`
```
### (optional) Write into
Full path to directory with .resume files. Example:
```
Write into:   `/home/user/.config/transmission/resume/`
