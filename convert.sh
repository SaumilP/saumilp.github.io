#!/bin/sh
echo "(info) Converting .png to .webp"
find . -type f -name "*.png" -print | while read f; do f_newname=$(echo ${f%.png}.webp); cwebp $f -o $f_newname; rm -rf $f; done
echo "(info) Converting .jpg to .webp"
find . -type f -name "*.jpg" -print | while read f; do f_newname=$(echo ${f%.jpg}.webp); cwebp $f -o $f_newname; rm -rf $f; done
echo "(info) Newly generated .webp files"
find . -type f -name "*.webp" -ctime -1 -print
