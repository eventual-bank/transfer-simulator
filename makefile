deploy-us-west:
	sam build;sam deploy --config-file samconfig.us-west.toml

delete-us-west:
	sam delete --config-file samconfig.us-west.toml

deploy-us-east:
	sam build;sam deploy

delete-us-east:
	sam delete