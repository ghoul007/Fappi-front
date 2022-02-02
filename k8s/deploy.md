
This deployment deploy all front apps inside a docker.

# deploy the front;

in the <root>/ folder, run: 

Build angular:

`ng build --prod --optimization=false`
`ng build ftprod-default-manager-app --prod --optimization=false --base-href=/front/`
`ng build brief-report-app --prod --optimization=false --base-href=/brief-report-app/`
`ng build ftprod-crm-app --prod --optimization=false --base-href=/crm-app/`
`ng build ftprod-media-app --prod --optimization=false --base-href=/media-app/`
`ng build smart-brain-admin --prod --optimization=false --base-href=/smart-brain-admin/`

And then build docker:

```
docker login htq99g83.gra5.container-registry.ovh.net -u gpouleri
cp -R ./dist/ftprod-default-manager-app ./k8s/
cp -R ./dist/brief-report-app ./k8s/
cp -R ./dist/ftprod-crm-app ./k8s/
cp -R ./dist/ftprod-media-app ./k8s/
cp -R ./dist/smart-brain-admin ./k8s/
cd ./k8s/
docker build -t ui-board:1.2.11-SNAPSHOT .
docker tag ui-board:1.2.11-SNAPSHOT htq99g83.gra5.container-registry.ovh.net/fappi-base/ui-board:1.2.11-SNAPSHOT
docker push htq99g83.gra5.container-registry.ovh.net/fappi-base/ui-board:1.2.11-SNAPSHOT

rm -rf ./ftprod-default-manager-app
rm -rf ./brief-report-app
rm -rf ./ftprod-crm-app
rm -rf ./ftprod-media-app
rm -rf ./smart-brain-admin
```

Deploy k8s services :

in the <root>/k8s/ folder, run:
`kubectl apply -f ./all-backend-ui.yml -n fappi-dev`
