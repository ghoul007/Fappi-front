# Development process with angular modules:

Create a new lib:

```
ng generate lib fappi-ng-material-kit
```

Build a module: 

```
ng build  fappi-common-model
```

(use  --watch to build continuously)

Run fronts:
  
```

ng serve ftprod-default-cms-app --no-live-reload --base-href=/content/ --port 4206 --disable-host-check --configuration=fr  --host 0.0.0.0
ng serve brief-report-app --no-live-reload --base-href=/brief-report-app/ --port 4202 --disable-host-check --configuration=fr  --host 0.0.0.0
ng serve ftprod-crm-app --no-live-reload --base-href=/crm-app/ --port 4203 --disable-host-check --configuration=fr  --host 0.0.0.0
ng serve ftprod-media-app --no-live-reload --base-href=/media-app/ --port 4204 --disable-host-check --configuration=fr  --host 0.0.0.0
ng serve smart-brain-admin --no-live-reload --base-href=/smart-brain-admin/ --port 4205 --disable-host-check --configuration=fr  --host 0.0.0.0
ng serve default-fhir-app --no-live-reload --base-href=/fhir-app/ --port 4207 --disable-host-check --configuration=fr  --host 0.0.0.0
```
# i18n



## development: 

To view a specific language add : `--configuration=fr` to the `ng serve` command. 

To generate locales : 
ng xi18n




