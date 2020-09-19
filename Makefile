.PHONY: dev deploy dbdeploy import dbimport help checkdistantbin sendenv vendordeploy

path=~/httpdocs/
ssh=akiltook-xg@akiltook.fr
distphp=/opt/plesk/php/7.2/bin/php
domain=www.akiltook.fr

help: ## Affiche cette aide
		@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

deploy: ## Déploie une nouvelle version de l'application
		rsync -av ./ $(ssh):$(path) \
				--exclude Makefile \
				--exclude .git \
				--exclude .dist \
				--exclude node_modules \
				--exclude .env \
				--exclude .env.dist \
				--exclude .editorconfig \
				--exclude vendor

install: #make distant install
	ssh $(ssh) "cd $(path); yarn install; yarn run build;"

sendenv: # Envoie les variables d'environnement distant
		rsync -av ./.env.dist $(ssh):$(path)/.env

checkdistantbin: ## retourne la version de php, yarn du serveur de production
		ssh $(ssh) "cd $(path); $(distphp) -v; yarn -v;  $(distphp) ../tools/composer.phar -V;"

vendordeploy: ## install les vendor
		ssh $(ssh) "cd $(path); yarn install; $(distphp) ../tools/composer.phar install;"
