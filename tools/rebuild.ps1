Write-Host "rebuild all dependencies"

cd ..
npm i
node patch-webpack.js
ng build fappi-common-model
ng build fappi-ng-material-kit
ng build fappi-ng-media
ng build fappi-ng-utils-components
ng build fappi-ng-cms
ng build fappi-theming
