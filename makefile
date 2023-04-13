deploy-us-west:
	sam build;sam deploy --config-file samconfig.us-west.toml --template-file template.us-west.yaml

deploy-us-east:
	sam build;sam deploy

delete:
	sam delete