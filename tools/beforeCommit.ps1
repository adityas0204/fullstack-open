cd ./notes
Get-ChildItem -Recurse -Depth 1 -Filter *.md | Get-Content | Set-Content ..\tools\combined.md
cd ..

python ./tools/indexCreation.py