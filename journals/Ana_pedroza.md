## February 15, 2023

Today, I worked on:

* Connecting PgAdmin with the therapy and account systems, and creating a new endpoint for posts.


As a team, we created our first post endpoint and verified it was correctly stored in the Pg database. We also completed our first merge and pull, but encountered some errors in the pipeline. To address this, we decided to comment out part of the GitLab-CI and ran some flake8 tests to ensure the formatting was correct.

In addition, we created the issues in GitLab and plan to assign points tomorrow.

## February 16, 2023

Today, I worked on;

* fix bug in package.json.

I worked with Rosheen to fix this bug: "Error: Cannot find module ‘/app/npm install -g npm@9.5.0’therapy-hub-ghi-1". We spent almost all afternoon on it. We tried deleting the repo and docker container to fix the problem, and made some changes in the Docker YAML. However, none of these attempts worked. We eventually solved the problem by reinstalling the npm directly in the GHI file and adding "start": "node ./windows-setup.js && ./node_modules/.bin/react-scripts start" to the package.json file.

## February 17, 2023

Today, I worked on;

* update_therapy ans delete therapy.

I worked on the endpoint for updating and deleting therapy instances. Now, we are able to update every instance of therapy and delete them if we choose to do so.

Today, I worked on;

* fix bug in package.json.

I worked with Rosheen to fix this bug: "Error: Cannot find module ‘/app/npm install -g npm@9.5.0’therapy-hub-ghi-1". We spent almost all afternoon on it. We tried deleting the repo and docker container to fix the problem, and made some changes in the Docker YAML. However, none of these attempts worked. We eventually solved the problem by reinstalling the npm directly in the GHI file and adding "start": "node ./windows-setup.js && ./node_modules/.bin/react-scripts start" to the package.json file.

## February 19, 2023

Today, I worked on;

* Accounts, update tables.

I worked on how a therapist or client can login. I created an 'account' table that has a foreign key 'role_id', so we know what type of account it is when the user log in. 


## February 20, 2023

Today, I worked on;

* Authentication

As a team, we tried to fix some bugs in the account creation process. For some reason, we were unable to create a new account. When we added the 'role_id' to the account, we realized that it was missing from the 'get_one_account' query. Now, we are able to create an account, log in, log out, and delete an account. However, we still have some bugs in the 'get_all_accounts' query. We plan to find a solution tomorrow with the help of a SEIR.
 
